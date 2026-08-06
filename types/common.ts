/** How a requirement, score, or claim is faring. Drives every status colour. */
export type Verdict = "ok" | "weak" | "miss" | "neutral";

/** The four things Forte scores. Same rubric on the CV and in the interview. */
export type RubricMetric = "Substance" | "Clarity" | "Specificity" | "Confidence";

export type ScoreDelta = {
  readonly label: RubricMetric;
  /** `"—"` when a metric can't be earned yet (Confidence, pre-interview). */
  readonly value: string;
  /** `"+6"`, `"flat"`, `"logged"`. */
  readonly delta: string;
};
