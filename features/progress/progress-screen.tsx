import { Chip } from "@/components/ui/chip";
import { ProgressHeadlineStats } from "./progress-headline-stats";
import { ProgressCurve } from "./progress-curve";
import { RepHistory } from "./rep-history";
import { FocusCard } from "./focus-card";

/** Reps, not streaks — nobody gets hired for logging in daily. */
export function ProgressScreen() {
  return (
    <div className="mx-auto max-w-[1000px] px-14 pt-11 pb-21">
      <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
        Progress
      </Chip>

      <h1 className="mt-0 mb-2.5 font-serif text-[46px] leading-[1.03] font-medium tracking-[-0.02em]">
        Three reps in.
      </h1>
      <p className="mb-7.5 max-w-[560px] text-base leading-relaxed text-muted">
        Reps, not streaks — nobody gets hired for logging in daily.
      </p>

      <ProgressHeadlineStats />
      <ProgressCurve />

      <div className="grid gap-5 [grid-template-columns:1.4fr_1fr] max-[900px]:grid-cols-1">
        <RepHistory />
        <FocusCard />
      </div>
    </div>
  );
}
