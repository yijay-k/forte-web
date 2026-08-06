const RADIUS = 56;
const CIRCUMFERENCE = Math.round(2 * Math.PI * RADIUS);

type Props = {
  /** 0–100. */
  score: number;
  size?: number;
  /** `ink` is the inverted dial used on dark hero cards. */
  tone?: "paper" | "ink";
  /** Font size of the centred numeral. */
  numeralClassName?: string;
};

const TRACK = {
  paper: "#eeecdd",
  ink: "rgba(253,251,234,0.16)",
};

/** The donut — score out of 100, drawn as an arc. */
export function ScoreDial({
  score,
  size = 132,
  tone = "paper",
  numeralClassName = "text-[44px]",
}: Props) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = Math.round(CIRCUMFERENCE * (1 - clamped / 100));

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 132 132" aria-hidden="true">
        <circle
          cx="66"
          cy="66"
          r={RADIUS}
          fill="none"
          stroke={TRACK[tone]}
          strokeWidth="12"
        />
        <circle
          cx="66"
          cy="66"
          r={RADIUS}
          fill="none"
          stroke="var(--forte-accent)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 66 66)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`font-serif leading-none font-medium ${numeralClassName}`}>
          {clamped}
        </div>
        <div
          className={
            tone === "ink" ? "text-[11px] opacity-60" : "text-[11px] text-faint"
          }
        >
          / 100
        </div>
      </div>
    </div>
  );
}
