import type { ScoreDelta } from "./common";

export type InterviewStage = "setup" | "live" | "feedback";
export type InterviewMode = "video" | "voice";

/** Which side of the call is in the large frame. */
export type StageView = "ai" | "self";

export type InterviewerId = "rina" | "daniel" | "priya";

export type Interviewer = {
  readonly id: InterviewerId;
  readonly name: string;
  readonly role: string;
  /** Tailwind class for the orb fill — `bg-accent`, `bg-sage`, `bg-amber`. */
  readonly orbClass: string;
  readonly tag: string;
  readonly posture: string;
};

export type InterviewQuestion = {
  readonly q: string;
  /** Where the question came from — the CV, or the posting. */
  readonly src: string;
  /** The follow-up asked before moving on, if any. */
  readonly probe: string | null;
};

export type TranscriptLine = {
  /** Seconds into the session at which this line lands. */
  readonly at: number;
  readonly who: "you" | "ai";
  readonly text: string;
};

/** A delivery measurement — how you spoke, not what you said. */
export type DeliveryMetric = {
  readonly label: string;
  readonly value: string;
  readonly note: string;
};

/** A timestamped moment the interviewer reacted to on video. */
export type VisualEvent = {
  readonly at: string;
  readonly what: string;
  readonly consequence: string;
};

export type QuestionFeedback = {
  readonly chip: string;
  readonly kind: "bad" | "ok";
  readonly title: string;
  readonly body: string;
  /** The answer they should have given, if there is a clean one. */
  readonly quote: string | null;
};

export type InterviewReport = {
  readonly numbers: readonly ScoreDelta[];
  readonly delivery: readonly DeliveryMetric[];
  readonly visualEvents: readonly VisualEvent[];
  readonly notMeasured: readonly string[];
  readonly questions: readonly QuestionFeedback[];
};
