import type { ClaimStatus } from "@/types/revise";
import type { Verdict } from "@/types/common";

/** Chip styling per verdict. Used by coverage rows, CV runs, and annotations. */
export const VERDICT_CHIP: Record<Verdict, string> = {
  ok: "bg-sage text-good",
  weak: "bg-amber/30 text-warn",
  miss: "bg-track text-[#8a897e]",
  neutral: "bg-surface text-ink",
};

/** Border + fill for a coverage row, which is tinted by its verdict. */
export const VERDICT_ROW: Record<Verdict, string> = {
  ok: "border-ink bg-surface",
  weak: "border-[#e8b06a] bg-surface-sunk",
  miss: "border-line bg-surface-sunk",
  neutral: "border-line bg-surface",
};

/** How each claim state is labelled and coloured on its card. */
export const CLAIM_STATUS_META: Record<
  ClaimStatus,
  { label: string; chip: string }
> = {
  open: { label: "Needs a decision", chip: "bg-track text-[#8a897e]" },
  editing: { label: "Editing", chip: "bg-accent text-ink" },
  rewritten: { label: "Rewritten", chip: "bg-sage text-good" },
  cut: { label: "Cut from CV", chip: "bg-ink text-on-ink" },
  stood: { label: "Standing by it", chip: "bg-amber/30 text-warn" },
};

/** Highlight styles for the marked-up CV. */
export const ANNOTATION_HIGHLIGHT: Record<Verdict, string> = {
  ok: "",
  weak: "bg-[rgba(196,174,245,0.5)] border-b-2 border-[#8b6fd6] rounded-xs px-[3px] py-px",
  miss: "bg-amber/40 border-b-2 border-amber rounded-xs px-[3px] py-px",
  neutral: "",
};

export const ANNOTATION_TAG: Record<Verdict, string> = {
  ok: "",
  weak: "text-[#5b46a3] bg-[rgba(196,174,245,0.4)] border-[#b7a2ea]",
  miss: "text-warn bg-amber/[0.28] border-[#e8b06a]",
  neutral: "",
};

export const RUBRIC_CAPTION =
  "All out of 100 — same rubric on your CV and in your interviews. Confidence is logged, never weighted.";
