import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Contract = {
  name: string;
  group?: string;
  role: "Automated" | "Governance";
  description: string;
  baseExplorer: string;
  addressBase: string | null;
};

const groupOrder = [
  "Core access",
  "Governance and operations",
  "User flow and automation",
];

export function ContractsTable({ contracts }: { contracts: Contract[] }) {
  const grouped = groupOrder.reduce<Record<string, Contract[]>>((acc, g) => {
    acc[g] = contracts.filter((c) => c.group === g);
    return acc;
  }, {});

  return (
    <section id="contracts" className="scroll-mt-6">
      <h2 className="text-2xl font-semibold mb-2">Protocol contracts</h2>
      <p className="text-[var(--muted-foreground)] text-sm mb-4">
        Grouped by role: core access, governance and operations, user flow and automation.
      </p>
      <div className="rounded-lg border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--card)]">
              <th className="text-left p-3 font-medium text-[var(--card-foreground)] w-40">Group</th>
              <th className="text-left p-3 font-medium text-[var(--card-foreground)]">Contract</th>
              <th className="text-left p-3 font-medium text-[var(--card-foreground)]">Role</th>
              <th className="text-left p-3 font-medium text-[var(--card-foreground)]">Description</th>
              <th className="text-left p-3 font-medium text-[var(--card-foreground)]">Base</th>
            </tr>
          </thead>
          <tbody>
            {groupOrder.map((group) => {
              const rows = grouped[group];
              if (!rows?.length) return null;
              return rows.map((contract, i) => (
                <ContractRow
                  key={contract.name}
                  contract={contract}
                  showGroup={i === 0}
                  group={group}
                />
              ));
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ContractRow({
  contract,
  showGroup,
  group,
}: {
  contract: Contract;
  showGroup: boolean;
  group: string;
}) {
  const link = contract.addressBase
    ? `${contract.baseExplorer}${contract.addressBase}`
    : null;
  return (
    <tr className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--card)]/50">
      <td className="p-3 text-[var(--muted-foreground)] align-top">
        {showGroup ? group : ""}
      </td>
      <td className="p-3 font-medium text-[var(--card-foreground)]">{contract.name}</td>
      <td className="p-3">
        <span
          className={cn(
            "rounded px-2 py-0.5 text-xs font-medium",
            contract.role === "Automated"
              ? "bg-[var(--yo-accent-muted)]/20 text-[var(--yo-accent)]"
              : "bg-[var(--muted)] text-[var(--muted-foreground)]"
          )}
        >
          {contract.role}
        </span>
      </td>
      <td className="p-3 text-[var(--muted-foreground)]">{contract.description}</td>
      <td className="p-3">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--yo-accent)] hover:underline"
          >
            Explorer <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="text-[var(--muted-foreground)]">—</span>
        )}
      </td>
    </tr>
  );
}
