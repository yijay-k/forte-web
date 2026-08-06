import { SectionRule } from "@/components/ui/section-rule";
import type { UsageRow } from "@/types/account";
import { ApplicationRow } from "./application-row";

/** Every application ever spent. Kept forever, paid or not. */
export function ApplicationsSection({ rows }: { rows: readonly UsageRow[] }) {
  return (
    <section className="mb-11.5">
      <SectionRule note="Kept forever">Applications</SectionRule>

      <div className="overflow-hidden rounded-xl border-hair border-ink bg-surface">
        {rows.map((row, i) => (
          <ApplicationRow key={row.id} row={row} last={i === rows.length - 1} />
        ))}
      </div>
    </section>
  );
}
