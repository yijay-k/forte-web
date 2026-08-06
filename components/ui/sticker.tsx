import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  /** Absolute positioning classes — stickers always hang off a card corner. */
  position?: string;
  /** The floaty bob. Off for stickers that sit inline. */
  animate?: boolean;
  className?: string;
};

/**
 * The rotated amber tag pinned to the corner of a card. Purely decorative
 * emphasis, so it is hidden from assistive tech — the text it labels is always
 * present in the card itself.
 */
export function Sticker({ children, position, animate, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "z-2 inline-block rounded-pill border-hair border-ink bg-amber px-3.25 py-1",
        "text-[11px] font-bold text-ink shadow-drop",
        animate ? "animate-floaty" : "-rotate-3",
        position ?? "absolute -top-3.5 left-7",
        className,
      )}
    >
      {children}
    </span>
  );
}
