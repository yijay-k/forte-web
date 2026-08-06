"use client";

import { useBilling } from "@/features/billing/use-billing";

/** Entitlement summary in the sidebar. Opens the plans modal. */
export function SidebarPlanCard() {
  const { appsLeft, sessionsLeft, openPay } = useBilling();
  const hasApps = appsLeft > 0;

  return (
    <button
      type="button"
      onClick={openPay}
      className="flex w-full items-center gap-2 rounded-lg border-hair border-line bg-surface-sunk px-3 py-2.25 text-left transition-colors hover:border-ink"
    >
      <span className="min-w-0">
        <span className="block text-[10px] font-extrabold tracking-[0.05em] text-[#8a897e] uppercase">
          {hasApps ? "Applications" : "Free plan"}
        </span>
        <span className="mt-0.5 block text-[11px] leading-[1.35] text-muted">
          {hasApps
            ? `${appsLeft} left · ${sessionsLeft} coaching sessions`
            : "Free application used"}
        </span>
      </span>
      <span className="ml-auto text-[10.5px] font-bold whitespace-nowrap underline">
        {hasApps ? "Account" : "Buy more"}
      </span>
    </button>
  );
}
