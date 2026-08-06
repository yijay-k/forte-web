import { cn } from "@/utils/cn";
import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import type { ScoreDelta } from "@/types/common";

/** The four numbers again, post-session, against the previous rep. */
export function FeedbackNumbers({ numbers }: { numbers: readonly ScoreDelta[] }) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <CardTitle className="mb-1.5">Your four numbers · this rep</CardTitle>
      <p className="mb-5 text-[13px] text-muted">Out of 100, versus your last rep.</p>

      <div className="grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2">
        {numbers.map((n) => {
          const focus = n.label === "Specificity";
          const logged = n.delta === "logged";

          return (
            <div
              key={n.label}
              className={cn(
                "rounded-lg border-hair border-ink px-4.5 py-4",
                focus ? "bg-surface-sunk shadow-amber-sm" : "bg-surface shadow-hard-sm",
              )}
            >
              <div
                className={cn(
                  "mb-1.75 text-[12.5px]",
                  focus ? "font-bold text-warn" : "font-semibold text-muted",
                )}
              >
                {n.label}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "font-serif text-[27px] font-medium",
                    focus ? "text-warn" : "text-ink",
                  )}
                >
                  {n.value}
                </span>
                <span
                  className={cn(
                    "text-[11px]",
                    logged ? "font-semibold text-faint" : "font-bold text-good",
                  )}
                >
                  {n.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </PaperCard>
  );
}
