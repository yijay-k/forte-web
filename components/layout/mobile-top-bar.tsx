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
    <div className="sticky top-0 z-40 flex items-center gap-2.25 border-b-hair border-ink bg-paper/96 px-3.5 py-2.75 backdrop-blur-[10px] app:hidden">
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="app-sidebar"
        className="press flex size-10.5 shrink-0 items-center justify-center rounded-[13px] border-hair border-ink bg-surface shadow-soft-2 hover:bg-surface-alt hover:shadow-soft-1"
      >
        <span className="flex w-[17px] flex-col gap-1" aria-hidden="true">
          <span className="h-0.5 rounded-hair bg-ink" />
          <span className="h-0.5 rounded-hair bg-ink" />
          <span className="h-0.5 rounded-hair bg-ink" />
        </span>
      </button>

      <Link href="/" className="ml-0.5 flex items-center">
        <ForteMark size="sm" />
      </Link>

      {/* The one number worth surfacing when there is no room for the rail. */}
      {authed && (
        <span className="ml-auto flex shrink-0 items-center gap-2 rounded-pill border-hair border-ink bg-accent px-3.25 py-1.25 shadow-hard-xs">
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase opacity-62">
            Ready
          </span>
          <span className="font-serif text-lg leading-none font-medium tabular-nums">
            {READINESS.score}
          </span>
        </span>
      )}
    </div>
  );
}
