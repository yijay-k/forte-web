/**
 * Every claim must reach a decision. `rewritten`, `cut` and `stood` are all
 * terminal — standing by a claim is a valid outcome, it just means you'll be
 * asked about it again.
 */
export type ClaimStatus = "open" | "editing" | "rewritten" | "cut" | "stood";

export type Claim = {
  readonly n: number;
  readonly where: string;
  readonly status: ClaimStatus;
  /** The user's in-progress rewrite. Persists across cancel so work isn't lost. */
  readonly draft: string;
  readonly original: string;
  /** The interview question that broke this line. */
  readonly probe: string;
  readonly whyFailed: string;
  /** What Forte would write instead. */
  readonly suggestion: string;
};

const TERMINAL: readonly ClaimStatus[] = ["rewritten", "cut", "stood"];

export function isResolved(status: ClaimStatus): boolean {
  return TERMINAL.includes(status);
}
