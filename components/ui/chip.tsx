import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { VERDICT_CHIP } from "@/constants/scoring";
import type { Verdict } from "@/types/common";

type Tone = Verdict | "accent" | "amber" | "ink" | "sage";

const TONE: Record<Tone, string> = {
  ...VERDICT_CHIP,
  accent: "bg-accent text-ink",
  amber: "bg-amber text-ink",
  ink: "bg-ink text-on-ink",
  sage: "bg-sage text-ink",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  /** The design tilts emphasis chips a couple of degrees. */
  tilt?: boolean;
  className?: string;
};

/** The 999px status pill. Always 1.5px ink border, always 11px bold. */
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
