import { cn } from "@/utils/cn";

type Props = {
  /** 0–100. */
  percent: number;
  tone?: "ink" | "amber" | "accent";
  /** `on-ink` inverts the track for use inside a dark panel. */
  track?: "default" | "on-ink";
  height?: string;
  className?: string;
};

const TONE = {
  ink: "bg-ink",
  amber: "bg-amber",
  accent: "bg-accent",
};

export function ProgressBar({
  percent,
  tone = "ink",
  track = "default",
  height = "h-2.25",
  className,
}: Props) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-pill",
        height,
        track === "on-ink" ? "bg-on-ink/14" : "bg-track",
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-pill transition-[width] duration-700 ease-out", TONE[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
