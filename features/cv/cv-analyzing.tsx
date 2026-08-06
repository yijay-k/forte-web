import { cn } from "@/utils/cn";
import { ProgressBar } from "@/components/ui/progress-bar";

type Props = {
  headline: string;
  steps: readonly string[];
  step: number;
  percent: number;
};

/** Real progress, not a spinner: the user is told what's happening to their CV. */
export function CvAnalyzing({ headline, steps, step, percent }: Props) {
  return (
    <div className="rounded-4xl border-hair border-ink bg-ink px-10 py-13 text-on-ink shadow-accent">
      <div className="mb-2 font-serif text-[32px] leading-[1.15] font-medium">
        {headline}
      </div>
      <div className="mb-7 text-[14.5px] text-on-ink-muted">
        Usually 30–60 seconds. Don&rsquo;t close the tab — nothing here needs an
        account.
      </div>

      <ProgressBar
        percent={percent}
        tone="accent"
        track="on-ink"
        height="h-2.5"
        className="mb-6"
      />

      <ol className="flex flex-col gap-3">
        {steps.map((text, i) => {
          const done = i < step;
          const current = i === step;

          return (
            <li key={text} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-pill border-hair text-[11px] font-bold",
                  done
                    ? "border-accent bg-accent text-ink"
                    : current
                      ? "border-paper"
                      : "border-paper/25",
                )}
              >
                {done ? "✓" : ""}
              </span>
              <span
                className={cn(
                  "text-[14.5px]",
                  done || current ? "text-on-ink" : "text-on-ink-dim",
                  current && "font-semibold",
                )}
              >
                {text}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
