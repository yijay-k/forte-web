"use client";

import { createContext, useContext } from "react";

/**
 * The shell's outermost box — the element the drawer, the scrim and both modals
 * are positioned against.
 *
 * Lives in its own module for the same reason `scroll-container` does: the
 * shell imports `components/ui/modal`, so a modal reaching back into the shell
 * for this element would close an import cycle.
 */
export const AppFrameContext = createContext<HTMLElement | null>(null);

/** Null until the shell has mounted, which is also when a portal first works. */
export function useAppFrame(): HTMLElement | null {
  return useContext(AppFrameContext);
}
