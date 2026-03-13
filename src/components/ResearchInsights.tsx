import { FileText } from "lucide-react";

const bullets = [
  "ERC-4626 standard: all yoTokens are ERC-4626 vaults; composability and tooling compatibility.",
  "Non-rebasing yield: share balance stays constant; value accrues via increasing exchange rate.",
  "Whitelist-only strategies: only approved strategies receive capital; caps limit concentration.",
  "Gradual decentralization: Admin and Operator multisigs; roadmap toward more decentralized governance.",
];

export function ResearchInsights() {
  return (
    <section id="research" className="scroll-mt-6">
      <h2 className="text-2xl font-semibold mb-2">Research Insights</h2>
      <p className="text-[var(--muted-foreground)] text-sm mb-4">
        Key points for due diligence and integration.
      </p>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
        <ul className="space-y-3">
          {bullets.map((text, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--card-foreground)]">
              <FileText className="h-4 w-4 shrink-0 text-[var(--yo-accent)] mt-0.5" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
