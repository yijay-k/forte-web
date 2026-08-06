"use client";

import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { PillButton } from "@/components/ui/pill-button";
import { JdParsedSummary } from "./jd-parsed-summary";
import type { useJdInput } from "./use-jd-input";

/** Step 2 — the posting. This is where the score comes from, so it says so. */
export function JdPastePanel({ jd }: { jd: ReturnType<typeof useJdInput> }) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2.5">
        <CardTitle>2 · The job posting</CardTitle>
        <span className="rounded-pill border border-[#e8b06a] bg-amber/24 px-2.75 py-1 text-[11px] font-extrabold tracking-[0.06em] text-warn uppercase">
          where the score comes from
        </span>
      </div>
      <p className="mb-4.5 text-[13.5px] leading-relaxed text-muted">
        Paste the whole thing — responsibilities, requirements, the waffle. We keep
        only what your CV can be checked against.
      </p>

      {jd.parsed ? (
        <JdParsedSummary {...jd.summary} onReplace={jd.clear} />
      ) : (
        <>
          <textarea
            value={jd.text}
            onChange={(e) => jd.setText(e.target.value)}
            placeholder="Paste the job description here…"
            aria-label="Job description"
            className="min-h-37.5 w-full resize-y rounded-lg border-hair border-ink bg-white px-4.5 py-4 text-sm leading-relaxed outline-none"
          />
          <div className="mt-3.5 flex flex-wrap items-center gap-3">
            <PillButton
              variant="ink"
              size="lg"
              disabled={!jd.canParse}
              onClick={jd.parse}
            >
              Read the posting <span aria-hidden="true">→</span>
            </PillButton>
            <PillButton variant="outline" onClick={jd.useSample}>
              Use a sample posting
            </PillButton>
          </div>
          <button
            type="button"
            onClick={jd.useRoleFallback}
            className="mt-4 border-b-[1.5px] border-ink/25 text-[13px] font-semibold text-muted transition-colors hover:text-ink"
          >
            No posting yet? Score against a role instead
          </button>
        </>
      )}
    </PaperCard>
  );
}
