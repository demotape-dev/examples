"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <h3>Dashboard</h3>
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/profile">Profile</Link>
        <Link href="/dashboard/settings">Settings</Link>
        <div className="spacer" />
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}
