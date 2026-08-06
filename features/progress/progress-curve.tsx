import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { PROGRESS_CURVE } from "@/lib/data/progress";

/** Three lines over three reps. Specificity is the flat one — that's the story. */
export function ProgressCurve() {
  const { series, repLabels, caption } = PROGRESS_CURVE;

  return (
    <PaperCard radius="rounded-3xl" padding="px-7 py-6.5" className="mb-5">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-3">
        <CardTitle>The curve · out of 100</CardTitle>
        <div className="flex flex-wrap gap-4 text-xs font-semibold">
          {series.map((s) => (
            <span key={s.label} className={`flex items-center gap-1.5 ${s.textClass}`}>
              <span
                className="h-[3px] w-4 rounded-hair"
                style={{ background: s.stroke }}
                aria-hidden="true"
              />
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <p className="mb-5 text-[13px] text-muted">{caption}</p>

      <svg
        width="100%"
        height="210"
        viewBox="0 0 640 210"
        preserveAspectRatio="none"
        role="img"
        aria-label="Substance, clarity and specificity across three reps"
      >
        {[40, 100, 160].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="640"
            y2={y}
            stroke="rgba(22,21,19,0.08)"
            strokeWidth="1"
          />
        ))}
        {series.map((s) => (
          <polyline
            key={s.label}
            points={s.points}
            fill="none"
            stroke={s.stroke}
            strokeWidth="3"
          />
        ))}
        {series.map((s) => {
          const [x, y] = s.points.split(" ").at(-1)!.split(",");
          return <circle key={s.label} cx={x} cy={y} r="5" fill={s.stroke} />;
        })}
      </svg>

      <div className="mt-2 flex justify-between px-5 text-xs text-faint">
        {repLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </PaperCard>
  );
}
