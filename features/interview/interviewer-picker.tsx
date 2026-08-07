"use client";

import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { getInterviewers } from "@/lib/data/interviewers";
import type { InterviewerId } from "@/types/interview";
import { InterviewerCard } from "./interviewer-card";

type Props = {
  selected: InterviewerId;
  onSelect: (id: InterviewerId) => void;
};

/** Picking an interviewer picks a difficulty, not a voice. */
export function InterviewerPicker({ selected, onSelect }: Props) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <CardTitle className="mb-1.5">Who&rsquo;s interviewing you</CardTitle>
      <p className="mb-5 text-[13.5px] leading-relaxed text-muted">
        Not a voice preference — this changes how hard the rep is. Same five
        questions, different tolerance for a vague answer.
      </p>

      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))]">
        {getInterviewers().map((interviewer) => (
          <InterviewerCard
            key={interviewer.id}
            interviewer={interviewer}
            selected={interviewer.id === selected}
            onSelect={() => onSelect(interviewer.id)}
          />
        ))}
      </div>
    </PaperCard>
  );
}
