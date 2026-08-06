import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { getCvReport } from "@/lib/data/cv-report";

/** Fixes 2 and 3. Gated — fix 1 is the free proof. */
export function CvRemainingFixes() {
  const { remainingFixes } = getCvReport();

  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <CardTitle className="mb-1.5">Two more fixes</CardTitle>
      <p className="mb-5 text-[13.5px] text-muted">
        You&rsquo;ve got the big one up top. These two take you to about 90.
      </p>

      <div className="grid gap-3">
        {remainingFixes.map((fix) => (
          <div
            key={fix.title}
            className="rounded-xl border-hair border-ink bg-surface-sunk px-5.5 py-5"
          >
            <div className="mb-2.25 flex flex-wrap items-center gap-2.5">
              <Chip tone={fix.tone}>{fix.points}</Chip>
              <span className="font-serif text-base font-semibold">{fix.title}</span>
            </div>
            <p className="text-sm leading-[1.55] text-muted">{fix.body}</p>
          </div>
        ))}
      </div>
    </PaperCard>
  );
}
