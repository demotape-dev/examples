import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Welcome back, {user?.username ?? "user"}</h2>
        <p>
          You are authenticated. This page is protected by Next.js middleware
          that verifies your JWT before the route renders.
        </p>
      </div>

      <div className="card">
        <h2>Session info</h2>
        <div className="field">
          <div className="field-label">Username</div>
          <div className="field-value">{user?.username ?? "—"}</div>
        </div>
        <div className="field">
          <div className="field-label">Role</div>
          <div className="field-value">{user?.role ?? "—"}</div>
        </div>
        <div className="field">
          <div className="field-label">Issued at</div>
          <div className="field-value">
            {user?.iat
              ? new Date(user.iat * 1000).toLocaleString("en-US")
              : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
