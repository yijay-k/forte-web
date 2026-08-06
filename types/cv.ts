import type { RubricMetric, Verdict } from "./common";

/** One of the four rubric scores as shown on the CV report. */
export type CvBreakdownRow = {
  readonly label: RubricMetric;
  /** `"85"`, or `"—"` when unearned. */
  readonly score: string;
  /** 0–100; drives the bar width. `0` when unearned. */
  readonly percent: number;
  readonly note: string;
  readonly weak?: boolean;
  readonly unearned?: boolean;
};

/** A requirement lifted from the posting, checked against the CV. */
export type CoverageRow = {
  readonly requirement: string;
  readonly status: string;
  readonly kind: Verdict;
  readonly evidence: string;
};

/** A concrete before/after rewrite the report proposes. */
export type CvFix = {
  readonly rank: number;
  readonly points: string;
  readonly where: string;
  readonly before: string;
  readonly after: string;
  readonly why: string;
};

/** A CV line rendered with its inline annotation. */
export type MarkedUpLine = {
  readonly text: string;
  readonly kind: Verdict;
  readonly note: string;
};

/** A sparkline series for a rubric card. */
export type RubricCard = {
  readonly label: RubricMetric;
  readonly value: string;
  readonly tag: string;
  readonly tone: "good" | "warn" | "faint";
  readonly points: string;
  readonly stroke: string;
  readonly focus?: boolean;
};

/** A saved evaluation in the CV list. */
export type CvRun = {
  readonly id: string;
  readonly title: string;
  readonly file: string;
  readonly when: string;
  readonly score: string;
  readonly cover: string;
  readonly kind: Verdict;
};

export type CvStage = "upload" | "analyzing" | "results";
