"use client";

import { cn } from "@/utils/cn";
import { PillButton } from "@/components/ui/pill-button";

type Props = {
  allResolved: boolean;
  onRescore: () => void;
};

/** Locked until every claim has a decision — that's the whole discipline. */
export function RescoreCard({ allResolved, onRescore }: Props) {
  return (
    <div
      className={cn(
        "mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-hair px-7.5 py-7",
        allResolved
          ? "border-ink bg-accent shadow-hard-lg"
          : "border-line bg-surface-sunk",
      )}
    >
      <div>
        <div className="mb-1 font-serif text-[clamp(14.3px,3.83vw,23px)] font-medium">
          {allResolved ? "Re-score with your revisions" : "Resolve all three to re-score"}
        </div>
        <p className="max-w-[460px] text-sm leading-relaxed text-ink-soft">
          {allResolved
            ? "Your CV now says only what you can defend. That's the loop closed — and the only version worth sending."
            : "Every claim needs a decision: rewrite it, cut it, or stand by it. Standing by one is fine — it just means you'll be asked again."}
        </p>
      </div>
      <PillButton
        variant="ink"
        size="lg"
        disabled={!allResolved}
        onClick={onRescore}
      >
        {allResolved ? "Re-score my CV →" : "Re-score my CV"}
      </PillButton>
    </div>
  );
}
