import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { ScoreDial } from "@/components/ui/score-dial";
import { Sticker } from "@/components/ui/sticker";
import { DEFENDED_SCORE, getInterviewReport } from "@/lib/data/interview-feedback";
import { FeedbackNumbers } from "./feedback-numbers";
import { DeliveryMetrics } from "./delivery-metrics";
import { VisualEvents } from "./visual-events";
import { NotMeasured } from "./not-measured";
import { QuestionFeedbackCard } from "./question-feedback-card";
import type { InterviewMode } from "@/types/interview";

/** Everything at once, after the session — nothing was scored during it. */
export function InterviewFeedback({ mode }: { mode: InterviewMode }) {
  const report = getInterviewReport();

  return (
    <div className="mx-auto max-w-[940px] px-14 pt-11 pb-21">
      <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
        Interview feedback
      </Chip>

      <h1 className="mt-0 mb-6 font-serif text-[46px] leading-[1.03] font-medium tracking-[-0.02em]">
        Three claims didn&rsquo;t <em className="italic">hold</em>.
      </h1>

      <div className="grid gap-5">
        <ScoreGapCard />

        <FeedbackNumbers numbers={report.numbers} />
        <DeliveryMetrics metrics={report.delivery} />

        {mode === "video" && <VisualEvents events={report.visualEvents} />}

        <NotMeasured items={report.notMeasured} />

        <PaperCard radius="rounded-3xl" padding="p-7">
          <CardTitle className="mb-4.5">Question by question</CardTitle>
          <div className="grid gap-3.5">
            {report.questions.map((q) => (
              <QuestionFeedbackCard key={q.chip} feedback={q} />
            ))}
          </div>
        </PaperCard>

        <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-3xl border-hair border-ink bg-accent p-7.5 shadow-hard-lg">
          <Sticker position="absolute -top-3.5 left-7">step 4 of 4</Sticker>
          <div>
            <div className="mb-1 font-serif text-[23px] font-medium">Close the loop</div>
            <p className="max-w-[460px] text-sm leading-relaxed text-ink-soft">
              Three bullets on your CV made claims you couldn&rsquo;t back up. Fix them
              on the page and the next recruiter never gets to ask.
            </p>
          </div>
          <Link
            href="/revise"
            className="rounded-pill border-hair border-ink bg-ink px-7 py-3.5 text-[14.5px] font-semibold whitespace-nowrap text-on-ink"
          >
            Revise 3 claims →
          </Link>
        </div>
      </div>
    </div>
  );
}

/** The CV score versus the defended score. This gap is the whole product. */
function ScoreGapCard() {
  const { cv, defended, arithmetic, loggedNote } = DEFENDED_SCORE;

  return (
    <div className="flex flex-wrap items-center gap-7.5 rounded-4xl border-hair border-ink bg-ink p-8 text-on-ink shadow-accent">
      <ScoreDial
        score={defended}
        size={130}
        tone="ink"
        numeralClassName="text-[42px]"
      />

      <div className="min-w-60 flex-1">
        <div className="mb-2.5 font-serif text-[25px] leading-tight font-medium">
          Your CV scored {cv}. You defended it at {defended}.
        </div>
        <p className="mb-3 text-[14.5px] leading-[1.55] text-on-ink-muted">
          That gap is the whole point of this product. The claims that fell apart under
          a follow-up are the ones to fix on the page.
        </p>
        <p className="rounded-md border border-paper/16 bg-paper/6 px-3.25 py-2.75 text-[13px] leading-relaxed text-on-ink-faint">
          {arithmetic.replace(/= \d+$/, "= ")}
          <strong className="text-on-ink">{defended}</strong>. {loggedNote}
        </p>
      </div>
    </div>
  );
}
