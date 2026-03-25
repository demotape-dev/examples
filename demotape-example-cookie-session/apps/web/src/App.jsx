import { useState } from "react";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  async function startSession() {
    setLoading(true);
    try {
      const res = await fetch("/api/session/start", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setSession({ status: data.status });
    } catch (err) {
      console.error("Failed to start session:", err);
    } finally {
      setLoading(false);
    }
  }

  async function checkSession() {
    setLoading(true);
    try {
      const res = await fetch("/api/me", {
        credentials: "include",
        headers: {
          Authorization: "Bearer demo-token-123",
        },
      });
      const data = await res.json();
      setSession(data);
    } catch (err) {
      console.error("Failed to check session:", err);
    } finally {
      setLoading(false);
    }
  }

  async function endSession() {
    setLoading(true);
    try {
      await fetch("/api/session", {
        method: "DELETE",
        credentials: "include",
      });
      setSession(null);
    } catch (err) {
      console.error("Failed to end session:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Cookie Session Example</h1>
      <p className="subtitle">
        Proves that cookies and auth headers survive proxying through DemoTape.
      </p>

      <div className="actions">
        <button onClick={startSession} disabled={loading}>
          Start Session
        </button>
        <button onClick={checkSession} disabled={loading}>
          Check Session
        </button>
        <button onClick={endSession} disabled={loading} className="danger">
          End Session
        </button>
      </div>

      {session && (
        <div className="result">
          <h2>Session Info</h2>
          <table>
            <tbody>
              {session.cookie !== undefined && (
                <tr>
                  <td className="label">Cookie (session_id)</td>
                  <td>
                    <code>{session.cookie || "not set"}</code>
                  </td>
                </tr>
              )}
              {session.authHeader !== undefined && (
                <tr>
                  <td className="label">Authorization Header</td>
                  <td>
                    <code>{session.authHeader || "not set"}</code>
                  </td>
                </tr>
              )}
              {session.timestamp && (
                <tr>
                  <td className="label">Timestamp</td>
                  <td>
                    <code>{session.timestamp}</code>
                  </td>
                </tr>
              )}
              {session.status && (
                <tr>
                  <td className="label">Status</td>
                  <td>
                    <code>{session.status}</code>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!session && (
        <div className="empty">
          No session. Click <strong>Start Session</strong> to set a cookie, then{" "}
          <strong>Check Session</strong> to verify it persists.
        </div>
      )}
    </div>
  );
}
