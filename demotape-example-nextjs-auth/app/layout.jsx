import "./globals.css";

export const metadata = {
  title: "DemoTape Example — Next.js Auth",
  description:
    "Example app demonstrating Next.js middleware auth through DemoTape",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
