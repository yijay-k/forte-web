import { IconListRow } from "@/components/ui/icon-list-row";
import { getRecentActivity } from "@/lib/data/progress";

export function RecentActivity() {
  const rows = getRecentActivity();

  return (
    <section>
      <div className="mb-1.5 flex items-baseline justify-between gap-4">
        <h2 className="m-0 font-serif text-[clamp(13.6px,3.67vw,22px)] font-medium">Recent activity</h2>
        <span className="text-[13px] font-semibold text-faint">Last 7 days</span>
      </div>
      <div className="rounded-2xl border-hair border-ink bg-surface px-6 py-1.5 shadow-soft-sm">
        {rows.map((row, i) => (
          <IconListRow
            key={row.title}
            title={row.title}
            sub={row.sub}
            tone={row.accent ? "accent" : "sage"}
            last={i === rows.length - 1}
            trailing={
              <div className="text-[13px] whitespace-nowrap text-faint">{row.when}</div>
            }
          />
        ))}
      </div>
    </section>
  );
}
