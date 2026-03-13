"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { YieldProvider } from "@yo-protocol/react";
import { BASE_RPC_URL } from "@/config/web3";

const config = createConfig(
  getDefaultConfig({
    chains: [base],
    transports: {
      [base.id]: http(BASE_RPC_URL),
    },
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
    appName: "YO Vault Explorer",
    appDescription: "Research dashboard for YO Protocol vaults on Base",
    appUrl: typeof window !== "undefined" ? window.location.origin : "",
  })
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <YieldProvider
            defaultSlippageBps={50}
            onError={(err: unknown) => console.error("[YO]", err)}
          >
            {children}
          </YieldProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
