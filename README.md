# YO Protocol Research Explorer

## What this project is

YO Protocol Research Explorer is a **research tool + live vault interaction demo**. It combines protocol research with a real integration layer: in addition to explaining YO vault architecture, risk surface and contract roles, it lets users **connect a wallet**, **approve USDC**, **deposit into a live YO vault on Base**, **redeem** yoUSD back to USDC, and **view real onchain transaction results** (tx hash, explorer link).

- **Research angle:** vault overview, how YO works, risk matrix, protocol contracts, insights.
- **Live interaction:** wallet connect (MetaMask, WalletConnect, etc.), one live vault — **yoUSD on Base** — with real deposit and redeem flows via **@yo-protocol/react** SDK. All transactions are onchain; success, pending and error states and BaseScan links are shown.

## Hackathon alignment

This project:

- **Uses YO vault integration** — deposit and redeem flows are built with **@yo-protocol/react** (and @yo-protocol/core). The SDK is used for vault state, token/share balances, approve, deposit and redeem; this is visible in the codebase and in this README.
- **Supports real wallet connection** — ConnectKit + wagmi; users can connect an EVM wallet, see their address and current network.
- **Executes live deposit and redeem flows** — real approve (when needed), deposit USDC into yoUSD, redeem yoUSD to USDC. Transactions are sent onchain.
- **Interacts with live YO vaults on Base** — yoUSD vault and USDC on Base (chainId 8453); real vault and token addresses, no simulation.
- **Demonstrates onchain transactions** — after each action, users see pending/confirmed/failed state, tx hash and a “View on Explorer” link to BaseScan.

Wrong network is handled: the app shows “Switch to Base” when the wallet is on another chain. Insufficient balance is indicated when the deposit amount exceeds the user’s USDC balance.

## What the explorer shows

- **Interactive Vault Demo** — connect wallet, see network and balances, approve/deposit USDC into yoUSD, redeem yoUSD, view tx hash and explorer link.
- **Vault overview** — underlying assets, chains, risk level, strategies, withdrawal mode and yield mechanism per yoVault.
- **Protocol architecture and capital flow** — deposit → yoToken → strategy allocation → exchange rate growth → redeem.
- **Risk categories across vaults** — Smart Contract, Protocol, Chain, Liquidity, Strategy and Bridging, with short explanations.
- **Key protocol contracts and roles** — Core access, Governance and operations, User flow and automation.
- **Research insights** — ERC-4626, non-rebasing yield, whitelist-only strategies, gradual decentralization.

## Tech stack

- Next.js 14 (App Router), Tailwind CSS, Lucide React
- Web3: wagmi 2, ConnectKit, viem; network **Base**
- YO Protocol: **@yo-protocol/react** + @yo-protocol/core (YieldProvider, useDeposit, useRedeem, useTokenBalance, useShareBalance, etc.)

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (from [WalletConnect Cloud](https://cloud.walletconnect.com/)) for wallet connect.

## Live demo

[Live demo](https://yo-vault-explorer.vercel.app/)

## Repository

[GitHub](https://github.com/Vladimirr124/YO-Vault-Explorer)
