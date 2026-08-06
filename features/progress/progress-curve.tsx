import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";

const SERIES = [
  { label: "Substance", stroke: "#161513", points: "30,170 230,118 430,88 610,62", text: "" },
  { label: "Clarity", stroke: "#8b6fd6", points: "30,148 230,116 430,80 610,52", text: "text-muted" },
  { label: "Specificity", stroke: "#F6A64B", points: "30,172 230,174 430,166 610,158", text: "text-warn" },
];

const REP_LABELS = ["Rep 1", "Rep 2", "Rep 3", "Now"];

/** Three lines over three reps. Specificity is the flat one — that's the story. */
export function ProgressCurve() {
  return (
    <PaperCard radius="rounded-3xl" padding="px-7 py-6.5" className="mb-5">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-3">
        <CardTitle>The curve · out of 100</CardTitle>
        <div className="flex flex-wrap gap-4 text-xs font-semibold">
          {SERIES.map((s) => (
            <span key={s.label} className={`flex items-center gap-1.5 ${s.text}`}>
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
      <p className="mb-5 text-[13px] text-muted">
        Specificity is the flat line. It&rsquo;s why Revise exists.
      </p>

      <svg
        width="100%"
        height="210"
        viewBox="0 0 640 210"
        preserveAspectRatio="none"
        role="img"
        aria-label="Substance, clarity and specificity across three reps"
      >
        {[40, 100, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="640" y2={y} stroke="rgba(22,21,19,0.08)" strokeWidth="1" />
        ))}
        {SERIES.map((s) => (
          <polyline
            key={s.label}
            points={s.points}
            fill="none"
            stroke={s.stroke}
            strokeWidth="3"
          />
        ))}
        {SERIES.map((s) => {
          const [x, y] = s.points.split(" ").at(-1)!.split(",");
          return <circle key={s.label} cx={x} cy={y} r="5" fill={s.stroke} />;
        })}
      </svg>

      <div className="mt-2 flex justify-between px-5 text-xs text-faint">
        {REP_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </PaperCard>
  );
}
