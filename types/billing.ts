/**
 * Nothing here renews. A plan is just the last pack bought; what actually
 * gates the product is `appsLeft`.
 */
export type PlanId = "free" | "starter" | "full";

/** One application = one CV against one posting, start to finish. */
export type Entitlements = {
  readonly plan: PlanId;
  readonly appsLeft: number;
  /** Everything ever granted, including the free one. Drives the used-bar. */
  readonly appsTotal: number;
  readonly sessionsLeft: number;
};

export type Pack = {
  readonly id: Exclude<PlanId, "free">;
  readonly name: string;
  readonly price: string;
  /**
   * The same amount in the buyer's local currency, shown under the price.
   * Presentational only — checkout still charges `price`. Optional because the
   * free tier has no amount to convert.
   */
  readonly localPrice?: string;
  readonly unitPrice: string;
  readonly apps: number;
  readonly sessions: number;
  readonly badge?: string;
  readonly features: readonly string[];
};

export type Receipt = {
  readonly id: string;
  readonly what: string;
  readonly date: string;
  readonly amount: string;
};
