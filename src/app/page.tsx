import { Header } from "@/components/Header";
import { SidebarNav } from "@/components/SidebarNav";
import { Hero } from "@/components/Hero";
import { WhyThisMatters } from "@/components/WhyThisMatters";
import { VaultCard, type Vault } from "@/components/VaultCard";
import { YoUsdWidget } from "@/components/YoUsdWidget";
import { ProtocolFlow } from "@/components/ProtocolFlow";
import { RiskMatrix } from "@/components/RiskMatrix";
import { ContractsTable } from "@/components/ContractsTable";
import { ResearchInsights } from "@/components/ResearchInsights";
import { FinalTakeaway } from "@/components/FinalTakeaway";
import { Footer } from "@/components/Footer";

import vaultsData from "../../data/vaults.json";
import contractsData from "../../data/contracts.json";
import architectureData from "../../data/architecture.json";
import riskMatrixData from "../../data/riskMatrix.json";

const vaults = vaultsData as Vault[];
const contracts = contractsData.contracts as Array<{
  name: string;
  group?: string;
  role: "Automated" | "Governance";
  description: string;
  baseExplorer: string;
  mainnetExplorer: string | null;
  addressBase: string | null;
  addressMainnet: string | null;
}>;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="shrink-0 pl-6">
          <SidebarNav />
        </aside>
        <main className="flex-1 min-w-0 px-6 pb-16 space-y-16">
          <Hero />
          <section id="about" className="scroll-mt-6 py-6 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">About YO</h2>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-2xl">
              YO Protocol is a multi-chain yield optimizer that routes user capital across DeFi strategies using ERC4626 vaults.
              This explorer helps you understand vault design, risk vectors and contract roles without connecting a wallet.
            </p>
          </section>
          <WhyThisMatters />

          <section id="demo" className="scroll-mt-6">
            <h2 className="text-2xl font-semibold mb-2">Interactive Vault Demo</h2>
            <p className="text-[var(--muted-foreground)] text-sm mb-6">
              Try a live YO vault: connect your wallet, approve USDC, deposit into yoUSD on Base, or redeem. All transactions are real onchain.
            </p>
            <YoUsdWidget />
          </section>

          <section id="vaults" className="scroll-mt-6">
            <h2 className="text-2xl font-semibold mb-2">Vault Overview</h2>
            <p className="text-[var(--muted-foreground)] text-sm mb-6">
              What backs each yoVault: underlying asset, chains, risk level, strategies, withdrawal mode, yield mechanism.
            </p>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {vaults.map((vault) => (
                <VaultCard key={vault.id} vault={vault} />
              ))}
            </div>
          </section>

          <ProtocolFlow
            flow={architectureData.flow}
            exchangeRateNote={architectureData.exchangeRateNote}
          />

          <RiskMatrix
            categories={riskMatrixData.categories}
            vaultRisks={riskMatrixData.vaultRisks}
            vaultIds={vaults.map((v) => v.id)}
          />

          <ContractsTable contracts={contracts} />
          <ResearchInsights />
          <FinalTakeaway />
          <Footer />
        </main>
      </div>
    </div>
  );
}
