"use client";

import { useAuth } from "@/features/auth/use-auth";
import { CURRENT_REP, READINESS, USER } from "@/lib/data/progress";

/** Readiness + account when signed in; the unlock CTA when not. */
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

      <div className="border-t border-ink/10 pt-3">
        <div className="flex items-center gap-2.5 p-1.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-ink text-[13px] font-bold text-on-ink">
            {USER.initials}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[13.5px] font-bold">{USER.name}</div>
            <div className="text-xs text-faint">Rep {CURRENT_REP} · 3 reps this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
