import { cn } from "@/utils/cn";
import { Chip } from "@/components/ui/chip";
import { VERDICT_ROW } from "@/constants/scoring";
import type { CoverageRow as Row } from "@/types/cv";

/** One requirement from the posting, with the CV line that earns it — or doesn't. */
export function CvCoverageRow({ row }: { row: Row }) {
  return (
    <li className={cn("rounded-lg border-hair px-4.5 py-4", VERDICT_ROW[row.kind])}>
      <div className="flex flex-wrap items-start justify-between gap-3.5">
        <div className="min-w-50 flex-1 text-sm leading-snug font-semibold">
          {row.requirement}
        </div>
        <Chip tone={row.kind}>{row.status}</Chip>
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{row.evidence}</p>
    </li>
  );
}
