"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

/**
 * The mobile navigation drawer.
 *
 * Lives in its own module rather than in `app-shell` for the same reason
 * `scroll-container` does: the shell imports the sidebar, so anything the
 * sidebar needs from the shell would close an import cycle.
 */
type DrawerValue = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<DrawerValue>({
  open: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function useDrawer(): DrawerValue {
  return useContext(DrawerContext);
}

/**
 * Below this width the left rail is a drawer; at or above it, a static column.
 * Matches `--breakpoint-app` in `globals.css` — the two must move together, so
 * the number is stated once here and once there and nowhere else.
 */
const NARROW = "(max-width: 899.98px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(NARROW);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(NARROW).matches;
}

/**
 * The server has no viewport, so it reports "wide". That is safe because this
 * hook drives *behaviour*, never layout — CSS alone decides whether the rail
 * renders as a drawer, and the dialog semantics this gates are inert until the
 * drawer is actually open, which cannot happen before hydration.
 */
function getServerSnapshot() {
  return false;
}

/** True while the viewport is narrow enough that the rail is a drawer. */
export function useIsNarrow(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
