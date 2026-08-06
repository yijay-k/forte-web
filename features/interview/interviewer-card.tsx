"use client";

import { cn } from "@/utils/cn";
import type { Interviewer } from "@/types/interview";

type Props = {
  interviewer: Interviewer;
  selected: boolean;
  onSelect: () => void;
};

export function InterviewerCard({ interviewer, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border-hair px-4 pt-5 pb-4 text-center transition-[box-shadow,transform]",
        selected
          ? "border-ink bg-surface shadow-[4px_4px_0_#161513]"
          : "border-ink/18 bg-surface-sunk",
      )}
    >
      <span
        className={cn(
          "mx-auto mb-3 flex size-17.5 items-center justify-center rounded-pill border-hair",
          interviewer.orbClass,
          selected ? "border-ink opacity-100" : "border-ink/25 opacity-55",
        )}
      >
        <span
          className={cn(
            "size-4.5 rounded-pill border-[2.5px] border-ink",
            selected ? "opacity-100" : "opacity-40",
          )}
        />
      </span>

      <div className="mb-0.5 font-serif text-[17px] font-medium">{interviewer.name}</div>
      <div className="mb-1.75 text-xs font-bold text-muted">{interviewer.role}</div>
      <p className="text-[12.5px] leading-snug text-muted">{interviewer.posture}</p>

      <span
        className={cn(
          "mt-2.5 inline-block rounded-pill border px-2.25 py-0.75 text-[10.5px] font-extrabold tracking-[0.06em] uppercase",
          selected
            ? "border-ink bg-sage text-ink"
            : "border-ink/16 bg-transparent text-[#a3a294]",
        )}
      >
        {interviewer.tag}
      </span>
    </button>
  );
}
