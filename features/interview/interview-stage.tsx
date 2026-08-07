"use client";

import type { ReactNode } from "react";
import { VISUAL_CUE } from "@/lib/data/interview-feedback";
import type { StageView } from "@/types/interview";

type Props = {
  interviewerName: string;
  interviewerState: string;
  view: StageView;
  onSwap: () => void;
  showVisualCue: boolean;
  children: ReactNode;
};

/** The video canvas: big frame, picture-in-picture, watching indicator, caption deck. */
export function InterviewStage({
  interviewerName,
  interviewerState,
  view,
  onSwap,
  showVisualCue,
  children,
}: Props) {
  const bigIsAi = view === "ai";

  return (
    <div className="relative flex min-h-65 flex-1 flex-col overflow-hidden rounded-[18px] border border-paper/16 bg-[repeating-linear-gradient(135deg,#242320_0_11px,#1e1d1a_11px_22px)] app:min-h-85 app:rounded-4xl">
      {/* The top padding is what holds the orb clear of the picture-in-picture;
          both shrink together below 900px or they collide. */}
      <div className="flex min-h-24 flex-1 flex-col items-center justify-center gap-2.5 px-[14px] pt-14.5 pb-2.5 app:min-h-37.5 app:gap-3.5 app:px-6 app:pt-29 app:pb-3.5">
        {bigIsAi ? (
          <>
            <div className="flex size-28 animate-bob items-center justify-center rounded-pill bg-accent">
              <span className="size-8.5 rounded-pill border-[5px] border-ink" />
            </div>
            <div className="flex flex-col items-center gap-0.75">
              <div className="text-[15px] font-semibold text-on-ink">
                {interviewerName}
              </div>
              <div className="font-mono text-[10.5px] font-medium tracking-[0.12em] text-[#67665f] uppercase">
                {interviewerState}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.75">
            <div className="font-mono text-xs font-medium tracking-[0.12em] text-[#67665f] uppercase">
              your camera
            </div>
            <div className="text-xs text-[#4a4944]">
              Frames are read and dropped. Never stored.
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onSwap}
        aria-label="Swap main view"
        className="absolute top-2.5 left-2.5 h-14.5 w-24 overflow-hidden rounded-[10px] border border-paper/28 bg-ink-raised transition-colors hover:border-accent/75 app:top-4.5 app:left-4.5 app:h-25.5 app:w-43.5 app:rounded-[13px]"
      >
        {bigIsAi ? (
          <span className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,#2b2a26_0_9px,#232220_9px_18px)] font-mono text-[9.5px] font-medium tracking-[0.1em] text-[#67665f] uppercase">
            self-view
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-ink-raised">
            <span className="flex size-8.5 items-center justify-center rounded-pill bg-accent">
              <span className="size-3 rounded-pill border-[2.5px] border-ink" />
            </span>
          </span>
        )}
        <span className="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-1.5 bg-gradient-to-t from-[rgba(16,15,14,0.92)] to-transparent px-2.25 py-1.5">
          <span className="text-[10px] font-bold text-on-ink">
            {bigIsAi ? "You" : interviewerName}
          </span>
          <span className="text-[9px] font-bold tracking-[0.06em] text-on-ink-faint uppercase">
            swap
          </span>
        </span>
      </button>

      <div className="absolute top-4.5 right-4.5 flex items-center gap-1.75 rounded-pill border border-paper/14 bg-ink/82 px-3.5 py-1.75 text-[10.5px] font-bold tracking-[0.06em] text-accent uppercase">
        <span className="size-1.75 animate-pulse-soft rounded-pill bg-accent" />
        watching
      </div>

      <div className="flex shrink-0 flex-col gap-2.5 bg-gradient-to-t from-[rgba(16,15,14,0.97)] via-[rgba(16,15,14,0.9)] to-[rgba(16,15,14,0.55)] px-[16px] pt-[20px] pb-[18px] app:gap-3.25 app:px-11 app:pt-7.5 app:pb-8">
        {children}

        {showVisualCue && (
          <div className="mt-1 max-w-[720px] self-start rounded-lg border border-accent/42 bg-accent/12 px-4.5 py-3.75">
            <div className="mb-1.75 flex items-center gap-1.75 text-[11px] font-bold tracking-[0.06em] text-accent uppercase">
              <span className="size-1.75 animate-pulse-soft rounded-pill bg-accent" />
              cut in — saw something
            </div>
            <div className="font-serif text-lg leading-snug text-on-ink">
              {VISUAL_CUE}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
