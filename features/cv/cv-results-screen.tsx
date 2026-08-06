"use client";

import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { GatedSection } from "@/features/auth/gated-section";
import { useAuth } from "@/features/auth/use-auth";
import { getCvReport } from "@/lib/data/cv-report";
import { CvHeadlineFix } from "./cv-headline-fix";
import { CvOverallScore } from "./cv-overall-score";
import { CvFourNumbers } from "./cv-four-numbers";
import { CvCoverageMatrix } from "./cv-coverage-matrix";
import { CvRemainingFixes } from "./cv-remaining-fixes";
import { CvMarkedUp } from "./cv-marked-up";
import { CvInterviewCta } from "./cv-interview-cta";

/**
 * The report. The first two sections are free and unblurred; everything from
 * the sentinel down sits behind the gate, in place, so unlocking dissolves the
 * blur rather than re-flowing the page.
 */
export function CvResultsScreen() {
  const { authed } = useAuth();
  const { overall, coverage } = getCvReport();

  return (
    <div className="mx-auto max-w-[940px] px-14 pt-11 pb-21">
      <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
        CV Evaluator
      </Chip>

      {authed && (
        <Link
          href="/cv"
          className="press mb-5.5 inline-flex items-center gap-1.75 rounded-pill border-hair border-ink bg-surface px-4.25 py-2.25 text-[13px] font-semibold shadow-hard-sm hover:shadow-hard-xs"
        >
          ← All applications
        </Link>
      )}

      <div className="grid gap-5">
        <CvHeadlineFix />
        <CvOverallScore />

        <GatedSection
          eyebrow="You've seen it works"
          headline={`Your score is ${overall}. Two more fixes take it to ~90.`}
          body={`Behind this: your four numbers, the ${coverage.length}-requirement coverage check, both remaining fixes, your marked-up CV, and the mock interview.`}
          cta="Unlock the rest of your report"
          footnote="Free · no card · your CV stays where it is"
        >
          <div className="grid gap-5">
            <CvFourNumbers />
            <CvCoverageMatrix />
            <CvRemainingFixes />
            <CvMarkedUp />
            <CvInterviewCta />
          </div>
        </GatedSection>

        {authed && (
          <Link
            href="/cv/new"
            className="justify-self-start rounded-pill border-hair border-ink px-5.5 py-3 text-sm font-semibold transition-colors hover:bg-sage"
          >
            Save &amp; add another posting →
          </Link>
        )}
      </div>
    </div>
  );
}
