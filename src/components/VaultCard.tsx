import { Coins, Link2, Layers, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type Vault = {
  id: string;
  ticker: string;
  underlying: string;
  /** Short description of underlying asset exposure (e.g. "ETH yield strategies") */
  exposure: string;
  /** Strategy exposure summary (e.g. "Stablecoin lending + liquidity strategies") */
  strategyExposure: string;
  chain: string;
  riskLevel: "Low" | "Med" | "High";
  strategiesCount: number;
  isInstantWithdraw: boolean;
  mechanism: string;
  apyMock: string;
};

const riskStyles = {
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Med: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  High: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function VaultCard({ vault }: { vault: Vault }) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-sm transition hover:border-[var(--yo-accent-muted)]/40">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-2xl font-bold tracking-tight">{vault.ticker}</span>
        <span
          className={cn(
            "rounded-md border text-xs font-medium px-2 py-0.5",
            riskStyles[vault.riskLevel]
          )}
        >
          {vault.riskLevel} risk
        </span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-2">
        <span className="font-medium text-[var(--card-foreground)]">Underlying asset exposure:</span> {vault.exposure}
      </p>
      <p className="text-sm text-[var(--muted-foreground)] mb-3">
        <span className="font-medium text-[var(--card-foreground)]">Strategy exposure:</span> {vault.strategyExposure}
      </p>
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-[var(--muted-foreground)]">Underlying asset</dt>
          <dd className="flex items-center gap-1.5 font-medium">
            <Coins className="h-3.5 w-3.5 text-[var(--yo-accent)]" />
            {vault.underlying}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Supported chains</dt>
          <dd className="flex items-center gap-1.5">
            <Link2 className="h-3.5 w-3.5" />
            {vault.chain}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Strategies count</dt>
          <dd className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            {vault.strategiesCount} strategy{vault.strategiesCount !== 1 ? "ies" : ""}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Withdrawal mode</dt>
          <dd>
            {vault.isInstantWithdraw ? "Instant withdraw" : "Queue / delayed (e.g. under stress)"}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Yield mechanism</dt>
          <dd className="flex items-center gap-1.5">
            <ArrowDownUp className="h-3.5 w-3.5" />
            {vault.mechanism} — value accrues via exchange rate growth
          </dd>
        </div>
      </dl>
      <div className="mt-4 pt-4 border-t border-[var(--border)] text-sm">
        <span className="text-[var(--muted-foreground)]">Illustrative APY (mock): </span>
        <span className="text-[var(--yo-accent)] font-medium">{vault.apyMock}%</span>
      </div>
    </article>
  );
}
