import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { getCvReport } from "@/lib/data/cv-report";
import { CvCoverageRow } from "./cv-coverage-row";

/** Coverage against the posting. Gated. */
export function CvCoverageMatrix() {
  const { coverage, coveredCount } = getCvReport();

  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
        <CardTitle>Against their requirements</CardTitle>
        <Chip tone="amber" tilt>
          {coveredCount} of {coverage.length} covered
        </Chip>
      </div>
      <p className="mb-5 text-[13.5px] text-muted">
        Pulled from the posting you pasted. Every &ldquo;covered&rdquo; points at the
        line that earns it.
      </p>

      <ul className="flex flex-col gap-2.5">
        {coverage.map((row) => (
          <CvCoverageRow key={row.requirement} row={row} />
        ))}
      </ul>
    </PaperCard>
  );
}
