import type { Claim } from "@/types/revise";

/**
 * The claims that didn't survive the interview. Each carries the question that
 * broke it, why it failed, and the line Forte would write instead — so the user
 * can rewrite, cut, or stand by it with the full context in front of them.
 */
const CLAIMS: readonly Claim[] = [
  {
    n: 1,
    where: "Northwind · bullet 4",
    status: "open",
    draft: "",
    original: "Grew activation 34% after the onboarding revamp.",
    probe: "Your CV says you grew activation 34%. How was that measured?",
    whyFailed:
      "You gave a range, then changed it, and never named a baseline, a timeframe, or the tool. A number with no method reads as invented — and this was the strongest line on your CV.",
    suggestion:
      "Grew activation 34% over two quarters (18% → 24% of signups completing setup), measured in Amplitude against a pre-launch baseline.",
  },
  {
    n: 2,
    where: "Northwind · bullet 3",
    status: "open",
    draft: "",
    original: "Worked with engineers to ship a new analytics dashboard.",
    probe: "What was your specific contribution to that dashboard?",
    whyFailed:
      'You described what the team did for 50 seconds and never said what you decided, drew, or owned. "Worked with" is the tell — the interviewer heard a passenger.',
    suggestion:
      "Owned the analytics dashboard IA and empty states end to end; cut time-to-first-insight from 4 clicks to 1 with two engineers over 6 weeks.",
  },
  {
    n: 3,
    where: "Summary line",
    status: "open",
    draft: "",
    original:
      "Skilled in Figma, Sketch, prototyping, user research, design systems and cross-functional collaboration.",
    probe: "Which design system did you own, and what governed contributions to it?",
    whyFailed:
      "No answer. This is the requirement the posting weights most heavily, and the only place you address it is a skills list — which a recruiter reads as a claim, not proof.",
    suggestion:
      "Product designer specialising in design systems — built and governed Northwind's 60-component library, with a contribution review used by 4 squads.",
  },
];

export function getClaims(): readonly Claim[] {
  return CLAIMS;
}

/** The score movement shown once every claim is resolved and the CV re-scored. */
export const RESCORE_DELTAS: readonly {
  label: string;
  value: string;
  delta: string;
}[] = [
  { label: "Substance", value: "92", delta: "+7" },
  { label: "Clarity", value: "96", delta: "+1" },
  { label: "Specificity", value: "84", delta: "+18" },
];
