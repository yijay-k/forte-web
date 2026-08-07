"use client";

import Link from "next/link";
import { Sticker } from "@/components/ui/sticker";
import { IconPencil } from "@/components/ui/icons";
import { useClaims } from "@/features/revise/use-claims";

/** The black step-4 CTA — the loudest thing on the page, because it closes the loop. */
export function ReviseCallout() {
  const { openCount } = useClaims();

  const headline =
    openCount === 0
      ? "All three resolved — re-score your CV"
      : `${openCount} claims you couldn't defend`;

  return (
    <div className="relative mb-8.5">
      <Sticker position="absolute -top-4 left-6.5" animate>
        this closes the loop
      </Sticker>

      <Link
        href="/revise"
        className="press flex w-full flex-wrap items-center gap-7 rounded-4xl border-hair border-ink bg-ink px-8.5 py-8 text-left text-on-ink shadow-accent hover:shadow-accent-lg"
      >
        <div className="flex size-14.5 shrink-0 items-center justify-center rounded-[17px] bg-accent text-ink">
          <IconPencil size={26} />
        </div>
        <div className="flex-1">
          <div className="mb-1.75 text-xs font-extrabold tracking-[0.08em] text-accent uppercase">
            Step 4 · Revise
          </div>
          <div className="font-serif text-[clamp(16.7px,4.5vw,27px)] leading-[1.15] font-medium">
            {headline}
          </div>
          <div className="mt-1 text-[13.5px] text-on-ink-muted">
            Rewrite, cut, or stand by each one — then re-score
          </div>
        </div>
        <span className="flex items-center gap-2.25 rounded-pill bg-accent px-7.5 py-3.75 text-base font-semibold whitespace-nowrap text-ink">
          Open <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
