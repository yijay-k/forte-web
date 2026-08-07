import { PROGRESS_STATS } from "@/lib/data/progress";

/** Three headline numbers across the top of the progress screen. */
export function ProgressHeadlineStats() {
  return (
    <div className="mb-5 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))]">
      {PROGRESS_STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[clamp(12.4px,3.33vw,20px)] border-hair border-ink bg-surface px-6 py-5.5 shadow-hard"
        >
          <div className="mb-2 text-[13px] font-bold text-faint">{stat.label}</div>
          <div className="font-serif text-[clamp(27px,4.2vw,40px)] leading-none font-medium">
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
