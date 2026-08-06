import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import type { DeliveryMetric } from "@/types/interview";

/** Timings, not judgements — and the copy says so plainly. */
export function DeliveryMetrics({ metrics }: { metrics: readonly DeliveryMetric[] }) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
        <CardTitle>How you held the floor</CardTitle>
        <Chip tone="sage" className="text-muted">
          logged, not scored
        </Chip>
      </div>
      <p className="mb-4.5 text-[13.5px] leading-relaxed text-muted">
        Counted from the conversation itself — turn-taking, pauses,
        self-corrections. These are timings, not judgements about you.
      </p>

      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(196px,1fr))]">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border-hair border-ink bg-surface-sunk px-4.5 py-4"
          >
            <div className="mb-1.5 text-[12.5px] font-semibold text-muted">
              {metric.label}
            </div>
            <div className="font-serif text-[23px] font-medium">{metric.value}</div>
            <div className="mt-1 text-xs leading-snug text-faint">{metric.note}</div>
          </div>
        ))}
      </div>
    </PaperCard>
  );
}
