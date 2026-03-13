"use client";

import { useState, useCallback } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import {
  useTokenBalance,
  useShareBalance,
  useDeposit,
  useRedeem,
} from "@yo-protocol/react";
import { Coins, Link2, Layers, ArrowDownUp, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BASE_USDC_ADDRESS,
  BASE_CHAIN_ID,
  getTxUrl,
  USDC_DECIMALS,
} from "@/config/web3";

const riskStyles = {
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

function formatUsdc(value: bigint | undefined): string {
  if (value === undefined || value === null) return "—";
  const n = Number(value) / 10 ** USDC_DECIMALS;
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function YoUsdWidget() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [depositAmount, setDepositAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");

  const isWrongNetwork = chainId !== undefined && chainId !== BASE_CHAIN_ID;
  const networkLabel = chainId === 1 ? "Ethereum" : chainId === 42161 ? "Arbitrum" : chainId === 8453 ? "Base" : "Unknown";

  const { balance: usdcBalance, isLoading: usdcLoading } = useTokenBalance(
    BASE_USDC_ADDRESS,
    address,
    { enabled: !!address }
  );

  const { shares: yoUsdShares, isLoading: sharesLoading } = useShareBalance(
    "yoUSD",
    address,
    { enabled: !!address }
  );

  const {
    deposit,
    step: depositStep,
    isLoading: depositLoading,
    isSuccess: depositSuccess,
    hash: depositHash,
    approveHash,
    error: depositError,
    reset: resetDeposit,
  } = useDeposit({
    vault: "yoUSD",
    slippageBps: 50,
    onConfirmed: () => setDepositAmount(""),
  });

  const {
    redeem,
    step: redeemStep,
    isLoading: redeemLoading,
    isSuccess: redeemSuccess,
    hash: redeemHash,
    error: redeemError,
    reset: resetRedeem,
  } = useRedeem({
    vault: "yoUSD",
    onConfirmed: () => setRedeemAmount(""),
  });

  const depositPending =
    depositStep === "switching-chain" ||
    depositStep === "approving" ||
    depositStep === "depositing" ||
    depositStep === "waiting";
  const redeemPending =
    redeemStep === "approving" ||
    redeemStep === "redeeming" ||
    redeemStep === "waiting";

  const handleDeposit = useCallback(async () => {
    const raw = depositAmount.replace(/,/g, ".").trim();
    const num = parseFloat(raw);
    if (!Number.isFinite(num) || num <= 0) return;
    const amount = BigInt(Math.round(num * 10 ** USDC_DECIMALS));
    await deposit({
      token: BASE_USDC_ADDRESS,
      amount,
      chainId: BASE_CHAIN_ID,
    });
  }, [depositAmount, deposit]);

  const handleRedeem = useCallback(async () => {
    const raw = redeemAmount.replace(/,/g, ".").trim();
    const num = parseFloat(raw);
    if (!Number.isFinite(num) || num <= 0) return;
    const amount = BigInt(Math.round(num * 10 ** USDC_DECIMALS));
    if (yoUsdShares !== undefined && amount > yoUsdShares) return;
    await redeem(amount);
  }, [redeemAmount, yoUsdShares, redeem]);

  const lastDepositTxHash = depositHash ?? approveHash;
  const hasYoUsdBalance = yoUsdShares !== undefined && yoUsdShares > 0n;

  const depositAmountRaw = depositAmount.trim() ? parseFloat(depositAmount.replace(/,/g, ".")) : 0;
  const depositAmountWei = Number.isFinite(depositAmountRaw) && depositAmountRaw > 0
    ? BigInt(Math.round(depositAmountRaw * 10 ** USDC_DECIMALS))
    : 0n;
  const insufficientUsdc = !!address && usdcBalance?.balance !== undefined && depositAmountWei > 0n && depositAmountWei > usdcBalance.balance;

  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-sm transition hover:border-[var(--yo-accent-muted)]/40">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-2xl font-bold tracking-tight">yoUSD</span>
        <span
          className={cn(
            "rounded-md border text-xs font-medium px-2 py-0.5",
            riskStyles.Low
          )}
        >
          Low risk
        </span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-2">
        <span className="font-medium text-[var(--card-foreground)]">Underlying asset exposure:</span> Stablecoin lending strategies
      </p>
      <p className="text-sm text-[var(--muted-foreground)] mb-3">
        <span className="font-medium text-[var(--card-foreground)]">Strategy exposure:</span> Stablecoin lending + liquidity strategies
      </p>
      <dl className="space-y-2 text-sm mb-4">
        <div>
          <dt className="text-[var(--muted-foreground)]">Underlying asset</dt>
          <dd className="flex items-center gap-1.5 font-medium">
            <Coins className="h-3.5 w-3.5 text-[var(--yo-accent)]" />
            USD
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Supported chains</dt>
          <dd className="flex items-center gap-1.5">
            <Link2 className="h-3.5 w-3.5" />
            Base
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Strategies count</dt>
          <dd className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            3 strategies
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Withdrawal mode</dt>
          <dd>Instant withdraw</dd>
        </div>
        <div>
          <dt className="text-[var(--muted-foreground)]">Yield mechanism</dt>
          <dd className="flex items-center gap-1.5">
            <ArrowDownUp className="h-3.5 w-3.5" />
            ERC-4626 — value accrues via exchange rate growth
          </dd>
        </div>
      </dl>

      <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-4">
        {!isConnected ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-[var(--muted-foreground)]">Connect wallet to deposit or redeem</p>
            <ConnectKitButton />
          </div>
        ) : (
          <>
            {isWrongNetwork && (
              <div className="rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-sm flex items-center justify-between gap-3 flex-wrap">
                <span className="text-amber-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Wrong network ({networkLabel}). Switch to Base to use this vault.
                </span>
                <button
                  type="button"
                  onClick={() => switchChain?.({ chainId: BASE_CHAIN_ID })}
                  className="rounded-md bg-amber-500 text-black px-3 py-1.5 text-sm font-medium hover:bg-amber-400"
                >
                  Switch to Base
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-[var(--muted-foreground)]">Connected:</span>
              <span className="font-mono text-[var(--foreground)]">{address && shortenAddress(address)}</span>
              <span className="text-[var(--muted-foreground)]">·</span>
              <span className="text-[var(--muted-foreground)]">Network:</span>
              <span className={isWrongNetwork ? "text-amber-400" : "text-emerald-400"}>
                {chainId === BASE_CHAIN_ID ? "Base" : networkLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[var(--muted-foreground)]">USDC balance (Base)</p>
                <p className="font-medium text-[var(--yo-accent)]">
                  {usdcLoading ? "…" : formatUsdc(usdcBalance?.balance)}
                </p>
              </div>
              <div>
                <p className="text-[var(--muted-foreground)]">yoUSD balance</p>
                <p className="font-medium text-[var(--yo-accent)]">
                  {sharesLoading ? "…" : formatUsdc(yoUsdShares)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[var(--muted-foreground)]">Deposit USDC</label>
              {insufficientUsdc && (
                <p className="text-xs text-red-400">Insufficient USDC balance</p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={handleDeposit}
                  disabled={
                    isWrongNetwork ||
                    depositLoading ||
                    !depositAmount.trim() ||
                    depositAmountRaw <= 0 ||
                    insufficientUsdc
                  }
                  className="rounded-md bg-[var(--yo-accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50 flex items-center gap-2"
                >
                  {depositLoading || depositPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Deposit
                </button>
              </div>
            </div>

            {(depositPending || depositSuccess || depositError) && (
              <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3 text-sm space-y-1">
                {depositPending && (
                  <p className="text-amber-400">
                    {depositStep === "approving"
                      ? "Approve — allow USDC spend in your wallet…"
                      : "Pending — confirm in your wallet…"}
                  </p>
                )}
                {depositSuccess && lastDepositTxHash && (
                  <>
                    <p className="text-emerald-400">Transaction confirmed.</p>
                    <a
                      href={getTxUrl(lastDepositTxHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--yo-accent)] hover:underline"
                    >
                      View on Explorer <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </>
                )}
                {depositError && (
                  <p className="text-red-400">{String(depositError.message)}</p>
                )}
                {(depositSuccess || depositError) && (
                  <button
                    type="button"
                    onClick={resetDeposit}
                    className="text-xs text-[var(--muted-foreground)] hover:underline"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs text-[var(--muted-foreground)]">Redeem yoUSD → USDC</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={handleRedeem}
                  disabled={
                    isWrongNetwork ||
                    !hasYoUsdBalance ||
                    redeemLoading ||
                    redeemPending ||
                    !redeemAmount.trim() ||
                    parseFloat(redeemAmount.replace(/,/g, ".")) <= 0
                  }
                  className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {redeemLoading || redeemPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Redeem
                </button>
              </div>
            </div>

            {(redeemPending || redeemSuccess || redeemError) && (
              <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3 text-sm space-y-1">
                {redeemPending && (
                  <p className="text-amber-400">Pending — confirm in your wallet…</p>
                )}
                {redeemSuccess && redeemHash && (
                  <>
                    <p className="text-emerald-400">Redeem confirmed.</p>
                    <a
                      href={getTxUrl(redeemHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--yo-accent)] hover:underline"
                    >
                      View on Explorer <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </>
                )}
                {redeemError && (
                  <p className="text-red-400">{String(redeemError.message)}</p>
                )}
                {(redeemSuccess || redeemError) && (
                  <button
                    type="button"
                    onClick={resetRedeem}
                    className="text-xs text-[var(--muted-foreground)] hover:underline"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            )}
          </>
        )}

        <div className="text-sm">
          <span className="text-[var(--muted-foreground)]">Illustrative APY (mock): </span>
          <span className="text-[var(--yo-accent)] font-medium">4.2%</span>
        </div>
      </div>
    </article>
  );
}
