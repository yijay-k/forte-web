"use client";

import { useContext } from "react";
import { ClaimsContext, type ClaimsState } from "./claims-provider";

export function useClaims(): ClaimsState {
  const ctx = useContext(ClaimsContext);
  if (!ctx) {
    throw new Error("useClaims must be used inside <ClaimsProvider>");
  }
  return ctx;
}
