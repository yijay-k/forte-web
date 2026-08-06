"use client";

import { useEffect, useMemo, useRef } from "react";
import { getTranscriptScript, PAUSE_LABEL } from "@/lib/data/transcript";
import { getInterviewer } from "@/lib/data/interviewers";
import type { InterviewerId } from "@/types/interview";

export type Turn = {
  who: string;
  text: string;
  mine: boolean;
  /** A measured silence, rendered differently from speech. */
  pause: boolean;
  latest: boolean;
};

/**
 * Reveals transcript lines as the clock passes them and keeps the caption box
 * pinned to the newest turn.
 */
export function useTranscript(elapsed: number, interviewerId: InterviewerId) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const interviewer = getInterviewer(interviewerId);

  const turns = useMemo<Turn[]>(() => {
    const visible = getTranscriptScript().filter((line) => line.at <= elapsed);

    return visible.map((line, i) => {
      const pause = line.text === "…";
      return {
        who: line.who === "you" ? "You" : interviewer.name,
        text: pause ? PAUSE_LABEL : line.text,
        mine: line.who === "you",
        pause,
        latest: i === visible.length - 1,
      };
    });
  }, [elapsed, interviewer.name]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollHeight > el.clientHeight) el.scrollTop = el.scrollHeight;
  }, [turns.length]);

  return { turns, scrollRef };
}
