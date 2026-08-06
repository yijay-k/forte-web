"use client";

import Link from "next/link";
import { ForteMark } from "@/components/brand/forte-mark";
import { useAuth } from "@/features/auth/use-auth";
import { CURRENT_REP } from "@/lib/data/progress";
import { SidebarNav } from "./sidebar-nav";
import { SidebarLoopRail } from "./sidebar-loop-rail";
import { SidebarFooter } from "./sidebar-footer";

/** The 280px left rail: brand, nav, loop progress, account. */
export function Sidebar() {
  const { authed } = useAuth();

  return (
    <aside className="flex h-full w-70 shrink-0 flex-col overflow-hidden p-4 py-5">
      <div className="flex min-h-0 flex-1 flex-col rounded-4xl border-hair border-ink bg-surface px-4 py-5.5 shadow-soft">
        <Link href="/" className="flex items-center gap-2.75 px-2 pt-0.5 pb-5.5">
          <ForteMark />
        </Link>

        <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
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
