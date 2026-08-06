"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { ToggleTrack } from "./toggle";

type Props = {
  title: string;
  description?: string;
  /** Trailing control — a button, a link. Omit when using `toggle`. */
  action?: ReactNode;
  /** Renders a switch and makes the whole row a click target for it. */
  toggle?: { on: boolean; onChange: (next: boolean) => void };
  last?: boolean;
  className?: string;
};

/**
 * One row inside a settings card. When it carries a toggle the entire row is
 * the hit area, which is why it renders as a button rather than a div.
 */
export function SettingRow({
  title,
  description,
  action,
  toggle,
  last,
  className,
}: Props) {
  const body = (
    <>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[13.5px] font-semibold">{title}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-faint">{description}</span>
        )}
      </span>
      {/* The row itself is the switch, so this is purely the visual. */}
      {toggle ? <ToggleTrack on={toggle.on} /> : action}
    </>
  );

  const shell = cn(
    "flex w-full items-center gap-4 px-5 py-3.75",
    !last && "border-b border-ink/8",
    className,
  );

  if (!toggle) return <div className={shell}>{body}</div>;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={toggle.on}
      onClick={() => toggle.onChange(!toggle.on)}
      className={cn(shell, "cursor-pointer transition-colors hover:bg-surface-sunk")}
    >
      {body}
    </button>
  );
}
