"use client";

import { Chip } from "@/components/ui/chip";
import { useClaims } from "./use-claims";
import { ClaimCard } from "./claim-card";
import { ReviseProgress } from "./revise-progress";
import { RescoreCard } from "./rescore-card";
import { RescoreResult } from "./rescore-result";

/** Step 4. A line you can't defend out loud is worse than no line at all. */
export function ReviseScreen() {
  const { claims, resolvedCount, allResolved, rescored, rescore } = useClaims();

  return (
    <div className="mx-auto max-w-[940px] px-14 pt-11 pb-21">
      <Chip tone="amber" className="mb-4.5 px-4 py-1.75 text-[12.5px] shadow-drop">
        Step 4 · Revise
      </Chip>

      <h1 className="mt-0 mb-2.5 font-serif text-[46px] leading-[1.03] font-medium tracking-[-0.02em]">
        The claims you couldn&rsquo;t <em className="italic">defend</em>.
      </h1>
      <p className="mb-7.5 max-w-[620px] text-base leading-[1.55] text-muted">
        Each of these is on your CV and fell apart when we probed it. A line you
        can&rsquo;t defend out loud is worse than no line at all — it invites the
        question. Rewrite it, cut it, or stand by it.
      </p>

      <ReviseProgress resolved={resolvedCount} total={claims.length} />

      <div className="grid gap-4">
        {claims.map((claim, index) => (
          <ClaimCard key={claim.n} claim={claim} index={index} />
        ))}
      </div>

      <RescoreCard allResolved={allResolved} onRescore={rescore} />

      {rescored && <RescoreResult />}
    </div>
  );
}
