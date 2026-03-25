import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Next.js Auth Example</h1>
      <p>
        A minimal Next.js 15 app with middleware-based authentication. Protected
        routes redirect unauthenticated users, and sessions are handled via
        httpOnly cookies with JWT.
      </p>
      <Link href="/login" className="btn">
        Login
      </Link>
    </div>
  );
}
