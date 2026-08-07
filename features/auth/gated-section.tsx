"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useAuth } from "./use-auth";
import { useWallSentinel } from "./use-wall-sentinel";
import { useScrollContainer } from "@/components/layout/scroll-container";
import { PillButton } from "@/components/ui/pill-button";

type Props = {
  children: ReactNode;
  /** Copy for the overlay card that sits on top of the blur. */
  eyebrow: string;
  headline: ReactNode;
  body: string;
  cta: string;
  footnote: string;
};

/**
 * Blurs its children until the user unlocks, and drops a scroll sentinel above
 * them that opens the wall on first approach. Content stays mounted and in the
 * DOM order it belongs in — only its legibility is gated — so unlocking is a
 * dissolve rather than a re-render jump.
 */
export function GatedSection({
  children,
  eyebrow,
  headline,
  body,
  cta,
  footnote,
}: Props) {
  const { authed, openWall } = useAuth();
  const scrollRoot = useScrollContainer();
  const sentinelRef = useWallSentinel(scrollRoot);
  const locked = !authed;

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div className="relative">
        <div
          inert={locked || undefined}
          className={cn(
            "transition-[filter,opacity] duration-600 ease-out",
            locked ? "opacity-55 blur-[7px] select-none" : "opacity-100 blur-none",
          )}
        >
          {children}
        </div>

        {locked && (
          <div className="pointer-events-none absolute top-14 right-0 left-0 flex justify-center px-6">
            <div className="pointer-events-auto w-full max-w-[540px] animate-rise rounded-4xl border-hair border-ink bg-surface p-8 text-center shadow-hard-xl">
              <div className="mb-3 text-[11.5px] font-extrabold tracking-[0.08em] text-faint uppercase">
                {eyebrow}
              </div>
              <div className="mb-3 text-pretty font-serif text-[clamp(18px,4.83vw,29px)] leading-[1.18] font-medium">
                {headline}
              </div>
              <div className="mb-6 text-[14.5px] leading-[1.55] text-muted">{body}</div>
              <PillButton
                variant="ink"
                size="xl"
                shadow="accent-md"
                onClick={openWall}
                className="w-full text-[16.5px]"
              >
                {cta}
              </PillButton>
              <div className="mt-3.5 text-[12.5px] font-semibold text-faint">
                {footnote}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
