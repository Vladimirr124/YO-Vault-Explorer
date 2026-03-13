"use client";

import { ConnectKitButton } from "connectkit";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-6 h-14">
        <h1 className="text-xl font-semibold tracking-tight">YO Protocol Research Explorer</h1>
        <ConnectKitButton />
      </div>
    </header>
  );
}
