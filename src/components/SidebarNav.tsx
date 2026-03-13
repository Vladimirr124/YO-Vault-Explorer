"use client";

const links = [
  { href: "#hero", label: "Hero" },
  { href: "#about", label: "About YO" },
  { href: "#why", label: "Why this matters" },
  { href: "#vaults", label: "Vault Overview" },
  { href: "#how-it-works", label: "How YO works" },
  { href: "#risk", label: "Risk Overview" },
  { href: "#contracts", label: "Protocol Contracts" },
  { href: "#research", label: "Research Insights" },
  { href: "#takeaway", label: "Final Takeaway" },
];

export function SidebarNav() {
  return (
    <nav className="sticky top-[3.5rem] flex flex-col gap-1 py-6 pr-6 border-r border-[var(--border)] min-w-[180px]">
      <span className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-2 mb-2">
        On this page
      </span>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--yo-accent)] transition-colors px-2 py-1 rounded-md hover:bg-[var(--card)]"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
