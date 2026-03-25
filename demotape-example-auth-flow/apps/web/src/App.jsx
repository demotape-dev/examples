import { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("landing");
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Navigate to landing if not authenticated on protected pages
  useEffect(() => {
    if (!token && (page === "profile" || page === "settings")) {
      setPage("landing");
      setProfile(null);
      setSettings(null);
    }
  }, [token, page]);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: "demo", password: "demo" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }
      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      setPage("profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // ignore
    }
    setToken(null);
    setUser(null);
    setProfile(null);
    setSettings(null);
    localStorage.removeItem("token");
    setPage("landing");
    setLoading(false);
  }

  async function loadProfile() {
    setPage("profile");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadSettings() {
    setPage("settings");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings", {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load settings");
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-brand" onClick={() => setPage(token ? "profile" : "landing")}>
          Auth Flow Example
        </div>
        <div className="nav-links">
          {token && (
            <>
              <button
                className={`nav-link ${page === "profile" ? "active" : ""}`}
                onClick={loadProfile}
              >
                Profile
              </button>
              <button
                className={`nav-link ${page === "settings" ? "active" : ""}`}
                onClick={loadSettings}
              >
                Settings
              </button>
            </>
          )}
          {token ? (
            <button className="nav-link logout" onClick={handleLogout} disabled={loading}>
              Logout
            </button>
          ) : (
            <button className="nav-link" onClick={() => setPage("landing")}>
              Login
            </button>
          )}
        </div>
      </nav>

      {error && <div className="error">{error}</div>}

      {page === "landing" && (
        <div className="page">
          <h1>Auth Flow Demo</h1>
          <p className="subtitle">
            Proves that login, JWT tokens, cookies, and protected routes work correctly behind a DemoTape proxy.
          </p>
          <div className="card">
            <p>
              Click the button below to log in as a demo user. The API will issue a JWT token
              and set an httpOnly cookie. Both are used to authenticate subsequent requests.
            </p>
            <p className="credentials">
              Credentials: <code>demo</code> / <code>demo</code>
            </p>
            <button className="btn-primary" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login as demo user"}
            </button>
          </div>
        </div>
      )}

      {page === "profile" && token && (
        <div className="page">
          <h1>Profile</h1>
          <p className="subtitle">Protected route — requires authentication.</p>
          {loading && <div className="loading">Loading profile...</div>}
          {profile && (
            <div className="card">
              <table>
                <tbody>
                  <tr>
                    <td className="label">Name</td>
                    <td><code>{profile.name}</code></td>
                  </tr>
                  <tr>
                    <td className="label">Email</td>
                    <td><code>{profile.email}</code></td>
                  </tr>
                  <tr>
                    <td className="label">User ID</td>
                    <td><code>{profile.sub}</code></td>
                  </tr>
                  <tr>
                    <td className="label">Message</td>
                    <td><code>{profile.message}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {page === "settings" && token && (
        <div className="page">
          <h1>Settings</h1>
          <p className="subtitle">Another protected route — proves token persists across requests.</p>
          {loading && <div className="loading">Loading settings...</div>}
          {settings && (
            <div className="card">
              <table>
                <tbody>
                  <tr>
                    <td className="label">Theme</td>
                    <td><code>{settings.theme}</code></td>
                  </tr>
                  <tr>
                    <td className="label">Notifications</td>
                    <td><code>{settings.notifications ? "enabled" : "disabled"}</code></td>
                  </tr>
                  <tr>
                    <td className="label">Language</td>
                    <td><code>{settings.language}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
