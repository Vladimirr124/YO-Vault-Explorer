# YO Protocol Research Explorer

## What this project is

YO Protocol Research Explorer is a research-driven interface designed to help users and researchers understand how YO Protocol works under the hood.

The tool focuses on vault architecture, yield mechanics, contract roles and protocol risk surface.

## What the explorer shows

- **Vault overview** — underlying assets, chains, risk level, strategies, withdrawal mode and yield mechanism per yoVault
- **Protocol architecture and capital flow** — deposit → yoToken → strategy allocation → exchange rate growth → redeem
- **Risk categories across vaults** — Smart Contract, Protocol, Chain, Liquidity, Strategy and Bridging, with human-readable explanations
- **Key protocol contracts and roles** — Core access, Governance and operations, User flow and automation
- **Research insights** — ERC-4626, non-rebasing yield, whitelist-only strategies, gradual decentralization

## Why I built this

This project was built as part of the Hack with YO hackathon to explore the architecture of the protocol and present it in a way that is easier to understand for users and researchers.

## Tech stack

- Next.js 14 (App Router)
- Tailwind CSS
- Lucide React

## Live demo

[Live demo](https://yo-vault-explorer.vercel.app/)

## Repository

[GitHub](https://github.com/Vladimirr124/YO-Vault-Explorer)
