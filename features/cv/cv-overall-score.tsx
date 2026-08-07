import { PaperCard } from "@/components/ui/paper-card";
import { ScoreDial } from "@/components/ui/score-dial";
import { getCvReport } from "@/lib/data/cv-report";

/**
 * Free. The arithmetic is shown deliberately — a score you can't reproduce is
 * a score you can't argue with.
 */
export function CvOverallScore() {
  const { overall, verdict, arithmetic } = getCvReport();

  return (
    <PaperCard
      radius="rounded-3xl"
      padding="p-7.5"
      className="flex flex-wrap items-center gap-8"
    >
      <ScoreDial score={overall} />

      <div className="min-w-65 flex-1">
        <div className="mb-2 text-[12.5px] font-extrabold tracking-[0.06em] text-faint uppercase">
          Overall score
        </div>
        <div className="mb-3 font-serif text-[clamp(16.1px,4.33vw,26px)] leading-tight font-medium">
          {verdict}
        </div>
        <p className="rounded-md border border-ink/14 bg-surface-sunk px-3.5 py-3 text-[13.5px] leading-relaxed text-muted">
          <strong>How this is calculated:</strong> {arithmetic}. Confidence
          isn&rsquo;t in the maths — it&rsquo;s logged, never weighted.
        </p>
      </div>
    </PaperCard>
  );
}
