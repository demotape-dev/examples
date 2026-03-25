import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

// ── Styles ──────────────────────────────────────────────────────────

const styles = {
  body: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    maxWidth: 640,
    margin: "40px auto",
    padding: "0 20px",
    color: "#1a1a1a",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    background: "#fafafa",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    marginBottom: 12,
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: 14,
    boxSizing: "border-box",
  },
  button: {
    padding: "8px 16px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
    marginRight: 8,
  },
  buttonOutline: {
    padding: "8px 16px",
    background: "#fff",
    color: "#111",
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
    marginRight: 8,
  },
  nav: {
    display: "flex",
    gap: 16,
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: "1px solid #e0e0e0",
    alignItems: "center",
  },
  link: { color: "#111", textDecoration: "none", fontWeight: 500 },
  activeLink: {
    color: "#111",
    textDecoration: "none",
    fontWeight: 700,
    borderBottom: "2px solid #111",
  },
  error: { color: "#c00", marginTop: 8, fontSize: 14 },
  tag: {
    display: "inline-block",
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },
  log: {
    background: "#111",
    color: "#0f0",
    padding: 16,
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 13,
    whiteSpace: "pre-wrap",
    marginTop: 12,
    maxHeight: 200,
    overflow: "auto",
  },
};

// ── Protected Route wrapper ─────────────────────────────────────────

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    fetch("/api/auth/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setStatus(data.authenticated ? "ok" : "denied"))
      .catch(() => setStatus("denied"));
  }, [location.pathname]);

  if (status === "loading") return <p>Checking auth...</p>;
  if (status === "denied") return <Navigate to="/login" replace />;
  return children;
}

// ── Login Page ──────────────────────────────────────────────────────

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok && data.redirect) {
      navigate(data.redirect);
    } else {
      setError(data.error || "Login failed");
    }
  }

  return (
    <div style={styles.card}>
      <h2>Login</h2>
      <p style={{ fontSize: 14, color: "#666" }}>
        Use <strong>demo / demo</strong> to log in.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button style={styles.button} type="submit">
          Log in
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

// ── Dashboard Nav ───────────────────────────────────────────────────

function DashboardNav() {
  const location = useLocation();
  const links = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/settings", label: "Settings" },
    { to: "/dashboard/profile", label: "Profile" },
  ];
  return (
    <nav style={styles.nav}>
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          style={location.pathname === l.to ? styles.activeLink : styles.link}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

// ── Dashboard Page ──────────────────────────────────────────────────

function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard/data", { credentials: "include" })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  function addLog(msg) {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }

  async function handleLogout() {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    const body = await res.json();
    addLog(`POST /api/logout -> ${res.status}, redirect: ${body.redirect}`);
    if (body.redirect) {
      navigate(body.redirect);
    }
  }

  async function handleRedirectTest() {
    addLog("GET /api/redirect-test (manual fetch, redirect: manual)...");
    try {
      const res = await fetch("/api/redirect-test", {
        credentials: "include",
        redirect: "manual",
      });
      const location = res.headers.get("location");
      addLog(
        `Response: ${res.status} ${res.type}, Location: ${location || "(none)"}`,
      );
      if (res.status === 302 || res.type === "opaqueredirect") {
        const target = location || "/dashboard/settings";
        addLog(`Following redirect to ${target}`);
        navigate(target);
      }
    } catch (err) {
      addLog(`Error: ${err.message}`);
    }
  }

  return (
    <div>
      <DashboardNav />
      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Welcome to Dashboard</h2>
          <span style={styles.tag}>Authenticated</span>
        </div>

        {data && (
          <div style={{ marginTop: 16 }}>
            <p>
              <strong>Visitors:</strong> {data.stats?.visitors} |{" "}
              <strong>Sessions:</strong> {data.stats?.sessions} |{" "}
              <strong>Avg Duration:</strong> {data.stats?.avgDuration}
            </p>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <h3>Navigation tests</h3>
          <p style={{ fontSize: 14, color: "#666" }}>
            These links verify client-side routing and deep linking work through
            a proxy.
          </p>
          <Link to="/dashboard/settings" style={styles.link}>
            Go to Settings (client-side)
          </Link>
          {" | "}
          <Link to="/dashboard/profile" style={styles.link}>
            Go to Profile (client-side)
          </Link>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3>Server redirect test</h3>
          <p style={{ fontSize: 14, color: "#666" }}>
            Calls <code>GET /api/redirect-test</code> which returns a 302 with a
            Location header pointing to <code>/dashboard/settings</code>.
          </p>
          <button style={styles.button} onClick={handleRedirectTest}>
            Test Server Redirect
          </button>
          <button style={styles.buttonOutline} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {log.length > 0 && <div style={styles.log}>{log.join("\n")}</div>}
      </div>
    </div>
  );
}

// ── Settings Page ───────────────────────────────────────────────────

function SettingsPage() {
  return (
    <div>
      <DashboardNav />
      <div style={styles.card}>
        <h2>Settings</h2>
        <p>
          You reached <code>/dashboard/settings</code>.
        </p>
        <p style={{ fontSize: 14, color: "#666" }}>
          If you arrived here via the "Test Server Redirect" button, the 302
          Location header was handled correctly. If you navigated directly to
          this URL, deep linking works through the proxy.
        </p>
      </div>
    </div>
  );
}

// ── Profile Page ────────────────────────────────────────────────────

function ProfilePage() {
  return (
    <div>
      <DashboardNav />
      <div style={styles.card}>
        <h2>Profile</h2>
        <p>
          You reached <code>/dashboard/profile</code>.
        </p>
        <p style={{ fontSize: 14, color: "#666" }}>
          This page verifies that nested client-side routes work correctly when
          accessed through a proxy or as a deep link.
        </p>
      </div>
    </div>
  );
}

// ── App ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.body}>
        <h1 style={{ fontSize: 20, marginBottom: 4 }}>
          DemoTape Example: Location / URL Rewrite
        </h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
          Redirects, client-side routing, and deep links through a proxy.
        </p>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
