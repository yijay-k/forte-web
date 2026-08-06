import { cn } from "@/utils/cn";

type Props = {
  /** `card` is the larger rounded-square used on the saved card itself. */
  variant?: "chip" | "card";
  className?: string;
};

/** The green payment glyph — a tick rendered as a single rotated bar. */
export function PayMark({ variant = "chip", className }: Props) {
  const isCard = variant === "card";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center bg-pay",
        isCard
          ? "size-6.5 rounded-sm"
          : "h-4.5 w-6.5 rounded-[5px] border-hair border-ink",
        className,
      )}
    >
      <span
        className={cn(
          "block h-[2.5px] rotate-[-45deg] rounded-hair bg-surface",
          isCard ? "w-2.5" : "w-2.25",
        )}
      />
    </span>
  );
}
