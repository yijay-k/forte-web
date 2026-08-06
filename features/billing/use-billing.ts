"use client";

import { useContext } from "react";
import { BillingContext, type BillingState } from "./billing-provider";

export function useBilling(): BillingState {
  const ctx = useContext(BillingContext);
  if (!ctx) {
    throw new Error("useBilling must be used inside <BillingProvider>");
  }
  return ctx;
}
