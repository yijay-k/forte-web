"use client";

import { createContext, useContext } from "react";

/**
 * The app's real scrolling element — the shell's `<main>`, not the document.
 *
 * Lives in its own module so `components/ui/*` can lock and observe it without
 * importing the shell (which imports ui, and would cycle).
 */
export const ScrollContainerContext = createContext<HTMLElement | null>(null);

export function useScrollContainer(): HTMLElement | null {
  return useContext(ScrollContainerContext);
}
