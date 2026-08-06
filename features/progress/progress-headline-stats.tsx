import { READINESS } from "@/lib/data/progress";

const STATS = [
  {
    label: "Readiness",
    value: READINESS.score,
    delta: READINESS.delta,
    note: "Lowest of the three scored numbers",
  },
  {
    label: "Interview overall",
    value: "67",
    delta: "+5",
    note: "Mean of substance, clarity, specificity",
  },
  {
    label: "Claims defended",
    value: "5 / 8",
    delta: null,
    note: "3 still flagged for revision",
  },
];

/** Three headline numbers across the top of the progress screen. */
export function ProgressHeadlineStats() {
  return (
    <div className="mb-5 grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[20px] border-hair border-ink bg-surface px-6 py-5.5 shadow-hard"
        >
          <div className="mb-2 text-[13px] font-bold text-faint">{stat.label}</div>
          <div className="font-serif text-[40px] leading-none font-medium">
            {stat.value}
            {stat.delta && (
              <span className="ml-1 font-sans text-sm font-semibold text-good">
                {stat.delta}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-xs leading-snug text-faint">{stat.note}</div>
        </div>
      ))}
    </div>
  );
}
