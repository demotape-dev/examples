import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "DemoTape Example: Next.js",
  description: "Next.js SSR and API routes example for DemoTape",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
