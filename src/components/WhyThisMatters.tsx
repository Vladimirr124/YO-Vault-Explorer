import { Target } from "lucide-react";

const points = [
  "Understand what backs each yoVault",
  "See where protocol risk comes from",
  "Inspect key contracts and roles",
  "Learn how yield accrues through exchange rate growth",
];

export function WhyThisMatters() {
  return (
    <section id="why" className="scroll-mt-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">Why this matters</h2>
      <ul className="space-y-2">
        {points.map((text, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Target className="h-4 w-4 shrink-0 text-[var(--yo-accent)]" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
