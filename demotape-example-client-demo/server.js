import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

/* ── Mock data ── */
const USERS = {
  'jane@acme.com': { password: 'demo1234', name: 'Jane Doe', role: 'Admin', initials: 'JD' },
  'tom@acme.com': { password: 'demo1234', name: 'Tom Chen', role: 'Editor', initials: 'TC' },
};

const TEAM = [
  { id: 1, name: 'Jane Doe', email: 'jane@acme.com', role: 'Admin', status: 'Active', lastSeen: '2 min ago' },
  { id: 2, name: 'Tom Chen', email: 'tom@acme.com', role: 'Editor', status: 'Active', lastSeen: '14 min ago' },
  { id: 3, name: 'Sara Kim', email: 'sara@acme.com', role: 'Viewer', status: 'Active', lastSeen: '1 hr ago' },
  { id: 4, name: 'Mike Russo', email: 'mike@acme.com', role: 'Editor', status: 'Offline', lastSeen: '3 days ago' },
  { id: 5, name: 'Priya Patel', email: 'priya@acme.com', role: 'Viewer', status: 'Offline', lastSeen: '1 week ago' },
];

const EVENT_TEMPLATES = [
  { type: 'signup', messages: ['New signup: {email}', 'User registered: {email}'] },
  { type: 'order', messages: ['Order #{id} completed — ${amount}', 'New order #{id} — ${amount}'] },
  { type: 'payment', messages: ['Payment received from {company}', 'Invoice paid by {company}'] },
  { type: 'upgrade', messages: ['User upgraded to {plan} plan', '{name} upgraded to {plan}'] },
  { type: 'login', messages: ['{name} logged in', 'Session started for {name}'] },
  { type: 'export', messages: ['Report exported by {name}', '{name} downloaded monthly report'] },
];

const NAMES = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace', 'Hank'];
const EMAILS = ['alice@startup.io', 'bob@corp.co', 'charlie@dev.net', 'diana@acme.com'];
const COMPANIES = ['Acme Corp', 'Globex Inc', 'Initech', 'Umbrella Co', 'Stark Industries'];
const PLANS = ['Pro', 'Team', 'Enterprise'];

let eventCounter = 1050;

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvent() {
  const template = randomItem(EVENT_TEMPLATES);
  const message = randomItem(template.messages)
    .replace('{email}', randomItem(EMAILS))
    .replace('{id}', String(eventCounter++))
    .replace('{amount}', String(Math.floor(Math.random() * 500) + 29) + '.00')
    .replace('{company}', randomItem(COMPANIES))
    .replace('{plan}', randomItem(PLANS))
    .replace('{name}', randomItem(NAMES));

  return {
    id: eventCounter,
    type: template.type,
    message,
    timestamp: new Date().toISOString(),
  };
}

// Seed initial events
const events = [];
for (let i = 0; i < 20; i++) {
  events.unshift(generateEvent());
}

// Add new events periodically
setInterval(() => {
  events.unshift(generateEvent());
  if (events.length > 100) events.pop();
}, 8000);

/* ── Auth ── */
const tokens = new Map();

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  tokens.set(token, { email, name: user.name, role: user.role, initials: user.initials });
  res.cookie('session', token, { httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
  res.json({ user: { name: user.name, email, role: user.role, initials: user.initials } });
});

function authMiddleware(req, res, next) {
  const token = req.cookies.session;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const user = tokens.get(token);
  if (!user) return res.status(401).json({ error: 'Invalid session' });
  req.user = user;
  next();
}

/* ── API routes ── */
app.post('/api/logout', (req, res) => {
  const token = req.cookies.session;
  if (token) tokens.delete(token);
  res.clearCookie('session');
  res.json({ ok: true });
});

app.get('/api/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

app.get('/api/events', authMiddleware, (req, res) => {
  const since = req.query.since;
  if (since) {
    const filtered = events.filter((e) => e.id > Number(since));
    return res.json({ events: filtered, total: events.length });
  }
  res.json({ events: events.slice(0, 30), total: events.length });
});

app.get('/api/metrics', authMiddleware, (req, res) => {
  res.json({
    metrics: [
      { label: 'Revenue', value: '$' + (12450 + Math.floor(Math.random() * 200)).toLocaleString(), change: '+12.5%', up: true },
      { label: 'Users', value: (1234 + Math.floor(Math.random() * 20)).toLocaleString(), change: '+8.1%', up: true },
      { label: 'Orders', value: String(56 + Math.floor(Math.random() * 5)), change: '-3.2%', up: false },
      { label: 'Conversion', value: (4.2 + Math.random() * 0.3).toFixed(1) + '%', change: '+0.4%', up: true },
    ],
  });
});

app.get('/api/team', authMiddleware, (req, res) => {
  res.json({ members: TEAM });
});

app.get('/api/analytics', authMiddleware, (req, res) => {
  const range = req.query.range || '7d';
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const labels = [];
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3));
    data.push(Math.floor(Math.random() * 60) + 30);
  }
  // Only return last 7 labels for display
  const slice = Math.min(7, days);
  res.json({
    chart: labels.slice(-slice).map((l, idx) => ({ label: l, value: data.slice(-slice)[idx] })),
    summary: {
      avgDaily: Math.floor(Math.random() * 50) + 150,
      bounceRate: Math.floor(Math.random() * 10) + 28,
      conversion: (Math.random() * 2 + 3).toFixed(1),
    },
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
