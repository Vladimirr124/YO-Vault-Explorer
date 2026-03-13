export function Hero() {
  return (
    <section id="hero" className="scroll-mt-6 pb-12 border-b border-[var(--border)]">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--yo-accent)] text-[#0f172a] font-bold text-xl tracking-tight"
          aria-hidden
        >
          YO
        </div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
            YO Protocol Research Explorer
          </h1>
          <span className="rounded-md bg-[var(--yo-accent-muted)]/20 text-[var(--yo-accent)] text-xs font-medium px-2 py-0.5 border border-[var(--yo-accent-muted)]/40">
            Research Tool
          </span>
        </div>
      </div>
      <p className="text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
        YO Vault Explorer is a research-driven interface designed to explain how YO Protocol works under the hood,
        including vault architecture, risk surface, contract roles and yield mechanics.
      </p>
    </section>
  );
}
