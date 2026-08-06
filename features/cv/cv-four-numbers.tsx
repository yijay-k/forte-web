import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/utils/cn";
import { getCvReport } from "@/lib/data/cv-report";

/** The /100 breakdown with the bar chart. Gated. */
export function CvFourNumbers() {
  const { breakdown } = getCvReport();

  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <CardTitle className="mb-1.5">The four numbers</CardTitle>
      <p className="mb-5 text-[13px] text-muted">
        Out of 100. The same rubric scores your mock interview, so you can watch each
        one move.
      </p>

      <div className="grid gap-4">
        {breakdown.map((row) => (
          <div key={row.label}>
            <div className="mb-1.75 flex justify-between text-sm font-semibold">
              <span>{row.label}</span>
              <span
                className={cn(
                  row.weak && "font-bold text-warn",
                  row.unearned && "font-medium text-faint",
                  !row.weak && !row.unearned && "font-bold text-ink",
                )}
              >
                {row.score}
              </span>
            </div>
            <ProgressBar percent={row.percent} tone={row.weak ? "amber" : "ink"} />
            <div className="mt-1.5 text-[12.5px] text-faint">{row.note}</div>
          </div>
        ))}
      </div>
    </PaperCard>
  );
}
