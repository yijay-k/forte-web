/** One node on "the loop" rail: Evaluate → Score → Interview → Revise. */
export type LoopStep = {
  readonly label: string;
  readonly done: boolean;
  readonly current?: boolean;
};

/** A past run — a mock interview or a CV scoring. */
export type RepEntry = {
  readonly id: string;
  readonly title: string;
  readonly sub: string;
  readonly score: string;
  /** Interview reps use the accent chip; CV scorings use sage. */
  readonly accent: boolean;
};
