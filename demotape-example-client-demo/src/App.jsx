import { useState } from 'react';

const PAGES = ['Overview', 'Analytics', 'Settings'];

/* ── Mock data ── */
const metrics = [
  { label: 'Revenue', value: '$12,450', change: '+12.5%', up: true },
  { label: 'Users', value: '1,234', change: '+8.1%', up: true },
  { label: 'Orders', value: '56', change: '-3.2%', up: false },
];

const recentActivity = [
  { id: 1, text: 'New signup: jane@example.com', time: '2 min ago' },
  { id: 2, text: 'Order #1042 completed — $249.00', time: '18 min ago' },
  { id: 3, text: 'Payment received from Acme Corp', time: '1 hr ago' },
  { id: 4, text: 'User upgraded to Pro plan', time: '3 hr ago' },
  { id: 5, text: 'New signup: tom@startup.io', time: '5 hr ago' },
];

const barData = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 80 },
  { label: 'Wed', value: 45 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 70 },
  { label: 'Sat', value: 40 },
  { label: 'Sun', value: 55 },
];

/* ── Pages ── */

function OverviewPage() {
  return (
    <>
      <h2 className="page-title">Overview</h2>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <span className="metric-label">{m.label}</span>
            <span className="metric-value">{m.value}</span>
            <span className={`metric-change ${m.up ? 'up' : 'down'}`}>
              {m.change}
            </span>
          </div>
        ))}
      </div>

      <h3 className="section-title">Recent Activity</h3>
      <ul className="activity-list">
        {recentActivity.map((a) => (
          <li key={a.id} className="activity-item">
            <span>{a.text}</span>
            <span className="activity-time">{a.time}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function AnalyticsPage() {
  const [range, setRange] = useState('7d');
  const maxVal = Math.max(...barData.map((d) => d.value));

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
          {barData.map((d) => (
            <div className="bar-col" key={d.label}>
              <div
                className="bar"
                style={{ height: `${(d.value / maxVal) * 100}%` }}
              >
                <span className="bar-tooltip">{d.value}</span>
              </div>
              <span className="bar-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <span className="summary-label">Avg. Daily Users</span>
          <span className="summary-value">176</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Bounce Rate</span>
          <span className="summary-value">32%</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Conversion</span>
          <span className="summary-value">4.2%</span>
        </div>
      </div>
    </>
  );
}

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
            <span className="setting-desc">
              Receive alerts for new signups and orders
            </span>
          </div>
          <button
            className={`toggle ${notifications ? 'on' : ''}`}
            onClick={() => setNotifications(!notifications)}
          >
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <span className="setting-label">Dark Mode</span>
            <span className="setting-desc">
              Switch the dashboard to a dark theme
            </span>
          </div>
          <button
            className={`toggle ${darkMode ? 'on' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <span className="setting-label">Weekly Email Reports</span>
            <span className="setting-desc">
              Get a summary delivered every Monday
            </span>
          </div>
          <button
            className={`toggle ${emailReports ? 'on' : ''}`}
            onClick={() => setEmailReports(!emailReports)}
          >
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

export default function App() {
  const [page, setPage] = useState('Overview');

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">Acme</div>
        <nav>
          {PAGES.map((p) => (
            <button
              key={p}
              className={`nav-item ${page === p ? 'active' : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">JD</div>
          <span>Jane Doe</span>
        </div>
      </aside>

      <main className="main">
        {page === 'Overview' && <OverviewPage />}
        {page === 'Analytics' && <AnalyticsPage />}
        {page === 'Settings' && <SettingsPage />}
      </main>
    </div>
  );
}
