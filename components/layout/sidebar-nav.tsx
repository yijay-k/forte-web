"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { NAV_ITEMS, type NavItem } from "@/constants/navigation";
import { useAuth } from "@/features/auth/use-auth";
import { useClaims } from "@/features/revise/use-claims";
import { useDrawer } from "./drawer";

const MARK: Record<NavItem["mark"], string> = {
  square: "size-2 rounded-hair bg-current",
  circle: "size-2 rounded-pill bg-current",
  ring: "size-2 rounded-pill border-2 border-current",
  diamond: "size-2 rotate-45 rounded-[1px] bg-current",
  bar: "h-0.5 w-2.25 bg-current",
};

/**
 * The five nav items. Gated destinations open the unlock wall instead of
 * navigating — the CV evaluator is the only one reachable signed out, because
 * that's where the free fix lives.
 */
export function SidebarNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { authed, openWall } = useAuth();
  const { openCount } = useClaims();
  const { closeDrawer } = useDrawer();

  function go(item: NavItem) {
    // Opening the wall does not change the URL, so the shell's route-change
    // close never fires — the drawer has to stand down explicitly.
    closeDrawer();

    if (item.gated && !authed) {
      openWall();
      return;
    }
    // The saved-applications list is private; signed out, "CV Evaluator"
    // means the free upload wizard.
    if (item.href === "/cv" && !authed) {
      router.push("/cv/new");
      return;
    }
    router.push(item.href);
  }

  return (
    <nav className="flex flex-col gap-1.5">
      {NAV_ITEMS.map((item) => {
        const active = item.matchPrefix
          ? pathname === item.href || pathname.startsWith(`${item.href}/`)
          : pathname === item.href;
        const badge = item.href === "/revise" && authed && openCount > 0;
        // Revise carries the open-claim badge instead of a pip — the prototype
        // never draws a lock on that row.
        const locked = item.gated && !authed && item.href !== "/revise";

        return (
          <button
            key={item.href}
            type="button"
            onClick={() => go(item)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-pill border-hair px-4 py-2.75 text-left text-[15px] transition-colors",
              active
                ? "border-ink bg-accent font-semibold text-ink"
                : "border-transparent font-medium text-ink hover:bg-ink/4",
            )}
          >
            <span className={MARK[item.mark]} aria-hidden="true" />
            {item.label}
            {locked && (
              <span className="ml-auto text-[10px] opacity-50" aria-label="locked">
                🔒
              </span>
            )}
            {badge && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-pill border-hair border-ink bg-amber px-1.25 text-[11px] font-extrabold text-ink">
                {openCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
