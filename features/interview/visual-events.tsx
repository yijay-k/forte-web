import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import type { VisualEvent } from "@/types/interview";

/** Video-mode only: moments where something visible changed the question. */
export function VisualEvents({ events }: { events: readonly VisualEvent[] }) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
        <CardTitle>What the camera added</CardTitle>
        <Chip tone="accent">video mode</Chip>
      </div>
      <p className="mb-4.5 text-[13.5px] leading-relaxed text-muted">
        Three moments where something visible changed the question you got.
        Timestamps, not ratings — jump to any of them in the replay.
      </p>

      <div className="grid gap-2.75">
        {events.map((event) => (
          <div
            key={event.at}
            className="flex items-start gap-3.5 rounded-lg border-hair border-ink bg-surface-sunk px-4.5 py-3.75"
          >
            <span className="mt-px shrink-0 rounded-sm bg-ink px-2 py-1 font-mono text-[13px] font-semibold text-on-ink">
              {event.at}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-0.75 text-[14.5px] leading-snug font-semibold">
                {event.what}
              </div>
              <div className="text-[13px] leading-relaxed text-muted">
                {event.consequence}
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-pill border-hair border-ink px-3.5 py-1.75 text-xs font-semibold whitespace-nowrap transition-colors hover:bg-accent"
            >
              Replay
            </button>
          </div>
        ))}
      </div>

      <p className="mt-3.5 text-[12.5px] leading-relaxed text-faint">
        Counts of a repeated action can be off by one. We show the timestamps so you
        can check us rather than take our word.
      </p>
    </PaperCard>
  );
}
