import type { Interviewer, InterviewerId } from "@/types/interview";

/** Three reps, easiest to hardest. Daniel is the default — closest to real. */
const INTERVIEWERS: readonly Interviewer[] = [
  {
    id: "rina",
    name: "Rina",
    role: "Recruiter screen",
    orbClass: "bg-sage",
    tag: "Gentlest rep",
    posture: "Warm, moves fast, takes your first answer at face value.",
  },
  {
    id: "daniel",
    name: "Daniel",
    role: "Hiring manager",
    orbClass: "bg-accent",
    tag: "Closest to real",
    posture: 'Interrupts when you ramble. Asks "measured how?" every time.',
  },
  {
    id: "priya",
    name: "Priya",
    role: "Panel lead",
    orbClass: "bg-amber",
    tag: "Hardest rep",
    posture: "Silent after your answer. Waits to see if you fill the gap.",
  },
];

export const DEFAULT_INTERVIEWER: InterviewerId = "daniel";

export function getInterviewers(): readonly Interviewer[] {
  return INTERVIEWERS;
}

export function getInterviewer(id: InterviewerId): Interviewer {
  return INTERVIEWERS.find((p) => p.id === id) ?? INTERVIEWERS[1];
}
