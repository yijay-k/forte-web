"use client";

import { useHideStepper } from "@/components/layout/app-shell";
import { formatClock } from "@/utils/format-clock";
import { getInterviewer } from "@/lib/data/interviewers";
import { TARGET_COMPANY, TARGET_ROLE } from "@/lib/data/job-description";
import { InterviewStage } from "./interview-stage";
import { ProbeChip, QuestionCard } from "./question-card";
import { TranscriptPanel } from "./transcript-panel";
import { LiveControls } from "./live-controls";
import { useTranscript } from "./use-transcript";
import type { InterviewSession } from "./use-interview-session";

/**
 * The live session. Deliberately no HUD: one clock, the question, and captions.
 * Nothing is scored on screen, because a real interview has no dashboard.
 */
export function InterviewLive({ session }: { session: InterviewSession }) {
  useHideStepper(true);

  const interviewer = getInterviewer(session.interviewerId);
  const { turns, scrollRef } = useTranscript(session.elapsed, session.interviewerId);

  const isVideo = session.mode === "video";
  const hasProbe = Boolean(session.current.probe);
  const showVisualCue = isVideo && session.onProbe && hasProbe;
  const showProbeChip = session.onProbe && !(isVideo && hasProbe);

  const question = (
    <QuestionCard
      prompt={session.prompt}
      source={session.current.src}
      showSource={!session.onProbe}
      size={isVideo ? "video" : "voice"}
    />
  );

  return (
    <div className="relative flex min-h-full flex-col bg-[#1a1917]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 px-7 py-4">
        <div className="flex items-center gap-3.5 text-on-ink">
          <span className="flex items-center gap-1.75 text-[13px] font-semibold">
            <span className="size-2.25 animate-pulse-soft rounded-pill bg-[#e06666]" />
            Recording
          </span>
          <span className="text-[13px] text-on-ink-faint">
            {TARGET_ROLE} · {TARGET_COMPANY}
          </span>
        </div>
        <div className="flex items-center gap-4.5">
          <span className="font-serif text-[clamp(13.6px,3.67vw,22px)] font-medium text-on-ink tabular-nums">
            {formatClock(session.elapsed)}
          </span>
          <span className="text-[13px] font-semibold text-on-ink">
            {session.questionLabel}
          </span>
          <button
            type="button"
            onClick={session.finish}
            className="rounded-pill border-hair border-paper/35 px-4.5 py-2 text-[13px] font-semibold text-on-ink"
          >
            End
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 px-3 pt-3 app:px-6 app:pt-5.5">
        {isVideo ? (
          <InterviewStage
            interviewerName={interviewer.name}
            interviewerState={session.onProbe ? "following up" : "listening"}
            view={session.stageView}
            onSwap={session.swapView}
            showVisualCue={showVisualCue}
          >
            {showProbeChip && <ProbeChip />}
            {question}
            <TranscriptPanel turns={turns} scrollRef={scrollRef} />
          </InterviewStage>
        ) : (
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="flex w-full max-w-[840px] flex-col gap-5">
              {/* Above the interviewer row in voice mode — it banners the
                  whole exchange, not just the question. */}
              {showProbeChip && <ProbeChip />}
              <div className="flex items-center gap-3">
                <span className="flex size-8.5 animate-bob items-center justify-center rounded-pill bg-accent">
                  <span className="size-3 rounded-pill border-[2.5px] border-ink" />
                </span>
                <span className="text-[13.5px] font-semibold text-on-ink">
                  {interviewer.name}
                </span>
                <span className="text-[12.5px] text-on-ink-dim">
                  {session.onProbe ? "following up" : "listening"}
                </span>
              </div>
              {question}
            </div>
          </div>
        )}
      </div>

      <LiveControls
        listeningLabel={
          session.speakAnswers
            ? "Recording — nothing is being scored yet"
            : "Type your answer"
        }
        nextLabel={session.nextLabel}
        footer={
          isVideo
            ? "Nothing is scored until you finish. Video is read live and never stored."
            : "Nothing is scored until you finish. You'll get everything at once."
        }
        onNext={session.next}
      />
    </div>
  );
}
