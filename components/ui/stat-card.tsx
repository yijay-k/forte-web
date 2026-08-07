import { cn } from "@/utils/cn";
import { Sparkline } from "./sparkline";

type Props = {
  label: string;
  /** Rendered in Newsreader — every numeral in this app is serif. */
  value: string;
  /** `"+6"`, `"flat"`, `"logged"`. */
  tag: string;
  tagTone?: "good" | "warn" | "faint";
  /** The metric currently dragging the score. Gets an amber shadow. */
  focus?: boolean;
  spark?: { points: string; stroke: string };
  className?: string;
};

const TAG_TONE = {
  good: "text-good",
  warn: "text-warn",
  faint: "text-faint font-semibold",
};

/** One of "the four numbers". Same card on Home and in the interview report. */
export function StatCard({
  label,
  value,
  tag,
  tagTone = "good",
  focus,
  spark,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "border-hair border-ink rounded-lg px-4 py-3.5",
        focus ? "bg-surface-sunk shadow-amber-sm" : "bg-surface shadow-hard-sm",
        className,
      )}
    >
      <div
        className={cn(
          "mb-1.25 text-xs",
          focus ? "font-bold text-warn" : "font-semibold text-muted",
        )}
      >
        {label}
      </div>
      <div className="mb-2 flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-serif text-[clamp(15.5px,4.17vw,25px)] font-medium",
            focus ? "text-warn" : "text-ink",
          )}
        >
          {value}
        </span>
        <span className={cn("text-[11px] font-bold", TAG_TONE[tagTone])}>{tag}</span>
      </div>
      {spark && <Sparkline points={spark.points} stroke={spark.stroke} />}
    </div>
  );
}
