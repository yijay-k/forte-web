"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  /** `wide` is the plans modal; `default` is the auth wall. */
  size?: "default" | "wide";
  /** Renders the corner ✕. Both modals in the design have one. */
  onCloseButton?: () => void;
  children: React.ReactNode;
};

const SIZE = {
  default: "max-w-[470px]",
  wide: "max-w-[600px]",
};

/**
 * Portal dialog: escape closes, click-outside closes, body scroll locked, and
 * focus moves in on open and returns to the trigger on close.
 */
export function Modal({
  open,
  onClose,
  label,
  size = "default",
  onCloseButton,
  children,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

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

    // A CSS-driven lock: globals.css freezes both the document and the app's
    // [data-scroll-container] while this attribute is present.
    document.documentElement.setAttribute("data-modal-open", "");

    // Focus the dialog itself rather than its first control, so a screen
    // reader announces the heading before the first action.
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.removeAttribute("data-modal-open");
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-95 flex items-center justify-center overflow-auto p-7">
      <div
        className="absolute inset-0 animate-fade-in bg-ink/55 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "relative z-1 m-auto w-full animate-rise rounded-5xl border-hair border-ink bg-paper p-9 shadow-hard-2xl outline-none",
          SIZE[size],
        )}
      >
        {onCloseButton && (
          <button
            type="button"
            onClick={onCloseButton}
            aria-label="Close"
            className="absolute top-4.5 right-4.5 flex size-8 items-center justify-center rounded-pill border-hair border-line text-[15px] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
