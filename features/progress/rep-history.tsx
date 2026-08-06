import { getRepHistory } from "@/lib/data/progress";
import { RepHistoryRow } from "./rep-history-row";

export function RepHistory() {
  const entries = getRepHistory();

  return (
    <div className="rounded-3xl border-hair border-ink bg-surface px-6.5 py-2 shadow-soft">
      <div className="border-b border-ink/10 pt-5 pb-3.5 font-serif text-xl font-medium">
        Rep history
      </div>
      {entries.map((entry, i) => (
        <RepHistoryRow
          key={entry.id}
          entry={entry}
          last={i === entries.length - 1}
        />
      ))}
    </div>
  );
}
