"use client";

import { cn } from "@/utils/cn";

type Props = {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
  className?: string;
};

/** The track/knob switch. Ink when on, paper when off — no colour signalling. */
export function Toggle({ on, onChange, label, className }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        "inline-flex h-6 w-10.5 shrink-0 items-center rounded-pill border-hair border-ink px-0.75",
        "transition-colors duration-150",
        on ? "justify-end bg-ink" : "justify-start bg-surface",
        className,
      )}
    >
      <span
        className={cn("block size-3.5 rounded-pill", on ? "bg-paper" : "bg-ink")}
      />
    </button>
  );
}
