import { EntitledLink } from "@/features/billing/entitled-link";
import { RESCORE_DELTAS } from "@/lib/data/claims";
import { CURRENT_REP } from "@/lib/data/progress";

/** Shown once the CV is re-scored — the loop closing, and the next rep opening. */
export function RescoreResult() {
  return (
    <div className="mt-5 rounded-4xl border-hair border-ink bg-ink p-8 text-on-ink shadow-accent">
      <div className="mb-3 text-[11.5px] font-extrabold tracking-[0.08em] text-accent uppercase">
        Rep {CURRENT_REP} closed · rep {CURRENT_REP + 1} open
      </div>
      <div className="mb-5 font-serif text-[30px] leading-[1.18] font-medium">
        Specificity 66 → 84. Overall 82 → 91.
      </div>

      <div className="mb-5.5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
        {RESCORE_DELTAS.map((delta) => (
          <div
            key={delta.label}
            className="rounded-14 border border-paper/16 bg-paper/6 px-4 py-3.5"
          >
            <div className="mb-1.5 text-xs font-semibold text-on-ink-faint">
              {delta.label}
            </div>
            <div className="flex items-baseline gap-1.75">
              <span className="font-serif text-2xl font-medium">{delta.value}</span>
              <span className="text-xs font-bold text-[#9fd6a8]">{delta.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mb-5.5 max-w-[560px] text-sm leading-relaxed text-on-ink-muted">
        The rewrite is on your CV now. Run the same five questions again — the only
        honest test of whether the fix stuck.
      </p>

      <EntitledLink
        href="/interview"
        className="inline-block rounded-pill border-hair border-accent bg-accent px-7.5 py-3.75 text-[15px] font-semibold text-ink"
      >
        Re-run the same interview →
      </EntitledLink>
    </div>
  );
}
