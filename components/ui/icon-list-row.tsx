import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  title: string;
  sub: string;
  /** Right-hand slot: a timestamp, a score, an action. */
  trailing: ReactNode;
  /** The rounded-square swatch. Accent marks an interview, sage a CV scoring. */
  tone?: "accent" | "sage";
  last?: boolean;
  className?: string;
};

/**
 * Swatch · title + sub · trailing. Shared by Home's recent activity and the
 * Progress rep history, which are the same recipe with a different right slot.
 */
export function IconListRow({
  title,
  sub,
  trailing,
  tone = "sage",
  last,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3.5 py-4",
        !last && "border-b border-ink/8",
        className,
      )}
    >
      <div
        className={cn(
          "size-8.5 shrink-0 rounded-[9px] border-hair border-ink",
          tone === "accent" ? "bg-accent" : "bg-sage",
        )}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-semibold">{title}</div>
        <div className="text-[13px] text-faint">{sub}</div>
      </div>
      {trailing}
    </div>
  );
}
