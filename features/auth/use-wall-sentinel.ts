"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "./use-auth";

/**
 * Returns a ref callback for a 1px sentinel. When the sentinel scrolls into
 * view the unlock wall fires — once. Attach it just above the gated content so
 * the wall arrives at the moment the user reaches the paywall, not on load.
 *
 * `root` is the scrolling element (the app shell's <main>), not the viewport.
 */
export function useWallSentinel(root?: Element | null) {
  const { authed, wallSeen, triggerWall } = useAuth();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const armed = !authed && !wallSeen;

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return useCallback(
    (node: HTMLElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node || !armed) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) triggerWall();
        },
        { root: root ?? null, threshold: 0.1 },
      );
      observerRef.current.observe(node);
    },
    [armed, root, triggerWall],
  );
}
