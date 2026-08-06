"use client";

import { useCallback, useMemo, useState } from "react";
import { countWords } from "@/utils/format-clock";
import {
  PARSED_REQUIREMENTS,
  ROLE_FALLBACK_NOTE,
  SAMPLE_JD,
  TARGET_COMPANY,
  TARGET_ROLE,
} from "@/lib/data/job-description";

/**
 * The job-description half of the upload step.
 *
 * Two ways to be "ready": a parsed posting, or the role fallback for users who
 * don't have a posting yet. The fallback deliberately disables the coverage
 * check rather than faking one.
 */
export function useJdInput() {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState(false);
  const [roleFallback, setRoleFallback] = useState(false);

  const useSample = useCallback(() => setText(SAMPLE_JD), []);

  const parse = useCallback(() => {
    setText((current) => {
      if (current.trim()) {
        setParsed(true);
        setRoleFallback(false);
      }
      return current;
    });
  }, []);

  const clear = useCallback(() => {
    setParsed(false);
    setRoleFallback(false);
    setText("");
  }, []);

  const useRoleFallback = useCallback(() => {
    setParsed(true);
    setRoleFallback(true);
    setText("");
  }, []);

  const summary = useMemo(() => {
    if (roleFallback) {
      return {
        sourceLabel: "No posting — role fallback",
        role: TARGET_ROLE,
        meta: "Generic role benchmark · coverage check unavailable without a posting",
        requirements: [ROLE_FALLBACK_NOTE],
        numbered: false,
      };
    }
    return {
      sourceLabel: "Read from the posting",
      role: TARGET_ROLE,
      meta: `${TARGET_COMPANY} · ${countWords(text)} words · ${PARSED_REQUIREMENTS.length} checkable requirements`,
      requirements: PARSED_REQUIREMENTS,
      numbered: true,
    };
  }, [roleFallback, text]);

  return {
    text,
    setText,
    parsed,
    roleFallback,
    canParse: text.trim().length > 0,
    summary,
    useSample,
    parse,
    clear,
    useRoleFallback,
  };
}
