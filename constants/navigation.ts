/** Sidebar entries. `gated` items bounce to the unlock wall when signed out. */
export type NavItem = {
  readonly href: string;
  readonly label: string;
  /** Which glyph `SidebarNav` draws. A key, not a component — this file is
   *  data, and importing JSX here would make every consumer of the route table
   *  pull in the icon set. */
  readonly icon: "document" | "home" | "mic" | "pencil" | "trend";
  readonly gated: boolean;
  /** Marks this item active for any URL beneath it, not just an exact match. */
  readonly matchPrefix?: boolean;
};

/**
 * Routes that require an account. A superset of the gated NAV_ITEMS —
 * `/account` is reachable from the user menu rather than the sidebar, and the
 * saved-applications list at `/cv` is private too (the prototype only ever
 * shows a signed-out visitor the upload wizard).
 */
export const GATED_EXACT_ROUTES: readonly string[] = ["/", "/cv"];

export const GATED_ROUTE_PREFIXES: readonly string[] = [
  "/interview",
  "/revise",
  "/progress",
  "/account",
];

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/cv", label: "CV Evaluator", icon: "document", gated: false, matchPrefix: true },
  { href: "/", label: "Home", icon: "home", gated: true },
  { href: "/interview", label: "Mock Interview", icon: "mic", gated: true },
  { href: "/revise", label: "Revise", icon: "pencil", gated: true },
  { href: "/progress", label: "Progress", icon: "trend", gated: true },
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
