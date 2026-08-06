const RADIUS = 56;
const CIRCUMFERENCE = Math.round(2 * Math.PI * RADIUS);

type Props = {
  /** 0–100. */
  score: number;
  size?: number;
};

/** The donut on the CV report — score out of 100, drawn as an arc. */
export function ScoreDial({ score, size = 132 }: Props) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = Math.round(CIRCUMFERENCE * (1 - clamped / 100));

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 132 132" aria-hidden="true">
        <circle cx="66" cy="66" r={RADIUS} fill="none" stroke="#eeecdd" strokeWidth="12" />
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
        <div className="font-serif text-[44px] leading-none font-medium">{clamped}</div>
        <div className="text-[11px] text-faint">/ 100</div>
      </div>
    </div>
  );
}
