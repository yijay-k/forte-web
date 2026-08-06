import { cn } from "@/utils/cn";

type Props = {
  /** Hides the wordmark, leaving the three bars. */
  markOnly?: boolean;
  className?: string;
};

/** Three rising bars — quiet, loud, mid — beside the Newsreader wordmark. */
export function ForteMark({ markOnly, className }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.75", className)}>
      <span className="flex h-[23px] items-end gap-[3px]" aria-hidden="true">
        <span className="h-[11px] w-1 rounded-hair bg-current" />
        <span className="h-[22px] w-1 rounded-hair bg-current" />
        <span className="h-[15px] w-1 rounded-hair bg-current" />
      </span>
      {!markOnly && (
        <span className="font-serif text-[25px] font-medium tracking-[-0.01em]">
          Forte
        </span>
      )}
    </span>
  );
}
