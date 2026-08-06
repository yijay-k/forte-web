/** One application the user has spent, with the score it moved. */
export type UsageRow = {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly date: string;
  /** What the application actually consumed, e.g. "Scorecard, 3 fixes". */
  readonly used: string;
  readonly to: string;
  /** `"from 82"`, or `"first score"` when there is no prior. */
  readonly fromLine: string;
};

/** A 20-minute coaching session against one claim. */
export type CoachingSession = {
  readonly id: string;
  readonly claim: string;
  readonly where: string;
  readonly date: string;
  readonly spent: string;
};

/** Which email/recording behaviours the user has switched on. */
export type AccountSettings = {
  readonly scoreDone: boolean;
  readonly interviewGraded: boolean;
  readonly weeklyDigest: boolean;
  readonly cameraAnalysis: boolean;
  readonly autoDelete: boolean;
};

export const DEFAULT_ACCOUNT_SETTINGS: AccountSettings = {
  scoreDone: true,
  interviewGraded: true,
  // The only one off by default — a weekly email is opt-in.
  weeklyDigest: false,
  cameraAnalysis: true,
  autoDelete: true,
};
