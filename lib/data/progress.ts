import type { LoopStep, RepEntry } from "@/types/progress";

/** The loop: evaluate → score → interview → revise. Revise is where it closes. */
const LOOP: readonly LoopStep[] = [
  { label: "Evaluate", done: true },
  { label: "Score", done: true },
  { label: "Interview", done: true },
  { label: "Revise", done: false, current: true },
];

const HISTORY: readonly RepEntry[] = [
  {
    id: "rep-3",
    title: "Mock interview · rep 3",
    sub: "5 questions, 2 follow-up probes · 3 claims flagged",
    score: "67",
    accent: true,
  },
  {
    id: "cv-meridian",
    title: "CV scored · Meridian posting",
    sub: "2 of 5 requirements covered",
    score: "82",
    accent: false,
  },
  {
    id: "rep-2",
    title: "Mock interview · rep 2",
    sub: "5 questions, 1 follow-up probe",
    score: "62",
    accent: true,
  },
];

/** Home's "recent activity" list — a shorter, differently-worded view. */
const RECENT: readonly { title: string; sub: string; when: string; accent: boolean }[] =
  [
    {
      title: "Mock interview · 5 questions, 2 follow-up probes",
      sub: "Overall 67 · 3 CV claims flagged as undefended",
      when: "2h ago",
      accent: true,
    },
    {
      title: "CV scored against the Meridian posting",
      sub: "82 · covers 2 of 5 requirements",
      when: "Yesterday",
      accent: false,
    },
    {
      title: "Uploaded resume_v3.pdf",
      sub: "First evaluation",
      when: "3d ago",
      accent: false,
    },
  ];

export function getLoopSteps(): readonly LoopStep[] {
  return LOOP;
}

export function getRepHistory(): readonly RepEntry[] {
  return HISTORY;
}

export function getRecentActivity() {
  return RECENT;
}

/** Readiness is the lowest of the three weighted scores, out of 100. */
export const READINESS = {
  score: "51",
  delta: "+1",
  driver: "Specificity",
} as const;

/** The three headline numbers across the top of the Progress screen. */
export const PROGRESS_STATS: readonly {
  label: string;
  value: string;
  delta: string | null;
  note: string;
}[] = [
  {
    label: "Readiness",
    value: READINESS.score,
    delta: READINESS.delta,
    note: "Lowest of the three scored numbers",
  },
  {
    label: "Interview overall",
    value: "67",
    delta: "+5",
    note: "Mean of substance, clarity, specificity",
  },
  {
    label: "Claims defended",
    value: "5 / 8",
    delta: null,
    note: "3 still flagged for revision",
  },
];

/** The metric that isn't moving, and why Revise exists. */
export const PROGRESS_FOCUS = {
  title: "Specificity · 51, barely moving",
  body: "It's the only number that isn't climbing, and it's the one that collapses under a follow-up. Three flagged claims are waiting.",
  cta: "Revise them →",
} as const;

/** The three series on the readiness curve, plus the rep axis labels. */
export const PROGRESS_CURVE = {
  series: [
    { label: "Substance", stroke: "#161513", points: "30,170 230,118 430,88 610,62", textClass: "" },
    { label: "Clarity", stroke: "#8b6fd6", points: "30,148 230,116 430,80 610,52", textClass: "text-muted" },
    {
      label: "Specificity",
      stroke: "#F6A64B",
      points: "30,172 230,174 430,166 610,158",
      textClass: "text-warn",
    },
  ],
  repLabels: ["Rep 1", "Rep 2", "Rep 3", "Now"],
  caption: "Specificity is the flat line. It's why Revise exists.",
} as const;

export const CURRENT_REP = 3;
export const USER = { name: "Alex Chen", initials: "AC" } as const;
