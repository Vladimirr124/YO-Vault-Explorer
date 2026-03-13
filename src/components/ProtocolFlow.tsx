import { ArrowRight } from "lucide-react";

type Step = {
  step: number;
  title: string;
  subtitle: string;
  description: string;
};

export function ProtocolFlow({ flow, exchangeRateNote }: { flow: Step[]; exchangeRateNote: string }) {
  return (
    <section id="how-it-works" className="scroll-mt-6">
      <h2 className="text-2xl font-semibold mb-2">How YO works</h2>
      <p className="text-[var(--muted-foreground)] text-sm mb-6">
        Deposit underlying → receive yoToken → vault allocates into strategies → yield increases exchange rate → redeem later for more underlying.
      </p>
      <div className="flex flex-wrap gap-4 items-stretch">
        {flow.map((item, i) => (
          <div key={item.step} className="flex items-center gap-2">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 min-w-[200px] max-w-[260px]">
              <div className="text-xs font-medium text-[var(--yo-accent)] mb-1">
                Step {item.step}: {item.subtitle}
              </div>
              <h3 className="font-semibold text-[var(--card-foreground)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{item.description}</p>
            </div>
            {i < flow.length - 1 && (
              <ArrowRight className="h-5 w-5 text-[var(--muted)] shrink-0" aria-hidden />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-[var(--yo-accent-muted)]/30 bg-[var(--yo-accent-muted)]/10 p-4 text-sm text-[var(--card-foreground)]">
        <strong className="text-[var(--yo-accent)]">Exchange rate:</strong> {exchangeRateNote}
      </div>
    </section>
  );
}
