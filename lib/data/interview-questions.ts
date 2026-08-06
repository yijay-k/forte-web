import type { InterviewQuestion } from "@/types/interview";

/**
 * Five questions built from the CV and the posting. Each names its source, so
 * the candidate can see the question was earned rather than generic.
 */
const QUESTIONS: readonly InterviewQuestion[] = [
  {
    q: "Your CV says you grew activation 34% after the onboarding revamp. How was that measured?",
    src: "From your CV · Northwind, bullet 4",
    probe: "What was the baseline, and over what window?",
  },
  {
    q: "They want someone who can govern a design system past 60 components. Which system have you owned?",
    src: "From the posting · requirement 3, weighted highest",
    probe:
      "Who could contribute to it, and what stopped them shipping something off-pattern?",
  },
  {
    q: 'You list "worked with engineers to ship a new analytics dashboard." What did you personally decide on that project?',
    src: "From your CV · Northwind, bullet 3",
    probe: null,
  },
  {
    q: "The posting asks for experimentation. Walk me through an experiment you ran that returned a result you didn't want.",
    src: "From the posting · requirement 2, not found in your CV",
    probe: null,
  },
  {
    q: "You're at Northwind now. Why leave for this, specifically?",
    src: "From the posting · Meridian, Senior Product Designer",
    probe: null,
  },
];

export function getInterviewQuestions(): readonly InterviewQuestion[] {
  return QUESTIONS;
}
