import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

/** The card surface. `ink` inverts for hero panels; `sunk` is an inset well. */
type Tone = "surface" | "sunk" | "ink" | "accent" | "sage";

/** Which offset-block shadow sits under the card, if any. */
type Shadow = "none" | "soft" | "hard" | "hard-lg" | "accent" | "amber";

const TONE: Record<Tone, string> = {
  surface: "bg-surface text-ink border-ink",
  sunk: "bg-surface-sunk text-ink border-ink",
  ink: "bg-ink text-on-ink border-ink",
  accent: "bg-accent text-ink border-ink",
  sage: "bg-sage text-ink border-ink",
};

const SHADOW: Record<Shadow, string> = {
  none: "",
  soft: "shadow-soft",
  hard: "shadow-hard",
  "hard-lg": "shadow-hard-lg",
  accent: "shadow-accent",
  amber: "shadow-amber",
};

type Props = {
  children: ReactNode;
  as?: ElementType;
  tone?: Tone;
  shadow?: Shadow;
  /** Tailwind radius utility — the design uses 18px through 26px. */
  radius?: string;
  padding?: string;
  className?: string;
};

export function PaperCard({
  children,
  as: Tag = "div",
  tone = "surface",
  shadow = "soft",
  radius = "rounded-3xl",
  padding = "p-7",
  className,
}: Props) {
  return (
    <Tag
      className={cn(
        "border-hair",
        TONE[tone],
        SHADOW[shadow],
        radius,
        padding,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
