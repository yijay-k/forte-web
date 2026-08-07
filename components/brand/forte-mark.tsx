import { cn } from "@/utils/cn";

type Props = {
  /** Hides the wordmark, leaving the three bars. */
  markOnly?: boolean;
  /** `sm` is the mobile top bar; `md` is the sidebar. */
  size?: "sm" | "md";
  className?: string;
};

/** The bars are drawn, not scaled — at 19px a scaled 23px mark blurs its edges. */
const SIZE = {
  sm: {
    row: "gap-2.25",
    bars: "h-[19px] gap-[3px]",
    heights: ["h-[9px]", "h-[18px]", "h-[13px]"],
    width: "w-[3.5px]",
    word: "text-[clamp(13px,3.5vw,21px)]",
  },
  md: {
    row: "gap-2.75",
    bars: "h-[23px] gap-[3px]",
    heights: ["h-[11px]", "h-[22px]", "h-[15px]"],
    width: "w-1",
    word: "text-[clamp(15.5px,4.17vw,25px)]",
  },
};

/** Three rising bars — quiet, loud, mid — beside the Newsreader wordmark. */
export function ForteMark({ markOnly, size = "md", className }: Props) {
  const s = SIZE[size];

  return (
    <span className={cn("inline-flex items-center", s.row, className)}>
      <span className={cn("flex items-end", s.bars)} aria-hidden="true">
        {s.heights.map((h) => (
          <span key={h} className={cn("rounded-hair bg-current", h, s.width)} />
        ))}
      </span>
      {!markOnly && (
        <span className={cn("font-serif font-medium tracking-[-0.01em]", s.word)}>
          Forte
        </span>
      )}
    </span>
  );
}
