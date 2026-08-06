"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getInterviewQuestions } from "@/lib/data/interview-questions";
import { DEFAULT_INTERVIEWER } from "@/lib/data/interviewers";
import type {
  InterviewerId,
  InterviewMode,
  InterviewStage,
  StageView,
} from "@/types/interview";

/**
 * Owns the whole session: stage, question cursor, the follow-up probe, and the
 * clock. The clock lives here rather than in a route so it can't outlive the
 * session — leaving the interview stops it.
 */
export function useInterviewSession() {
  const questions = getInterviewQuestions();

  const [stage, setStage] = useState<InterviewStage>("setup");
  const [mode, setMode] = useState<InterviewMode>("video");
  const [interviewerId, setInterviewerId] = useState<InterviewerId>(DEFAULT_INTERVIEWER);
  const [speakAnswers, setSpeakAnswers] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [onProbe, setOnProbe] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [stageView, setStageView] = useState<StageView>("ai");

  const clockRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopClock = useCallback(() => {
    if (clockRef.current) clearInterval(clockRef.current);
    clockRef.current = null;
  }, []);

  useEffect(() => stopClock, [stopClock]);

  const begin = useCallback(() => {
    setStage("live");
    setQuestionIndex(0);
    setOnProbe(false);
    setElapsed(0);
    stopClock();
    clockRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  }, [stopClock]);

  const finish = useCallback(() => {
    stopClock();
    setStage("feedback");
  }, [stopClock]);

  /** Answering advances to the probe first, if this question has one. */
  const next = useCallback(() => {
    const current = questions[questionIndex];
    if (current?.probe && !onProbe) {
      setOnProbe(true);
      return;
    }
    if (questionIndex >= questions.length - 1) {
      finish();
      return;
    }
    setQuestionIndex((i) => i + 1);
    setOnProbe(false);
  }, [finish, onProbe, questionIndex, questions]);

  const restart = useCallback(() => {
    stopClock();
    setStage("setup");
    setQuestionIndex(0);
    setOnProbe(false);
    setElapsed(0);
  }, [stopClock]);

  const current = questions[questionIndex] ?? questions[0];
  const isLastStep =
    questionIndex >= questions.length - 1 && (!current.probe || onProbe);

  return {
    stage,
    mode,
    setMode,
    interviewerId,
    setInterviewerId,
    speakAnswers,
    setSpeakAnswers,
    stageView,
    swapView: () => setStageView((v) => (v === "ai" ? "self" : "ai")),

    questions,
    questionIndex,
    current,
    onProbe,
    elapsed,
    isLastStep,

    /** The probe replaces the question text once the follow-up fires. */
    prompt: onProbe && current.probe ? current.probe : current.q,
    questionLabel: `Question ${questionIndex + 1} of ${questions.length}`,
    nextLabel: isLastStep
      ? "Finish"
      : current.probe && !onProbe
        ? "Done answering"
        : "Next question",

    begin,
    next,
    finish,
    restart,
  };
}

export type InterviewSession = ReturnType<typeof useInterviewSession>;
