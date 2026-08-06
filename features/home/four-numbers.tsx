import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { RUBRIC_CAPTION } from "@/constants/scoring";
import { getCvReport } from "@/lib/data/cv-report";

const TAG_TONE = { good: "good", warn: "warn", faint: "faint" } as const;

/** The four rubric cards. Same numbers the report and the interview move. */
export function FourNumbers() {
  const { rubricCards } = getCvReport();

  return (
    <section className="mb-9">
      <SectionHeading
        className="mb-1.5"
        action={
          <Link href="/progress" className="text-[13px] font-semibold hover:text-muted">
            Full progress →
          </Link>
        }
      >
        Your four numbers
      </SectionHeading>
      <p className="mb-3.5 text-[13px] text-muted">{RUBRIC_CAPTION}</p>

      <div className="grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2">
        {rubricCards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            tag={card.tag}
            tagTone={TAG_TONE[card.tone]}
            focus={card.focus}
            spark={{ points: card.points, stroke: card.stroke }}
          />
        ))}
      </div>
    </section>
  );
}
