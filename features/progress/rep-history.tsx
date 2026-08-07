import { IconListRow } from "@/components/ui/icon-list-row";
import { getRepHistory } from "@/lib/data/progress";

export function RepHistory() {
  const entries = getRepHistory();

  return (
    <div className="rounded-3xl border-hair border-ink bg-surface px-6.5 py-2 shadow-soft">
      <div className="border-b border-ink/10 pt-5 pb-3.5 font-serif text-xl font-medium">
        Rep history
      </div>
      {entries.map((entry, i) => (
        <IconListRow
          key={entry.id}
          title={entry.title}
          sub={entry.sub}
          tone={entry.accent ? "accent" : "sage"}
          last={i === entries.length - 1}
          trailing={
            <div className="font-serif text-[clamp(11.8px,3.17vw,19px)] font-medium">{entry.score}</div>
          }
        />
      ))}
    </div>
  );
}
