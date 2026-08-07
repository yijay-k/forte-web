"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "ink" | "accent" | "paper" | "outline" | "ghost" | "underline";
type Size = "sm" | "md" | "lg" | "xl";

const VARIANT: Record<Variant, string> = {
  ink: "bg-ink text-on-ink border-hair border-ink",
  accent: "bg-accent text-ink border-hair border-ink",
  paper: "bg-surface text-ink border-hair border-ink",
  outline: "bg-transparent text-ink border-hair border-ink hover:bg-sage",
  ghost: "bg-transparent text-muted border-hair border-line hover:border-ink hover:text-ink",
  underline:
    "bg-transparent text-muted border-0 border-b-[1.5px] border-ink/25 rounded-none px-0 hover:text-ink",
};

const SIZE: Record<Size, string> = {
  sm: "px-4 py-2.25 text-[12.5px]",
  md: "px-5 py-2.75 text-[13.5px]",
  lg: "px-7 py-3.5 text-[14.5px]",
  xl: "px-8.5 py-4 text-base",
};

// A disabled control keeps a block rather than going flat, so nothing shifts
// the moment it becomes available. Alpha drops to .16 instead.
const DISABLED = "bg-track text-faint border-hair border-line cursor-not-allowed shadow-disabled";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /**
   * Overrides the block the variant would otherwise carry — a louder tier for
   * the one hero action on a screen, or `none` where a button sits inside
   * something that already has a block.
   */
  shadow?: "none" | "muted" | "danger" | "hard-sm" | "hard-md" | "hard" | "accent-md";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Resting/hover pairs, always one step apart: the button moves 1px on hover
 * and the block shrinks 1px to meet it, so its outer edge never moves.
 * `muted` is the tier for `line`-bordered secondaries, `hard-*` for ink.
 */
const SHADOW: Record<NonNullable<Props["shadow"]>, string> = {
  none: "",
  muted: "shadow-muted-sm press hover:shadow-muted-xs",
  danger: "shadow-danger-sm press hover:shadow-danger-xs",
  "hard-sm": "shadow-hard-sm press hover:shadow-hard-xs",
  "hard-md": "shadow-hard-md press hover:shadow-hard-sm",
  hard: "shadow-hard press hover:shadow-hard-md",
  "accent-md": "shadow-accent-md press hover:shadow-accent-md2",
};

/**
 * The block follows the border, not the call site: an ink border carries the
 * full-strength block, the `line`-bordered ghost carries the muted one, and the
 * underline variant has no block to carry. Defaulting here rather than at each
 * call site is what stops secondary buttons from drifting flat again.
 */
const DEFAULT_SHADOW: Record<Variant, NonNullable<Props["shadow"]>> = {
  ink: "hard-sm",
  accent: "hard-sm",
  paper: "hard-sm",
  outline: "hard-sm",
  ghost: "muted",
  underline: "none",
};

export function PillButton({
  children,
  variant = "ink",
  size = "md",
  shadow,
  className,
  disabled,
  type = "button",
  ...rest
}: Props) {
  const tier = shadow ?? DEFAULT_SHADOW[variant];

  // A disabled button drops `press` entirely — `:hover` still matches on a
  // disabled element, so keeping it would let a dead control move.
  const pressed = !disabled && tier !== "none";

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        // No blanket `whitespace-nowrap`: a long label like "Can't read your
        // file? Paste it as text" would then set a ~310px min-content floor and
        // push its whole card wider than a phone. Buttons that genuinely must
        // stay on one line ask for it at the call site.
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold",
        // No `transition-colors` alongside `press`: `press` already animates
        // colour, and a second declaration would replace its transform/shadow.
        !pressed && "transition-colors duration-150",
        variant === "underline" ? "" : SIZE[size],
        disabled ? DISABLED : cn(VARIANT[variant], SHADOW[tier]),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
