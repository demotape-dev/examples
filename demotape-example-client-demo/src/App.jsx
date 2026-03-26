import { useState, useEffect, useCallback, useRef } from 'react';

const API = '/api';

function api(path, opts = {}) {
  return fetch(`${API}${path}`, {
    credentials: 'include',
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...opts.headers,
    },
  }).then(async (r) => {
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Request failed');
    return data;
  });
}

/* ── Login Page ── */

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('jane@acme.com');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">Acme</div>
        <h1 className="login-title">Sign in to your account</h1>
        <p className="login-subtitle">Enter your credentials to access the dashboard</p>

        {error && <div className="login-error">{error}</div>}

        <label className="form-label">
          Email address
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </label>

        <label className="form-label">
          Password
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="login-hint">
          Demo credentials are prefilled. Just click Sign In.
        </p>
      </form>
    </div>
  );
}

/* ── Overview Page ── */

function OverviewPage() {
  const [metrics, setMetrics] = useState([]);
  const [events, setEvents] = useState([]);
  const latestId = useRef(0);

  const loadMetrics = useCallback(() => {
    api('/metrics').then((d) => setMetrics(d.metrics)).catch(() => {});
  }, []);

  const loadEvents = useCallback(() => {
    const since = latestId.current;
    const path = since ? `/events?since=${since}` : '/events';
    api(path).then((d) => {
      if (d.events.length > 0) {
        latestId.current = Math.max(...d.events.map((e) => e.id));
        setEvents((prev) => {
          const merged = [...d.events, ...prev];
          const seen = new Set();
          return merged.filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true))).slice(0, 30);
        });
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    loadMetrics();
    loadEvents();
    const mi = setInterval(loadMetrics, 15000);
    const ei = setInterval(loadEvents, 5000);
    return () => { clearInterval(mi); clearInterval(ei); };
  }, [loadMetrics, loadEvents]);

  return (
    <>
      <h2 className="page-title">Overview</h2>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <span className="metric-label">{m.label}</span>
            <span className="metric-value">{m.value}</span>
            <span className={`metric-change ${m.up ? 'up' : 'down'}`}>{m.change}</span>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h3 className="section-title">Live Events</h3>
        <span className="live-dot" />
      </div>
      <ul className="activity-list">
        {events.map((e) => (
          <li key={e.id} className="activity-item">
            <span className="event-type-badge" data-type={e.type}>{e.type}</span>
            <span className="activity-text">{e.message}</span>
            <span className="activity-time">{new Date(e.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ── Analytics Page ── */

function AnalyticsPage() {
  const [range, setRange] = useState('7d');
  const [chart, setChart] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api(`/analytics?range=${range}`)
      .then((d) => { setChart(d.chart); setSummary(d.summary); })
      .catch(() => {});
  }, [range]);

  const maxVal = Math.max(...chart.map((d) => d.value), 1);

  return (
    <>
      <h2 className="page-title">Analytics</h2>

      <div className="date-range-selector">
        {['7d', '30d', '90d'].map((r) => (
          <button
            key={r}
            className={`range-btn ${range === r ? 'active' : ''}`}
            onClick={() => setRange(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="chart-container">
        <div className="bar-chart">
          {chart.map((d) => (
            <div className="bar-col" key={d.label}>
              <div className="bar" style={{ height: `${(d.value / maxVal) * 100}%` }}>
                <span className="bar-tooltip">{d.value}</span>
              </div>
              <span className="bar-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {summary && (
        <div className="analytics-summary">
          <div className="summary-card">
            <span className="summary-label">Avg. Daily Users</span>
            <span className="summary-value">{summary.avgDaily}</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Bounce Rate</span>
            <span className="summary-value">{summary.bounceRate}%</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Conversion</span>
            <span className="summary-value">{summary.conversion}%</span>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Team Page ── */

function TeamPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api('/team').then((d) => setMembers(d.members)).catch(() => {});
  }, []);

  return (
    <>
      <h2 className="page-title">Team</h2>

      {/* Desktop table */}
      <div className="table-card hide-mobile">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td className="cell-name">{m.name}</td>
                <td className="cell-muted">{m.email}</td>
                <td><span className="role-badge" data-role={m.role.toLowerCase()}>{m.role}</span></td>
                <td><span className={`status-indicator ${m.status.toLowerCase()}`}>{m.status}</span></td>
                <td className="cell-muted">{m.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="team-cards show-mobile">
        {members.map((m) => (
          <div className="team-card" key={m.id}>
            <div className="team-card-header">
              <span className="cell-name">{m.name}</span>
              <span className="role-badge" data-role={m.role.toLowerCase()}>{m.role}</span>
            </div>
            <span className="cell-muted">{m.email}</span>
            <div className="team-card-footer">
              <span className={`status-indicator ${m.status.toLowerCase()}`}>{m.status}</span>
              <span className="cell-muted">{m.lastSeen}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Settings Page ── */

function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailReports, setEmailReports] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <h2 className="page-title">Settings</h2>

      <div className="settings-group">
        <div className="setting-row">
          <div>
            <span className="setting-label">Push Notifications</span>
            <span className="setting-desc">Receive alerts for new signups and orders</span>
          </div>
          <button className={`toggle ${notifications ? 'on' : ''}`} onClick={() => setNotifications(!notifications)}>
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <span className="setting-label">Dark Mode</span>
            <span className="setting-desc">Switch the dashboard to a dark theme</span>
          </div>
          <button className={`toggle ${darkMode ? 'on' : ''}`} onClick={() => setDarkMode(!darkMode)}>
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <span className="setting-label">Weekly Email Reports</span>
            <span className="setting-desc">Get a summary delivered every Monday</span>
          </div>
          <button className={`toggle ${emailReports ? 'on' : ''}`} onClick={() => setEmailReports(!emailReports)}>
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </>
  );
}

/* ── App shell ── */

const PAGES = ['Overview', 'Analytics', 'Team', 'Settings'];

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('Overview');
  const [checking, setChecking] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    api('/me').then(setUser).catch(() => {}).finally(() => setChecking(false));
  }, []);

  function handleLogout() {
    api('/logout', { method: 'POST' }).finally(() => setUser(null));
  }

  function navigateTo(p) {
    setPage(p);
    setMenuOpen(false);
  }

  if (checking) return null;
  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <div className="app">
      {/* Mobile header */}
      <header className="mobile-header">
        <div className="logo">Acme</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
        </button>
      </header>

      {/* Overlay for mobile menu */}
      {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="logo">Acme</div>
        <nav>
          {PAGES.map((p) => (
            <button
              key={p}
              className={`nav-item ${page === p ? 'active' : ''}`}
              onClick={() => navigateTo(p)}
            >
              {p}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">{user.initials}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user.name}</span>
            <span className="sidebar-user-role">{user.role}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Sign out">
            &larr;
          </button>
        </div>
      </aside>

      <main className="main">
        {page === 'Overview' && <OverviewPage />}
        {page === 'Analytics' && <AnalyticsPage />}
        {page === 'Team' && <TeamPage />}
        {page === 'Settings' && <SettingsPage />}
      </main>
    </div>
  );
}
