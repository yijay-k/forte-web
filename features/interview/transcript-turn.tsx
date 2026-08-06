import { cn } from "@/utils/cn";
import type { Turn } from "./use-transcript";

/** One caption line. The newest turn is bright; earlier ones fade back. */
export function TranscriptTurn({ turn }: { turn: Turn }) {
  return (
    <div className="flex items-start gap-2.75">
      <span
        className={cn(
          "w-13 shrink-0 pt-0.5 text-[11px] font-extrabold tracking-[0.04em] uppercase",
          turn.mine ? "text-[#8d8c84]" : "text-accent",
        )}
      >
        {turn.who}
      </span>
      <span
        className={cn(
          "text-[15px] leading-relaxed transition-colors duration-400",
          turn.pause
            ? "text-[#5e5d56] italic"
            : turn.latest
              ? "text-on-ink"
              : "text-[#8a897f]",
          !turn.mine && !turn.pause && "italic",
        )}
      >
        {turn.text}
      </span>
    </div>
  );
}
