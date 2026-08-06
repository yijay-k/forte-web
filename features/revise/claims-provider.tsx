"use client";

import { createContext, useMemo, useReducer, type ReactNode } from "react";
import { getClaims } from "@/lib/data/claims";
import { isResolved, type Claim } from "@/types/revise";

/**
 * Claim resolution is a small state machine over a list, so it's a reducer
 * rather than five setters. Every transition returns new objects — nothing is
 * mutated in place.
 */
type Action =
  | { type: "edit"; index: number }
  | { type: "draft"; index: number; value: string }
  | { type: "suggest"; index: number }
  | { type: "save"; index: number }
  | { type: "cancel"; index: number }
  | { type: "cut"; index: number }
  | { type: "stand"; index: number }
  | { type: "reopen"; index: number };

function reducer(claims: readonly Claim[], action: Action): readonly Claim[] {
  return claims.map((claim, i) => {
    if (i !== action.index) return claim;

    switch (action.type) {
      case "edit":
        return { ...claim, status: "editing", draft: claim.draft || "" };
      case "draft":
        return { ...claim, draft: action.value };
      case "suggest":
        return { ...claim, draft: claim.suggestion };
      // An empty draft can't count as a rewrite — fall back to unresolved.
      case "save":
        return { ...claim, status: claim.draft.trim() ? "rewritten" : "open" };
      case "cancel":
      case "reopen":
        return { ...claim, status: "open" };
      case "cut":
        return { ...claim, status: "cut" };
      case "stand":
        return { ...claim, status: "stood" };
      default:
        return claim;
    }
  });
}

export type ClaimsState = {
  claims: readonly Claim[];
  resolvedCount: number;
  openCount: number;
  allResolved: boolean;
  dispatch: (action: Action) => void;
  /** Set once the user re-scores; reveals the score deltas. */
  rescored: boolean;
  rescore: () => void;
};

export const ClaimsContext = createContext<ClaimsState | null>(null);

export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [claims, dispatch] = useReducer(reducer, null, () => getClaims());
  const [rescored, markRescored] = useReducer(() => true, false);

  const value = useMemo<ClaimsState>(() => {
    const resolvedCount = claims.filter((c) => isResolved(c.status)).length;
    return {
      claims,
      resolvedCount,
      openCount: claims.length - resolvedCount,
      allResolved: resolvedCount === claims.length,
      dispatch,
      rescored,
      rescore: markRescored,
    };
  }, [claims, rescored]);

  return <ClaimsContext.Provider value={value}>{children}</ClaimsContext.Provider>;
}
