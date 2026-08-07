import { Chip } from "@/components/ui/chip";
import { Sticker } from "@/components/ui/sticker";
import { getCvReport } from "@/lib/data/cv-report";
import { TARGET_COMPANY, TARGET_ROLE } from "@/lib/data/job-description";

/**
 * Free and always fully readable — the diagnosis plus the single highest-value
 * rewrite. Gating this would mean asking for a signup before proving anything.
 */
export function CvHeadlineFix() {
  const { diagnosis, headlineFix } = getCvReport();

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className="text-[13px] font-extrabold tracking-[0.04em] text-faint uppercase">
          {TARGET_ROLE} · {TARGET_COMPANY}
        </span>
        <Chip tone="good">free · no signup</Chip>
      </div>

      <div className="relative rounded-4xl border-hair border-ink bg-ink p-8.5 text-on-ink shadow-accent">
        <Sticker position="absolute -top-3.5 left-7">
          your #{headlineFix.rank} fix · {headlineFix.points}
        </Sticker>

        {/* The report's h1: the diagnosis is the headline of this page. */}
        <h1 className="mt-0 mb-5.5 max-w-[660px] text-pretty font-serif text-[clamp(19.8px,5.33vw,32px)] leading-[1.18] font-medium">
          {diagnosis.lead}{" "}
          <em className="text-accent italic">{diagnosis.emphasis1}</em>
          {diagnosis.middle}{" "}
          <em className="text-accent italic">{diagnosis.emphasis2}</em>
          {diagnosis.tail}
        </h1>

        <div className="rounded-lg border border-paper/16 bg-paper/6 px-5 py-4.5">
          <div className="text-sm leading-[1.55] text-on-ink-strong">
            <span className="font-bold text-amber">Before</span> · {headlineFix.before}
          </div>
          <div className="my-3 h-px bg-paper/14" />
          <div className="text-sm leading-[1.55] text-on-ink-strong">
            <span className="font-bold text-accent">After</span> · {headlineFix.after}
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-[1.55] text-on-ink-faint">
          {headlineFix.why}
        </p>
      </div>
    </section>
  );
}
