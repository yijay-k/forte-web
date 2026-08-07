import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  /** The mono caption on the right, e.g. "Kept forever". */
  note?: string;
  className?: string;
};

/** Serif heading, a hairline rule, and a mono caption. The Account screen's spine. */
export function SectionRule({ children, note, className }: Props) {
  return (
    <div className={cn("mb-3.75 flex items-baseline gap-3.5", className)}>
      <h3 className="m-0 font-serif text-[clamp(13.6px,3.67vw,22px)] font-medium whitespace-nowrap">
        {children}
      </h3>
      <span className="h-px flex-1 bg-ink/16" aria-hidden="true" />
      {note && (
        <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap text-faint uppercase">
          {note}
        </span>
      )}
    </div>
  );
}
