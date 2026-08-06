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

const DISABLED = "bg-track text-faint border-hair border-line cursor-not-allowed";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Attaches an offset-block shadow and the press-into-it hover. */
  shadow?: "none" | "hard-sm" | "hard-md" | "hard" | "accent-md";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SHADOW: Record<NonNullable<Props["shadow"]>, string> = {
  none: "",
  "hard-sm": "shadow-hard-sm press hover:shadow-hard-xs",
  "hard-md": "shadow-hard-md press hover:shadow-hard-xs",
  hard: "shadow-hard press hover:shadow-hard-sm",
  "accent-md": "shadow-accent-md press hover:shadow-accent-sm",
};

export function PillButton({
  children,
  variant = "ink",
  size = "md",
  shadow = "none",
  className,
  disabled,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap",
        // No `transition-colors` here: `press` already animates colour, and a
        // second transition declaration would replace its transform/shadow.
        shadow === "none" && "transition-colors duration-150",
        variant === "underline" ? "" : SIZE[size],
        disabled ? DISABLED : cn(VARIANT[variant], SHADOW[shadow]),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
