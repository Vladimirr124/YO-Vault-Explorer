"use client";

import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = string;
type VaultRisks = Record<string, Record<Category, { level: string; why: string }>>;

const levelStyles: Record<string, string> = {
  Low: "bg-emerald-500/15 text-emerald-400",
  Med: "bg-amber-500/15 text-amber-400",
  High: "bg-red-500/15 text-red-400",
};

export function RiskMatrix({
  categories,
  vaultRisks,
  vaultIds,
}: {
  categories: Category[];
  vaultRisks: VaultRisks;
  vaultIds: string[];
}) {
  return (
    <section id="risk" className="scroll-mt-6">
      <h2 className="text-2xl font-semibold mb-2">Risk Overview</h2>
      <p className="text-[var(--muted-foreground)] text-sm mb-2">
        Vault risks originate from multiple layers including smart contracts, external protocols and liquidity conditions.
        The matrix below summarizes the main risk vectors for each vault.
      </p>
      <p className="text-[var(--muted-foreground)] text-sm mb-4">
        Compare vaults across risk categories. Hover the icon for a human-readable explanation of each rating.
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--card)]">
              <th className="text-left p-3 font-medium text-[var(--card-foreground)]">Vault</th>
              {categories.map((cat) => (
                <th key={cat} className="text-left p-3 font-medium text-[var(--card-foreground)]">
                  {cat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vaultIds.map((id) => {
              const row = vaultRisks[id];
              if (!row) return null;
              return (
                <tr key={id} className="border-b border-[var(--border)] hover:bg-[var(--card)]/50">
                  <td className="p-3 font-medium text-[var(--card-foreground)]">{id}</td>
                  {categories.map((cat) => {
                    const cell = row[cat];
                    if (!cell) return <td key={cat} className="p-3">—</td>;
                    return (
                      <td key={cat} className="p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "rounded px-2 py-0.5 text-xs font-medium",
                              levelStyles[cell.level] ?? "bg-[var(--muted)] text-[var(--muted-foreground)]"
                            )}
                          >
                            {cell.level}
                          </span>
                          <span
                            className="group relative inline-flex items-center gap-2 cursor-help"
                            title={cell.why}
                          >
                            <HelpCircle className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--yo-accent)]" />
                            <span
                              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-20 w-56 rounded-lg border border-[var(--border)] bg-[var(--card)] p-2 text-xs text-[var(--card-foreground)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-normal"
                              role="tooltip"
                            >
                              Why {cell.level}? {cell.why}
                            </span>
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
