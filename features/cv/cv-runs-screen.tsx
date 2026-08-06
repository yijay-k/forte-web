import { Chip } from "@/components/ui/chip";
import { EntitledLink } from "@/features/billing/entitled-link";
import { getCvRuns } from "@/lib/data/cv-runs";
import { CvRunRow } from "./cv-run-row";

/** The saved evaluations list — one score per posting, never a single verdict. */
export function CvRunsScreen() {
  const runs = getCvRuns();

  return (
    <div className="mx-auto max-w-[940px] px-14 pt-11 pb-21">
      <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
        CV Evaluator
      </Chip>

      <div className="mb-6.5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mt-0 mb-2 font-serif text-[46px] leading-[1.03] font-medium tracking-[-0.02em]">
            One CV, scored per <em className="italic">posting</em>.
          </h1>
          <p className="m-0 max-w-[500px] text-[15.5px] leading-relaxed text-muted">
            A CV isn&rsquo;t good or bad in the abstract — it&rsquo;s good for one job.
            Every posting you paste gets its own score and its own coverage.
          </p>
        </div>
        <EntitledLink
          href="/cv/new"
          className="press inline-flex items-center gap-2.25 rounded-pill border-hair border-ink bg-accent px-7 py-3.75 text-[15px] font-semibold shadow-hard-md hover:shadow-hard-xs"
        >
          + New posting
        </EntitledLink>
      </div>

      <div className="rounded-3xl border-hair border-ink bg-surface px-6.5 py-2 shadow-soft">
        <div className="border-b border-ink/10 pt-5 pb-3.5 font-serif text-xl font-medium">
          Applications
        </div>
        {runs.map((run, i) => (
          <CvRunRow key={run.id} run={run} last={i === runs.length - 1} />
        ))}
      </div>
    </div>
  );
}
