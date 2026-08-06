import type { Pack } from "@/types/billing";

/**
 * Two packs, no subscription. Ordered best-value first because that is the
 * order the design presents them in — the cheaper pack is the fallback, not
 * the anchor.
 */
const PACKS: readonly Pack[] = [
  {
    id: "full",
    name: "12 applications",
    price: "$19",
    unitPrice: "$1.58 an application",
    apps: 12,
    sessions: 15,
    badge: "Best value",
    features: [
      "12 applications, never expire",
      "15 coaching sessions, 20 minutes each",
      "Camera delivery analysis on every interview",
      "Full history and your readiness curve",
    ],
  },
  {
    id: "starter",
    name: "3 applications",
    price: "$9",
    unitPrice: "$3 an application",
    apps: 3,
    sessions: 3,
    features: [
      "3 applications, never expire",
      "3 coaching sessions, 20 minutes each",
      "Camera delivery analysis on every interview",
      "Full history and your readiness curve",
    ],
  },
];

/** Shown alongside the packs, never purchasable — it is granted on signup. */
export const FREE_TIER = {
  name: "1 application",
  price: "Free",
  unitPrice: "No account charge, ever",
  features: [
    "One application, start to finish",
    "Scorecard, all three fixes, marked-up CV",
    "One mock interview with grading",
    "Unlimited re-scores on that application",
  ],
} as const;

export function getPacks(): readonly Pack[] {
  return PACKS;
}

export function getPack(id: Pack["id"]): Pack {
  return PACKS.find((p) => p.id === id) ?? PACKS[0];
}

/** How the current plan is labelled in the sidebar and account header. */
export const PLAN_LABEL = {
  free: "Free plan",
  starter: "3-application pack",
  full: "12-application pack",
} as const;

export const PAYMENT_METHODS = "Link, Apple Pay or card";
