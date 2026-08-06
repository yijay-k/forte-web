"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { getPack } from "@/lib/data/plans";
import { useAuth } from "@/features/auth/use-auth";
import type { Entitlements, Pack, PlanId } from "@/types/billing";

const FREE: Entitlements = {
  plan: "free",
  appsLeft: 0,
  // The free application is already spent — that is the state the app opens in.
  appsTotal: 1,
  sessionsLeft: 0,
};

export type BillingState = Entitlements & {
  /** The plans modal. */
  payOpen: boolean;
  openPay: () => void;
  dismissPay: () => void;
  buy: (packId: Pack["id"]) => void;
  /**
   * Signed in with nothing left to spend. Actions that would consume an
   * application call this and open the plans modal instead of proceeding.
   */
  atLimit: boolean;
  /** Returns true when it handled the block, so callers can bail early. */
  blockIfOutOfApps: () => boolean;
  reset: () => void;
  appsUsed: number;
  usedPercent: number;
};

export const BillingContext = createContext<BillingState | null>(null);

export function BillingProvider({
  children,
  initialPlan = "free",
}: {
  children: ReactNode;
  initialPlan?: PlanId;
}) {
  // Entitlements only bite once signed in — a visitor still has their free
  // application ahead of them, so they are never "at the limit".
  const { authed } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlements>(() =>
    initialPlan === "free" ? FREE : grant(FREE, getPack(initialPlan as Pack["id"])),
  );
  const [payOpen, setPayOpen] = useState(false);

  const openPay = useCallback(() => setPayOpen(true), []);
  const dismissPay = useCallback(() => setPayOpen(false), []);

  // Packs stack: buying never resets what you already have.
  const buy = useCallback((packId: Pack["id"]) => {
    setEntitlements((current) => grant(current, getPack(packId)));
    setPayOpen(false);
  }, []);

  const reset = useCallback(() => {
    setEntitlements(FREE);
    setPayOpen(false);
  }, []);

  const atLimit = authed && entitlements.appsLeft <= 0;

  const blockIfOutOfApps = useCallback(() => {
    if (!atLimit) return false;
    setPayOpen(true);
    return true;
  }, [atLimit]);

  const value = useMemo<BillingState>(() => {
    const appsUsed = entitlements.appsTotal - entitlements.appsLeft;
    return {
      ...entitlements,
      payOpen,
      openPay,
      dismissPay,
      buy,
      atLimit,
      blockIfOutOfApps,
      reset,
      appsUsed,
      usedPercent:
        entitlements.appsTotal > 0
          ? Math.round((appsUsed / entitlements.appsTotal) * 100)
          : 0,
    };
  }, [entitlements, payOpen, openPay, dismissPay, buy, atLimit, blockIfOutOfApps, reset]);

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}

function grant(current: Entitlements, pack: Pack): Entitlements {
  return {
    plan: pack.id,
    appsLeft: current.appsLeft + pack.apps,
    appsTotal: current.appsTotal + pack.apps,
    sessionsLeft: current.sessionsLeft + pack.sessions,
  };
}
