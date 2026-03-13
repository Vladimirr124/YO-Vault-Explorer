import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YO Vault Explorer",
  description: "Read-only research dashboard for YO Protocol — vaults, architecture, risks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
