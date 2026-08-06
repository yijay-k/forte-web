"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * Use it for anything that must land *before* the browser paints — scroll
 * resets, chrome that should never flash, autoscroll to the newest item.
 * Plain `useEffect` runs after paint, so the user sees one frame of the wrong
 * thing first.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
