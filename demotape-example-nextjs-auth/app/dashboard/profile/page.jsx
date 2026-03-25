import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  return (
    <div>
      <h1>Profile</h1>

      <div className="card">
        <div className="field">
          <div className="field-label">Username</div>
          <div className="field-value">{user?.username ?? "—"}</div>
        </div>
        <div className="field">
          <div className="field-label">Display name</div>
          <div className="field-value">Demo User</div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">demo@example.com</div>
        </div>
        <div className="field">
          <div className="field-label">Role</div>
          <div className="field-value">{user?.role ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}
