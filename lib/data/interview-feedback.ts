import type { InterviewReport } from "@/types/interview";

/**
 * The post-session report. Nothing is scored until the session ends — this is
 * everything, delivered at once.
 */
const REPORT: InterviewReport = {
  numbers: [
    { label: "Substance", value: "72", delta: "+6" },
    { label: "Clarity", value: "78", delta: "+3" },
    { label: "Specificity", value: "51", delta: "+1" },
    { label: "Confidence", value: "74", delta: "logged" },
  ],

  delivery: [
    {
      label: "Time to first word",
      value: "2.1s",
      note: "avg after each question — a beat longer than natural",
    },
    {
      label: "Longest mid-answer pause",
      value: "4.2s",
      note: 'Q2, right after "design system"',
    },
    {
      label: "Times we cut in",
      value: "3",
      note: "you passed 90s without landing the point",
    },
    {
      label: "Self-corrections",
      value: "7",
      note: '"actually" / "I mean" restarts, 5 of them on Q1',
    },
    {
      label: "Answered a different question",
      value: "2 of 5",
      note: "Q2 and Q4 — you answered the one you rehearsed",
    },
    {
      label: "Longest answer",
      value: "2m 40s",
      note: "Q1. Recruiters stop listening around 90s.",
    },
  ],

  visualEvents: [
    {
      at: "02:14",
      what: "You looked down and to the left, then stopped mid-sentence.",
      consequence:
        "It cut in and asked whether the number was in front of you. It was — and you said so, which is the honest answer and the one that cost you.",
    },
    {
      at: "05:41",
      what: "Fourth trip back to your notes in five minutes.",
      consequence:
        "It stopped asking follow-ups on that thread and moved on. Real interviewers do the same thing, silently.",
    },
    {
      at: "08:03",
      what: 'You went still for six seconds after "design system".',
      consequence:
        "Instead of waiting you out, it dropped to a smaller question. You recovered — but the panel now knows where the floor is.",
    },
  ],

  /** Stated plainly, because the absence is the product claim. */
  notMeasured: [
    "Eye tracking",
    "Emotion or mood",
    "Tone-of-voice score",
    "Confidence read off your face",
    "Personality traits",
    "How you look",
  ],

  questions: [
    {
      chip: "Q1 · 44",
      kind: "bad",
      title: "The 34% claim",
      body: 'You quoted the number, then softened it to "roughly a third", then couldn\'t say what it was measured against. This is the single most damaging moment in the session — it turned your best line into a liability.',
      quote:
        '"Activation went from 18% to 24% of signups completing setup over two quarters — measured in Amplitude against the pre-launch baseline."',
    },
    {
      chip: "Q2 · 38",
      kind: "bad",
      title: "Design system ownership",
      body: "The posting weights this highest and you had nothing concrete. You described using systems, not governing one. Silence after the follow-up.",
      quote: null,
    },
    {
      chip: "Q3 · 81",
      kind: "ok",
      title: "Analytics dashboard",
      body: "Better — you eventually named the IA and empty-state decisions as yours. But you spent 50 seconds on team context first. Open with what you owned.",
      quote: null,
    },
  ],
};

export function getInterviewReport(): InterviewReport {
  return REPORT;
}

/** What each mode logs, shown on the setup cards. */
export const VOICE_MODE_LOGS: readonly string[] = [
  "Pauses, self-corrections and time-to-first-word",
  "Whether you answered the question actually asked",
  "Every claim checked line by line against your CV",
];

export const VIDEO_MODE_LOGS: readonly string[] = [
  "Everything voice mode logs",
  "Timestamped moments it spoke because of what it saw",
  "No gaze percentage, no emotion read — see below",
];

/** The cue the interviewer speaks when it reacts to something it saw. */
export const VISUAL_CUE =
  "You just checked your notes — is that number in front of you right now?";
