import type {
  CoverageRow,
  CvBreakdownRow,
  CvFix,
  MarkedUpLine,
  RubricCard,
} from "@/types/cv";

/**
 * The CV report fixtures.
 *
 * Everything here is what the scoring service will eventually return. Keep it
 * shaped like a response payload — components read it through the accessors at
 * the bottom, never by importing the arrays directly, so swapping in `fetch`
 * touches this file only.
 */

const OVERALL_SCORE = 82;

/** The four sparkline cards on Home and in the report header. */
const RUBRIC_CARDS: readonly RubricCard[] = [
  {
    label: "Substance",
    value: "72",
    tag: "+6",
    tone: "good",
    points: "0,17 30,13 60,9 90,5",
    stroke: "#161513",
  },
  {
    label: "Clarity",
    value: "78",
    tag: "+3",
    tone: "good",
    points: "0,15 30,12 60,8 90,5",
    stroke: "#8b6fd6",
  },
  {
    label: "Specificity",
    value: "51",
    tag: "flat",
    tone: "warn",
    points: "0,16 30,17 60,15 90,14",
    stroke: "#F6A64B",
    focus: true,
  },
  {
    label: "Confidence",
    value: "74",
    tag: "logged",
    tone: "faint",
    points: "0,12 30,10 60,11 90,8",
    stroke: "#cbcabf",
  },
];

/** The /100 breakdown. Substance + Clarity + Specificity average to 82. */
const BREAKDOWN: readonly CvBreakdownRow[] = [
  {
    label: "Substance",
    score: "85",
    percent: 85,
    note: "Real projects, real scope. Six bullets still lead with activity.",
  },
  {
    label: "Clarity",
    score: "95",
    percent: 95,
    note: "A stranger can follow this on one pass. Your strongest number.",
  },
  {
    label: "Specificity",
    score: "66",
    percent: 66,
    weak: true,
    note: "One number across eight bullets. This is what drags the mean.",
  },
  {
    label: "Confidence",
    score: "—",
    percent: 0,
    unearned: true,
    note: "A CV can't show delivery. Run a mock interview to earn this one.",
  },
];

const COVERAGE: readonly CoverageRow[] = [
  {
    requirement: "Own end-to-end product flows, from problem framing to shipped UI",
    status: "Covered",
    kind: "ok",
    evidence: 'Earned by: "Redesigned the onboarding flow" + "Grew activation 34%"',
  },
  {
    requirement: "Mentor mid-level designers on the team",
    status: "Covered",
    kind: "ok",
    evidence:
      'Earned by: "Led weekly design critiques and mentored two junior designers"',
  },
  {
    requirement: "Contribute to and help govern our design system",
    status: "Claimed, not shown",
    kind: "weak",
    evidence:
      "Only appears inside a skills list. No system named, no ownership, no governance.",
  },
  {
    requirement: "Run experiments and interpret results with our data team",
    status: "Not found",
    kind: "miss",
    evidence:
      "Nothing in your CV describes an experiment, a hypothesis, or a result.",
  },
  {
    requirement: "Comfort with Figma variables and advanced prototyping",
    status: "Not found",
    kind: "miss",
    evidence: '"Prototyping" is listed. Figma variables are never mentioned.',
  },
];

/** Fix #1 is free and always readable; 2 and 3 sit behind the gate. */
const HEADLINE_FIX: CvFix = {
  rank: 1,
  points: "+9 pts",
  where: "Northwind · bullet 1",
  before: "Redesigned the onboarding flow.",
  after:
    "Redesigned onboarding, cutting drop-off 34% and adding ~1.8k activated users a month.",
  why: "Six of your eight bullets describe activity, not outcome. This is the one that costs you the most.",
};

const REMAINING_FIXES: readonly {
  points: string;
  tone: "accent" | "sage";
  title: string;
  body: string;
}[] = [
  {
    points: "+5 pts",
    tone: "accent",
    title: "Lead with a positioning statement",
    body: "Your top third is a skills list. Replace it with two lines naming your specialty and the size of problems you've handled.",
  },
  {
    points: "+3 pts",
    tone: "sage",
    title: "Evidence a requirement you only claim",
    body: 'They ask for design-system ownership. You list "design systems" in a skills line but never show yourself owning one. A recruiter reads a skills list as a claim, not proof — so show the system, the contributors, and what governed it.',
  },
];

/** The CV rendered with inline annotations. `plain` lines carry no issue. */
const MARKED_UP = {
  name: "Alex Chen",
  contact:
    "Currently Senior Product Designer · alex.chen@email.com · portfolio.alexchen.design",
  summary: {
    text: "Skilled in Figma, Sketch, prototyping, user research, design systems and cross-functional collaboration.",
    kind: "weak" as const,
    note: "→ fix #2",
  },
  roles: [
    {
      title: "Senior Product Designer · Northwind",
      dates: "2022–present",
      bullets: [
        {
          text: "Redesigned the onboarding flow.",
          kind: "miss" as const,
          note: "no outcome",
        },
        {
          text: "Led weekly design critiques and mentored two junior designers.",
          kind: "neutral" as const,
          note: "",
        },
        {
          text: "Worked with engineers to ship a new analytics dashboard.",
          kind: "miss" as const,
          note: "no metric",
        },
        {
          text: "Grew activation 34% after the onboarding revamp.",
          kind: "neutral" as const,
          note: "",
        },
      ] satisfies MarkedUpLine[],
    },
    {
      title: "Product Designer · Loop Co",
      dates: "2019–2022",
      bullets: [
        {
          text: "Created wireframes and prototypes for the mobile app.",
          kind: "miss" as const,
          note: "activity, not impact",
        },
        {
          text: "Ran user interviews that informed the 2021 roadmap.",
          kind: "neutral" as const,
          note: "",
        },
      ] satisfies MarkedUpLine[],
    },
  ],
  issueCount: 6,
} as const;

/** The steps the analyser walks through, one every 900ms. */
export const ANALYZE_STEPS: readonly string[] = [
  "Reading resume_v3.pdf",
  "Found 8 bullets across 2 roles",
  "Pulled 5 checkable requirements from the posting",
  "Scoring substance, clarity, specificity",
];

export function getCvReport() {
  return {
    overall: OVERALL_SCORE,
    verdict: "A strong base, one soft spot.",
    arithmetic: "(Substance 85 + Clarity 95 + Specificity 66) ÷ 3 = 82",
    diagnosis: {
      lead: "You'd clear their first-round screen — but you describe what you",
      emphasis1: "did",
      middle: ", not what",
      emphasis2: "changed",
      tail: ".",
    },
    rubricCards: RUBRIC_CARDS,
    breakdown: BREAKDOWN,
    coverage: COVERAGE,
    coveredCount: COVERAGE.filter((r) => r.kind === "ok").length,
    headlineFix: HEADLINE_FIX,
    remainingFixes: REMAINING_FIXES,
    markedUp: MARKED_UP,
  };
}

export type CvReport = ReturnType<typeof getCvReport>;
