"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ANALYZE_STEPS } from "@/lib/data/cv-report";

const STEP_MS = 900;
const SETTLE_MS = 700;

/**
 * Walks the analyser through its steps, one every 900ms, then settles before
 * handing off. Real progress rather than a spinner — the user is told what is
 * happening to their document, which is the point.
 */
export function useCvAnalysis(onComplete: () => void) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep the latest callback without restarting the interval when it changes.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimers = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (settleRef.current) clearTimeout(settleRef.current);
    tickRef.current = null;
    settleRef.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const start = useCallback(() => {
    clearTimers();
    setRunning(true);
    setStep(0);

    tickRef.current = setInterval(() => {
      setStep((current) => {
        const next = current + 1;
        if (next >= ANALYZE_STEPS.length) {
          clearTimers();
          settleRef.current = setTimeout(() => onCompleteRef.current(), SETTLE_MS);
          return ANALYZE_STEPS.length;
        }
        return next;
      });
    }, STEP_MS);
  }, [clearTimers]);

  return {
    running,
    step,
    steps: ANALYZE_STEPS,
    percent: Math.round((step / ANALYZE_STEPS.length) * 100),
    headline:
      step >= ANALYZE_STEPS.length - 1
        ? "Scoring against their five requirements…"
        : "Reading between your bullet points…",
    start,
  };
}
