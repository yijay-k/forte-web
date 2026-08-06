"use client";

import { useAuth } from "@/features/auth/use-auth";
import { READINESS } from "@/lib/data/progress";
import { SidebarPlanCard } from "./sidebar-plan-card";
import { SidebarUserMenu } from "./sidebar-user-menu";

/** Readiness, entitlements and the account menu — or the unlock CTA when signed out. */
export function SidebarFooter() {
  const { authed, openWall } = useAuth();

  if (!authed) {
    return (
      <div className="mt-4 flex shrink-0 flex-col gap-3">
        <button
          type="button"
          onClick={openWall}
          className="press rounded-pill border-hair border-ink bg-ink px-4.5 py-3.25 text-sm font-semibold text-on-ink shadow-accent-sm hover:shadow-none"
        >
          Unlock the rest — free
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 flex shrink-0 flex-col gap-3">
      <div className="rounded-lg border-hair border-ink bg-accent px-3 py-2.5">
        <div className="flex items-baseline gap-1.75">
          <div className="text-[9.5px] font-extrabold tracking-[0.06em] text-ink-soft uppercase">
            Readiness
          </div>
          <span className="ml-auto font-serif text-xl leading-none font-medium">
            {READINESS.score}
          </span>
          <span className="text-[10.5px] font-bold text-good">{READINESS.delta}</span>
        </div>
        <div className="mt-1 text-[10px] leading-snug text-ink-soft">
          Lowest of your three scores, out of 100 — now {READINESS.driver}.
        </div>
      </div>

      <SidebarPlanCard />
      <SidebarUserMenu />
    </div>
  );
}
