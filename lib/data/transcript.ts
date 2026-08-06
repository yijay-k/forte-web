import type { TranscriptLine } from "@/types/interview";

/**
 * The live transcript, keyed to seconds elapsed. Lines reveal as the clock
 * passes their `at`. `…` renders as a measured pause rather than as text —
 * the pause is the point.
 */
const SCRIPT: readonly TranscriptLine[] = [
  {
    at: 2,
    who: "you",
    text: "Yeah, so — okay. So the onboarding thing. Um. Let me kind of start from the beginning, because I think the context matters here.",
  },
  {
    at: 6,
    who: "you",
    text: "So when I joined Northwind it was, I think, two and a half years ago? Maybe closer to three. And at the time the whole activation funnel was kind of… it was a mess, honestly.",
  },
  {
    at: 11,
    who: "you",
    text: "And there were, like — okay, so there were three teams touching signup, which, you know, that was part of the problem. Nobody really owned it.",
  },
  { at: 15, who: "ai", text: "Mm-hm." },
  {
    at: 17,
    who: "you",
    text: "So we — I mean, I pushed for us to just consolidate it, and eventually we did the revamp, and activation went up like 34%. Which was, yeah. That was big for us.",
  },
  { at: 22, who: "ai", text: "34% of what, though?" },
  {
    at: 24,
    who: "you",
    text: "Uh… of, like, activation. Signups who — sorry, people who finished setting up their account.",
  },
  { at: 28, who: "you", text: "…" },
  {
    at: 30,
    who: "you",
    text: "I think it was roughly a third more? Something in that range. It was in the deck we presented at the quarterly.",
  },
  {
    at: 34,
    who: "ai",
    text: "You said 34% a minute ago. Now it's roughly a third. Which one goes on the CV?",
  },
  {
    at: 38,
    who: "you",
    text: "I mean — 34%, I'm fairly confident it was 34%. I'd have to check the exact baseline we measured it against.",
  },
  {
    at: 43,
    who: "ai",
    text: "That's the part I'd have pushed on in a real panel. Let's move on.",
  },
];

/** How a `…` line is labelled once rendered. */
export const PAUSE_LABEL = "long pause — 6s";

export function getTranscriptScript(): readonly TranscriptLine[] {
  return SCRIPT;
}
