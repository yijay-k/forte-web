"use client";

import { TranscriptTurn } from "./transcript-turn";
import type { Turn } from "./use-transcript";
import type { RefObject } from "react";

type Props = {
  turns: readonly Turn[];
  scrollRef: RefObject<HTMLDivElement | null>;
};

/** Live captions, pinned to the newest turn. */
export function TranscriptPanel({ turns, scrollRef }: Props) {
  if (turns.length === 0) return null;

  return (
    <div className="mt-1.25 flex max-w-[880px] flex-col gap-2.5">
      <div className="flex items-center gap-1.75 font-mono text-[10px] font-bold tracking-[0.12em] text-[#67665f] uppercase">
        <span className="size-1.5 animate-pulse-soft rounded-pill bg-accent" />
        live captions
      </div>
      <div
        ref={scrollRef}
        className="flex max-h-33 flex-col gap-2.75 overflow-y-auto pr-2"
      >
        {turns.map((turn, i) => (
          <TranscriptTurn key={`${turn.who}-${i}`} turn={turn} />
        ))}
      </div>
    </div>
  );
}
