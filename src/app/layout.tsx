import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";

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
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
