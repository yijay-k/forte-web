import { cn } from "@/utils/cn";
import type { RepEntry } from "@/types/progress";

export function RepHistoryRow({ entry, last }: { entry: RepEntry; last?: boolean }) {
  return (
    <div
      className={cn("flex items-center gap-3.5 py-4", !last && "border-b border-ink/7")}
    >
      <div
        className={cn(
          "size-8.5 shrink-0 rounded-[9px] border-hair border-ink",
          entry.accent ? "bg-accent" : "bg-sage",
        )}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{entry.title}</div>
        <div className="text-[12.5px] text-faint">{entry.sub}</div>
      </div>
      <div className="font-serif text-[19px] font-medium">{entry.score}</div>
    </div>
  );
}
