"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { useAuth } from "./use-auth";

/** Where a signed-out visitor belongs: the free CV evaluation. */
const OPEN_ROUTE = "/cv";

function isGated(pathname: string): boolean {
  return NAV_ITEMS.some(
    (item) =>
      item.gated &&
      (item.matchPrefix
        ? pathname === item.href || pathname.startsWith(`${item.href}/`)
        : pathname === item.href),
  );
}

/**
 * The sidebar refuses to navigate to a gated screen while signed out, but a
 * typed URL bypasses that. This closes the gap so the two agree.
 */
export function useGateGuard() {
  const { authed } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authed && isGated(pathname)) router.replace(OPEN_ROUTE);
  }, [authed, pathname, router]);
}
