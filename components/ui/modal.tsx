"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useAppFrame } from "@/components/layout/app-frame";
import { cn } from "@/utils/cn";
import { lockScroll } from "@/utils/scroll-lock";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  /** `wide` is the plans modal; `default` is the auth wall. */
  size?: "default" | "wide";
  /**
   * Gives the panel its own scrolling layer instead of scrolling inside it, and
   * dismisses on a click that lands on the layer rather than the panel. The
   * plans modal needs it: its panel is routinely taller than a phone frame, and
   * a panel that scrolls internally hides its own drop shadow.
   */
  scrollLayer?: boolean;
  /** Renders the corner ✕. Both modals in the design have one. */
  onCloseButton?: () => void;
  children: React.ReactNode;
};

const SIZE = {
  default: "max-w-[470px]",
  wide: "max-w-[600px]",
};

/** Narrow → wide. Both panels ramp the same block; only padding differs. */
const PANEL_SHELL =
  "animate-rise rounded-[20px] border-hair border-ink bg-paper shadow-hard outline-none app:rounded-5xl app:shadow-hard-2xl";

const PANEL_PADDING = {
  default: "px-[20px] py-[24px] app:p-9",
  wide: "px-[16px] py-[22px] app:p-[34px]",
};

/**
 * Dialog clipped to the app frame: escape closes, click-outside closes, body
 * scroll locked, and focus moves in on open and returns to the trigger on close.
 */
export function Modal({
  open,
  onClose,
  label,
  size = "default",
  scrollLayer,
  onCloseButton,
  children,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // The wrapper is `position:absolute`, so it only clips to the app frame if it
  // is mounted inside it. Portalling there rather than rendering in place keeps
  // that true no matter how deep the component that opened the modal sits.
  const host = useAppFrame();

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Trap focus: a dialog you can tab out of is not modal.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);

    // Reference-counted, because the mobile drawer holds the same lock: a modal
    // opened from inside the drawer must not unfreeze the page when it closes.
    const releaseScroll = lockScroll();

    // Focus the dialog itself rather than its first control, so a screen
    // reader announces the heading before the first action.
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      releaseScroll();
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !host) return null;

  // Only a click that landed on the layer itself, never one that bubbled up
  // out of the panel.
  function onLayerClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const panel = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className={cn(
        "relative z-1 w-full",
        PANEL_SHELL,
        PANEL_PADDING[size],
        SIZE[size],
        // Scrolling its own layer, the panel keeps its full height; scrolling
        // itself, it has to stop at the frame.
        scrollLayer ? "mx-auto shrink-0" : "m-auto max-h-full overflow-y-auto scrollbar-none",
      )}
    >
      {onCloseButton && (
        <button
          type="button"
          onClick={onCloseButton}
          aria-label="Close"
          className="press absolute top-4.5 right-4.5 flex size-8 items-center justify-center rounded-pill border-hair border-line text-[15px] text-muted shadow-muted-sm hover:border-ink hover:text-ink hover:shadow-muted-xs"
        >
          ✕
        </button>
      )}
      {children}
    </div>
  );

  return createPortal(
    <div className="absolute inset-0 z-95 flex items-center justify-center overflow-hidden p-2.5 app:p-7">
      <div
        className="absolute inset-0 animate-fade-in bg-ink/55 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      {scrollLayer ? (
        // `items-center-safe`, not `items-center`: plain centring clips the top
        // of a panel taller than the layer, putting the ✕ out of reach.
        <div
          onClick={onLayerClick}
          className="absolute inset-0 z-1 flex items-center-safe justify-center overflow-x-hidden overflow-y-auto px-2.5 pt-2.5 pb-[20px] scrollbar-none app:px-7 app:pt-7 app:pb-[42px]"
        >
          {panel}
        </div>
      ) : (
        panel
      )}
    </div>,
    host,
  );
}
