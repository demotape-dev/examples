export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>

      <div className="card">
        <h2>Notifications</h2>
        <p>Email notifications are enabled for this demo account.</p>
      </div>

      <div className="card">
        <h2>Theme</h2>
        <p>Dark mode is active. Theme preferences are stored server-side.</p>
      </div>

      <div className="card">
        <h2>Security</h2>
        <p>
          Sessions expire after 24 hours. Auth tokens are stored in httpOnly
          cookies and verified by Next.js middleware on every request.
        </p>
      </div>
    </div>
  );
}
