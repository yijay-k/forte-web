import { getRecentActivity } from "@/lib/data/progress";
import { ActivityRow } from "./activity-row";

export function RecentActivity() {
  const rows = getRecentActivity();

  return (
    <section>
      <div className="mb-1.5 flex items-baseline justify-between gap-4">
        <h2 className="m-0 font-serif text-[22px] font-medium">Recent activity</h2>
        <span className="text-[13px] font-semibold text-faint">Last 7 days</span>
      </div>
      <div className="rounded-2xl border-hair border-ink bg-surface px-6 py-1.5 shadow-soft-sm">
        {rows.map((row, i) => (
          <ActivityRow key={row.title} {...row} last={i === rows.length - 1} />
        ))}
      </div>
    </section>
  );
}
