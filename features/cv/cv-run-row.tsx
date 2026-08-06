import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import type { CvRun } from "@/types/cv";

export function CvRunRow({ run, last }: { run: CvRun; last?: boolean }) {
  return (
    <Link
      href={`/cv/${run.id}`}
      className={`flex w-full items-center gap-4 px-1 py-4 text-left transition-colors hover:bg-ink/3 ${
        last ? "" : "border-b border-ink/7"
      }`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] border-hair border-ink bg-sage">
        <span className="h-[15px] w-3 rounded-hair border-2 border-ink" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-semibold">{run.title}</span>
        <span className="block text-[12.5px] text-faint">
          {run.file} · {run.when}
        </span>
      </span>
      <Chip tone={run.kind}>{run.cover}</Chip>
      <span className="w-11.5 text-right font-serif text-[25px] font-medium">
        {run.score}
      </span>
      <span className="text-base text-faint" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
