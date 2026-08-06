"use client";

import { cn } from "@/utils/cn";

/**
 * The track/knob visual, with no semantics of its own. Ink when on, paper when
 * off — no colour signalling.
 *
 * Split out so a row that is itself the switch (see `SettingRow`) can render
 * the visual without nesting a second <button>, which is invalid HTML and
 * breaks hydration.
 */
export function ToggleTrack({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-6 w-10.5 shrink-0 items-center rounded-pill border-hair border-ink px-0.75",
        "transition-colors duration-150",
        on ? "justify-end bg-ink" : "justify-start bg-surface",
        className,
      )}
    >
      <span className={cn("block size-3.5 rounded-pill", on ? "bg-paper" : "bg-ink")} />
    </span>
  );
}

type Props = {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
  className?: string;
};

/** A standalone switch. Use `ToggleTrack` when the parent is already the control. */
export function Toggle({ on, onChange, label, className }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn("inline-flex", className)}
    >
      <ToggleTrack on={on} />
    </button>
  );
}
