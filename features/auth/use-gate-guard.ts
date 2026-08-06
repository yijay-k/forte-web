"use client";

import { usePathname, useRouter } from "next/navigation";
import { GATED_EXACT_ROUTES, GATED_ROUTE_PREFIXES } from "@/constants/navigation";
import { useIsomorphicLayoutEffect } from "@/utils/use-isomorphic-layout-effect";
import { useAuth } from "./use-auth";

/** Where a signed-out visitor belongs: the free CV evaluation. */
const OPEN_ROUTE = "/cv/new";

function isGated(pathname: string): boolean {
  if (GATED_EXACT_ROUTES.includes(pathname)) return true;
  return GATED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * The sidebar refuses to navigate to a gated screen while signed out, but a
 * typed URL bypasses that. This closes the gap so the two agree.
 *
 * Returns whether a redirect is in flight, so the caller can withhold the
 * screen instead of painting private content and swapping it a frame later.
 */
export function useGateGuard(): boolean {
  const { authed } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const blocked = !authed && isGated(pathname);

  useIsomorphicLayoutEffect(() => {
    if (blocked) router.replace(OPEN_ROUTE);
  }, [blocked, router]);

  return blocked;
}
