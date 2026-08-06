import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  /** Rendered on the right of the same baseline — a link or a note. */
  action?: ReactNode;
  className?: string;
};

/** The uppercase, letterspaced eyebrow that labels every section. */
export function SectionHeading({ children, action, className }: Props) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", className)}>
      <div className="text-[11.5px] font-extrabold tracking-[0.1em] text-faint uppercase">
        {children}
      </div>
      {action}
    </div>
  );
}

/** The serif card title used inside PaperCards. */
export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("font-serif text-xl font-medium", className)}>{children}</div>
  );
}
