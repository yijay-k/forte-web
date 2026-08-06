import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Visual tones only. `components/ui` stays domain-agnostic — callers map their
 * own verdicts onto these names (see `VERDICT_CHIP` in constants/scoring).
 */
export type ChipTone =
  | "neutral"
  | "good"
  | "warning"
  | "quiet"
  | "accent"
  | "amber"
  | "ink"
  | "sage";

const TONE: Record<ChipTone, string> = {
  neutral: "bg-surface text-ink",
  good: "bg-sage text-good",
  warning: "bg-amber/30 text-warn",
  quiet: "bg-track text-[#8a897e]",
  accent: "bg-accent text-ink",
  amber: "bg-amber text-ink",
  ink: "bg-ink text-on-ink",
  sage: "bg-sage text-ink",
};

type Props = {
  children: ReactNode;
  tone?: ChipTone;
  /** The design tilts emphasis chips a couple of degrees. */
  tilt?: boolean;
  className?: string;
};

/** The 999px status pill. Always a 1.5px ink border, always 11px bold. */
export function Chip({ children, tone = "neutral", tilt, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-pill border-hair border-ink",
        "px-2.75 py-1 text-[11px] font-bold whitespace-nowrap",
        TONE[tone],
        tilt && "-rotate-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
