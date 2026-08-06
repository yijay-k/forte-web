import { cn } from "@/utils/cn";
import { Chip } from "@/components/ui/chip";
import type { QuestionFeedback } from "@/types/interview";

export function QuestionFeedbackCard({ feedback }: { feedback: QuestionFeedback }) {
  const bad = feedback.kind === "bad";

  return (
    <div
      className={cn(
        "rounded-xl border-hair border-ink px-5 py-4.5",
        bad ? "bg-surface-sunk" : "bg-surface",
      )}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2.5">
        <Chip tone={bad ? "amber" : "sage"} tilt={bad}>
          {feedback.chip}
        </Chip>
        <span className="font-serif text-base font-semibold">{feedback.title}</span>
      </div>

      <p className="text-sm leading-[1.55] text-muted">{feedback.body}</p>

      {feedback.quote && (
        <p className="mt-2.75 rounded-md border border-ink/14 bg-surface px-3.5 py-3 text-[13.5px] leading-[1.55]">
          <span className="font-semibold text-good">Stronger:</span> {feedback.quote}
        </p>
      )}
    </div>
  );
}
