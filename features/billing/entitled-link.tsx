"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useBilling } from "./use-billing";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * A link to an action that spends an application. When the user has none left
 * it opens the plans modal instead of navigating — the paywall belongs at the
 * point of spend, not at the door.
 *
 * Renders an anchor so it keeps middle-click, hover preview and the correct
 * role; the click is intercepted only when the gate actually applies.
 */
export function EntitledLink({ href, children, className }: Props) {
  const { atLimit, openPay } = useBilling();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (!atLimit) return;
        e.preventDefault();
        openPay();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" || !atLimit) return;
        e.preventDefault();
        openPay();
      }}
    >
      {children}
    </Link>
  );
}
