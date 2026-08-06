/** Sidebar entries. `gated` items bounce to the unlock wall when signed out. */
export type NavItem = {
  readonly href: string;
  readonly label: string;
  /** Which glyph `SidebarNav` draws — each nav item has a distinct mark. */
  readonly mark: "square" | "circle" | "ring" | "diamond" | "bar";
  readonly gated: boolean;
  /** Marks this item active for any URL beneath it, not just an exact match. */
  readonly matchPrefix?: boolean;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/cv", label: "CV Evaluator", mark: "square", gated: false, matchPrefix: true },
  { href: "/", label: "Home", mark: "circle", gated: true },
  { href: "/interview", label: "Mock Interview", mark: "ring", gated: true },
  { href: "/revise", label: "Revise", mark: "diamond", gated: true },
  { href: "/progress", label: "Progress", mark: "bar", gated: true },
];

/** The four-step rail across the top of the flow. Order matters. */
export const FLOW_STEPS = ["Your CV", "Score", "Interview", "Revise"] as const;

export const FLOW_STEPPER_CAPTION = "The loop ends in a rewrite, not a report.";

/**
 * Which flow step a URL sits on, or `null` to hide the stepper entirely.
 * `/cv` (the saved list) is outside the flow — you haven't started one yet.
 */
export function flowStepForPath(pathname: string): number | null {
  if (pathname === "/cv/new") return 0;
  if (isCvReportPath(pathname)) return 1;
  if (pathname === "/interview") return 2;
  if (pathname === "/revise") return 3;
  return null;
}

/**
 * A specific CV report, e.g. `/cv/meridian` — the only place the paywall has
 * anything to sell, and so the only place the sticky unlock bar belongs.
 */
export function isCvReportPath(pathname: string): boolean {
  return pathname.startsWith("/cv/") && pathname !== "/cv/new";
}
