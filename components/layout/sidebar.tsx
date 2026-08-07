"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ForteMark } from "@/components/brand/forte-mark";
import { useAuth } from "@/features/auth/use-auth";
import { CURRENT_REP } from "@/lib/data/progress";
import { cn } from "@/utils/cn";
import { SidebarNav } from "./sidebar-nav";
import { SidebarLoopRail } from "./sidebar-loop-rail";
import { SidebarFooter } from "./sidebar-footer";
import { useDrawer, useIsNarrow } from "./drawer";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The left rail: brand, nav, loop progress, account.
 *
 * 280px and static from 900px up. Below that the same markup slides in as a
 * drawer over the content — one tree, not two, so nav state and focus order
 * never diverge between the two presentations.
 */
export function Sidebar() {
  const { authed } = useAuth();
  const { open, closeDrawer } = useDrawer();
  const isNarrow = useIsNarrow();
  const asideRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const isDialog = isNarrow && open;

  // Dialog behaviour is scoped to the drawer presentation on purpose: trapping
  // focus in a permanently-visible desktop column would strand keyboard users
  // in the nav with no way out.
  useEffect(() => {
    if (!isDialog) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = asideRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    asideRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      returnFocusRef.current?.focus?.();
    };
  }, [isDialog, closeDrawer]);

  return (
    <aside
      ref={asideRef}
      id="app-sidebar"
      // Closed, the drawer is only translated off-screen — still in the layout
      // and still tabbable. `inert` is what actually takes it out of the tab
      // order; without it the first Tab on a phone lands in an invisible menu.
      inert={isNarrow && !open}
      {...(isDialog
        ? { role: "dialog" as const, "aria-modal": true, "aria-label": "Navigation" }
        : {})}
      className={cn(
        "absolute inset-y-0 left-0 z-60 flex w-[min(300px,86%)] flex-col overflow-hidden px-2.5 py-3",
        "transition-transform duration-[280ms] ease-[cubic-bezier(.4,0,.2,1)]",
        open ? "translate-x-0" : "-translate-x-[108%]",
        // From here up it is a plain column again: no transform, no stacking
        // context, no drawer.
        "app:static app:z-auto app:w-70 app:shrink-0 app:translate-x-0 app:px-4 app:py-5",
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col rounded-4xl border-hair border-ink bg-surface px-4 py-5.5 shadow-soft">
        <Link
          href="/"
          onClick={closeDrawer}
          className="flex items-center gap-2.75 px-2 pt-0.5 pb-5.5"
        >
          <ForteMark />
        </Link>

        <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <SidebarNav />

          {authed && <SidebarLoopRail rep={CURRENT_REP} />}

          {!authed && (
            <div className="mt-6 rounded-xl border-hair border-dashed border-line bg-surface-sunk p-4">
              <div className="mb-1.5 text-[12.5px] font-bold">
                You&rsquo;re browsing without an account
              </div>
              <div className="text-xs leading-relaxed text-muted">
                Your first fix is free and needs no signup. The rest of the report
                unlocks when you&rsquo;re ready.
              </div>
            </div>
          )}
        </div>

        <SidebarFooter />
      </div>
    </aside>
  );
}
