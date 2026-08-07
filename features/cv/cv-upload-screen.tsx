"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chip } from "@/components/ui/chip";
import { PillButton } from "@/components/ui/pill-button";
import { useAuth } from "@/features/auth/use-auth";
import { LATEST_RUN_ID } from "@/lib/data/cv-runs";
import { CvAttachPanel } from "./cv-attach-panel";
import { JdPastePanel } from "./jd-paste-panel";
import { CvAnalyzing } from "./cv-analyzing";
import { useJdInput } from "./use-jd-input";
import { useCvAnalysis } from "./use-cv-analysis";

/**
 * The new-evaluation wizard. Analysing is a transient state of this route, not
 * a URL of its own — there is nothing to link to while it runs.
 */
export function CvUploadScreen() {
  const router = useRouter();
  const { authed } = useAuth();
  const [fileName, setFileName] = useState<string | null>(null);
  const jd = useJdInput();

  const goToResults = useCallback(
    () => router.push(`/cv/${LATEST_RUN_ID}`),
    [router],
  );
  const analysis = useCvAnalysis(goToResults);

  const ready = Boolean(fileName) && jd.parsed;

  if (analysis.running) {
    return (
      <div className="mx-auto max-w-[940px] px-[clamp(16px,4.5vw,56px)] pt-[clamp(24px,4.5vw,44px)] pb-21">
        <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
          CV Evaluator
        </Chip>
        <CvAnalyzing
          headline={analysis.headline}
          steps={analysis.steps}
          step={analysis.step}
          percent={analysis.percent}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[940px] px-[clamp(16px,4.5vw,56px)] pt-[clamp(24px,4.5vw,44px)] pb-21">
      <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
        CV Evaluator
      </Chip>

      {authed && (
        <Link
          href="/cv"
          className="press mb-5.5 ml-2 inline-flex items-center gap-1.75 rounded-pill border-hair border-ink bg-surface px-4.25 py-2.25 text-[13px] font-semibold shadow-hard-sm hover:shadow-hard-xs"
        >
          ← All applications
        </Link>
      )}

      <h1 className="mt-0 mb-2.5 font-serif text-[clamp(30px,4.8vw,46px)] leading-[1.03] font-medium tracking-[-0.02em]">
        Score your CV against the <em className="italic">actual posting</em>.
      </h1>
      <p className="mb-7.5 max-w-[580px] text-base leading-relaxed text-muted">
        Not a job title — the real text. It&rsquo;s the only way to tell you which
        requirements you cover, and to interrogate the claims you&rsquo;ve made.
      </p>

      <div className="grid gap-4.5">
        <CvAttachPanel
          fileName={fileName}
          onAttach={setFileName}
          onRemove={() => setFileName(null)}
        />
        <JdPastePanel jd={jd} />

        <PillButton
          variant="accent"
          size="xl"
          shadow={ready ? "hard" : "none"}
          disabled={!ready}
          onClick={analysis.start}
          className="justify-self-start px-8.5 py-4 text-base"
        >
          {jd.roleFallback ? "Score my CV" : "Score against this posting"}{" "}
          <span aria-hidden="true">→</span>
        </PillButton>

        {!authed && (
          <div className="-mt-1 text-[13px] font-semibold text-faint">
            Your first fix is free — no signup, no card.
          </div>
        )}
      </div>
    </div>
  );
}
