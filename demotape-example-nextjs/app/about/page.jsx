import { headers, cookies } from "next/headers";

export default async function AboutPage() {
  const headersList = await headers();
  const cookieStore = await cookies();

  const userAgent = headersList.get("user-agent") || "Unknown";
  const host = headersList.get("host") || "Unknown";
  const cookieCount = cookieStore.getAll().length;

  return (
    <main>
      <h1>About</h1>
      <span className="badge">Server-rendered</span>
      <p>
        This page is server-rendered and reads request headers and cookies
        during SSR, proving that they are correctly preserved through the proxy.
      </p>

      <div className="info-card">
        <h2>SSR Context</h2>
        <p>
          <strong>Host:</strong> {host}
        </p>
      </div>

      <div className="info-card">
        <h2>Headers</h2>
        <p>
          <strong>User-Agent:</strong> {userAgent}
        </p>
      </div>

      <div className="info-card">
        <h2>Cookies</h2>
        <p>
          <strong>Cookie count:</strong> {cookieCount}
        </p>
      </div>

      <div className="info-card">
        <h2>What this proves</h2>
        <p>
          Server components can access headers and cookies during SSR. When
          accessed through DemoTape, these values reflect the real client
          request, confirming that the proxy preserves them correctly.
        </p>
      </div>
    </main>
  );
}
