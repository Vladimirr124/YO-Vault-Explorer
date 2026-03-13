/**
 * Web3 / Base network configuration for YO Vault Explorer.
 * Used by wagmi and ConnectKit.
 */

export const BASE_CHAIN_ID = 8453 as const;

export const BASE_RPC_URL =
  process.env.NEXT_PUBLIC_BASE_RPC_URL ?? "https://mainnet.base.org";

export const BASE_BLOCK_EXPLORER = "https://basescan.org";

export const BASE_USDC_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

/** USDC has 6 decimals on Base */
export const USDC_DECIMALS = 6;

export function getTxUrl(txHash: string): string {
  return `${BASE_BLOCK_EXPLORER}/tx/${txHash}`;
}
