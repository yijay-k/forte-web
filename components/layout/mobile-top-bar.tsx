"use client";

import Link from "next/link";
import { ForteMark } from "@/components/brand/forte-mark";
import { useAuth } from "@/features/auth/use-auth";
import { READINESS } from "@/lib/data/progress";
import { useDrawer } from "./drawer";

/**
 * The narrow-viewport chrome: what the 280px rail collapses into below 900px.
 *
 * Sticky rather than fixed, so it scrolls with `<main>`'s own scroll container
 * instead of floating over a second one, and translucent because the dot-grid
 * background reads through it as the page moves.
 */
export function MobileTopBar() {
  const { authed } = useAuth();
  const { open, openDrawer } = useDrawer();

  return (
    // Three columns rather than a flex row, so the mark is centred against the
    // *bar* and not against whatever sits beside it: the outer columns are both
    // `1fr`, so they stay equal whether or not the readiness pill is rendered.
    // Absolute centring would do the same until the pill grew wide enough to
    // slide under it.
    <div className="sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b-hair border-ink bg-paper/96 px-[14px] py-[11px] backdrop-blur-[10px] app:hidden">
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="app-sidebar"
        className="press flex size-10.5 shrink-0 items-center justify-center justify-self-start rounded-[13px] border-hair border-ink bg-surface shadow-soft-2 hover:bg-surface-alt hover:shadow-soft-1"
      >
        <span className="flex w-[17px] flex-col gap-1" aria-hidden="true">
          <span className="h-0.5 rounded-hair bg-ink" />
          <span className="h-0.5 rounded-hair bg-ink" />
          <span className="h-0.5 rounded-hair bg-ink" />
        </span>
      </button>

      <Link href="/" className="col-start-2 flex items-center justify-self-center">
        <ForteMark size="sm" />
      </Link>

      {/* The one number worth surfacing when there is no room for the rail. */}
      {authed && (
        <span className="col-start-3 flex shrink-0 items-center gap-2 justify-self-end rounded-pill border-hair border-ink bg-accent px-3.25 py-1.25 shadow-hard-xs">
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase opacity-62">
            Ready
          </span>
          <span className="font-serif text-[18px] leading-none font-medium tabular-nums">
            {READINESS.score}
          </span>
        </span>
      )}
    </div>
  );
}
