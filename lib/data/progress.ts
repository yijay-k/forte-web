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

export const CURRENT_REP = 3;
export const USER = { name: "Alex Chen", initials: "AC" } as const;
