import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/utils/cn";
import { ANNOTATION_HIGHLIGHT, ANNOTATION_TAG } from "@/constants/scoring";
import { getCvReport } from "@/lib/data/cv-report";
import type { MarkedUpLine } from "@/types/cv";

/** The CV rendered with inline annotations. Gated. */
export function CvMarkedUp() {
  const { markedUp } = getCvReport();

  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
        <CardTitle>Your CV, marked up</CardTitle>
        <Chip tone="amber" tilt>
          {markedUp.issueCount} issues
        </Chip>
      </div>
      <p className="mb-4 text-[13.5px] text-muted">
        Highlighted where a recruiter&rsquo;s eyes glaze over. Each maps to a fix.
      </p>

      <div className="mb-5 flex flex-wrap gap-4 text-[12.5px] font-semibold">
        <Legend swatch="bg-amber/40 border-b-2 border-amber">
          Activity, no measurable outcome
        </Legend>
        <Legend swatch="bg-[rgba(196,174,245,0.5)] border-b-2 border-[#8b6fd6]">
          Skills list where a summary should be
        </Legend>
      </div>

      <article className="rounded-14 border-hair border-ink/16 bg-white px-9 py-8 text-[13.5px] leading-[1.65] text-[#2a2822] shadow-lift">
        <header className="mb-4 border-b-[1.5px] border-ink/14 pb-3.5">
          <div className="font-serif text-[clamp(16.1px,4.33vw,26px)] font-semibold tracking-[-0.01em]">
            {markedUp.name}
          </div>
          <div className="mt-0.75 text-[12.5px] text-muted">{markedUp.contact}</div>
        </header>

        <SectionLabel>Summary</SectionLabel>
        <p className="mt-0 mb-5">
          <Annotated line={markedUp.summary} />
        </p>

        <SectionLabel>Experience</SectionLabel>
        {markedUp.roles.map((role) => (
          <div key={role.title} className="mb-4 last:mb-0">
            <div className="text-sm font-bold">
              {role.title}{" "}
              <span className="text-[12.5px] font-medium text-faint">
                · {role.dates}
              </span>
            </div>
            <ul className="mt-2 mb-0 flex list-disc flex-col gap-1.75 pl-5">
              {role.bullets.map((line) => (
                <li key={line.text}>
                  <Annotated line={line} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </article>
    </PaperCard>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 text-[11px] font-bold tracking-[0.1em] text-faint uppercase">
      {children}
    </div>
  );
}

function Legend({ swatch, children }: { swatch: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("h-3 w-4 rounded-xs", swatch)} aria-hidden="true" />
      {children}
    </span>
  );
}

/** A CV line, highlighted and tagged when it carries an issue. */
function Annotated({ line }: { line: MarkedUpLine }) {
  if (line.kind === "neutral" || line.kind === "ok") return <>{line.text}</>;

  return (
    <>
      <span className={ANNOTATION_HIGHLIGHT[line.kind]}>{line.text}</span>{" "}
      <span
        className={cn(
          "inline-block rounded-pill border px-1.75 py-px align-middle text-[10px] font-bold",
          ANNOTATION_TAG[line.kind],
        )}
      >
        {line.note}
      </span>
    </>
  );
}
