"use client";

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

  if (session.stage === "live") return <InterviewLive session={session} />;
  if (session.stage === "feedback") return <InterviewFeedback mode={session.mode} />;
  return <InterviewSetup session={session} />;
}
