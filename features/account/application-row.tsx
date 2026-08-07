import Link from "next/link";
import { cn } from "@/utils/cn";
import type { UsageRow } from "@/types/account";

export function ApplicationRow({ row, last }: { row: UsageRow; last?: boolean }) {
  return (
    <Link
      href={`/cv/${row.id}`}
      className={cn(
        "grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))] items-center gap-4.5 px-5 py-4 transition-colors hover:bg-surface-sunk",
        !last && "border-b border-ink/10",
      )}
    >
      <span className="min-w-0">
        <span className="block text-[13.5px] leading-tight font-bold">{row.role}</span>
        <span className="mt-0.75 block text-xs text-faint">
          {row.company} · <span className="font-mono text-[11.5px]">{row.date}</span>
        </span>
      </span>

      <span className="text-[12.5px] leading-snug text-muted">{row.used}</span>

      <span className="flex min-w-29.5 items-baseline justify-end gap-2.25">
        <span className="text-[11.5px] font-semibold whitespace-nowrap text-faint">
          {row.fromLine}
        </span>
        <span className="font-serif text-2xl leading-none">{row.to}</span>
        <span className="text-sm text-faint" aria-hidden="true">
          ›
        </span>
      </span>
    </Link>
  );
}
