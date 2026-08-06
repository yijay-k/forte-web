"use client";

import { useEffect } from "react";
import { useClaims } from "@/features/revise/use-claims";
import { useInterviewSession } from "./use-interview-session";
import { InterviewSetup } from "./interview-setup";
import { InterviewLive } from "./interview-live";
import { InterviewFeedback } from "./interview-feedback";

/**
 * Setup → live → feedback stay inside one route on purpose: a running session
 * holds a clock, and a URL you can deep-link into would promise a session that
 * doesn't exist.
 */
export function InterviewScreen() {
  const session = useInterviewSession();
  const { clearRescore } = useClaims();

  // Starting a rep retires the previous rep's re-score panel, so Revise never
  // shows a "rep closed" result for a rep that is currently in progress.
  const live = session.stage === "live";
  useEffect(() => {
    if (live) clearRescore();
  }, [live, clearRescore]);

  if (session.stage === "live") return <InterviewLive session={session} />;
  if (session.stage === "feedback") return <InterviewFeedback mode={session.mode} />;
  return <InterviewSetup session={session} />;
}
