import type { CvRun } from "@/types/cv";

/** Saved evaluations — one per posting the CV has been scored against. */
const RUNS: readonly CvRun[] = [
  {
    id: "meridian",
    title: "Senior Product Designer · Meridian",
    file: "resume_v3.pdf",
    when: "2h ago",
    score: "82",
    cover: "2 of 5 covered",
    kind: "weak",
  },
  {
    id: "loop-co",
    title: "Product Designer · Loop Co",
    file: "resume_v3.pdf",
    when: "3d ago",
    score: "76",
    cover: "3 of 6 covered",
    kind: "weak",
  },
  {
    id: "kestrel",
    title: "Design Systems Lead · Kestrel",
    file: "resume_v2.pdf",
    when: "1w ago",
    score: "64",
    cover: "1 of 5 covered",
    kind: "miss",
  },
];

export function getCvRuns(): readonly CvRun[] {
  return RUNS;
}

export function getCvRun(id: string): CvRun | undefined {
  return RUNS.find((run) => run.id === id);
}

/** The run a fresh evaluation lands on. */
export const LATEST_RUN_ID = "meridian";
