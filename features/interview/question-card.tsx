import { cn } from "@/utils/cn";

type Props = {
  prompt: string;
  source: string;
  /** Hidden once the follow-up fires — the probe has no separate source. */
  showSource: boolean;
  showProbeChip: boolean;
  size?: "video" | "voice";
};

/** The question itself. Serif, large, and the only thing competing for attention. */
export function QuestionCard({
  prompt,
  source,
  showSource,
  showProbeChip,
  size = "video",
}: Props) {
  return (
    <>
      {showProbeChip && (
        <div className="self-start rounded-pill border border-amber/50 bg-amber/16 px-3.5 py-1.5 text-xs font-bold text-amber">
          Follow-up · that answer was vague
        </div>
      )}

      <h2
        className={cn(
          "max-w-[900px] text-pretty font-serif font-normal tracking-[-0.015em] text-on-ink",
          size === "video" ? "text-[38px] leading-[1.22]" : "text-[40px] leading-[1.2]",
        )}
      >
        {prompt}
      </h2>

      {showSource && (
        <div
          className={cn(
            "border-l-2 pl-3 text-[12.5px] leading-relaxed",
            size === "video"
              ? "border-[#46443e] text-[#8d8c84]"
              : "border-[#3a3833] text-on-ink-dim",
          )}
        >
          {source}
        </div>
      )}
    </>
  );
}
