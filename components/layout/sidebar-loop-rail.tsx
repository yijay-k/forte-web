import { cn } from "@/utils/cn";
import { getLoopSteps } from "@/lib/data/progress";

/** The dotted "the loop · rep N" rail in the sidebar. */
export function SidebarLoopRail({ rep }: { rep: number }) {
  const steps = getLoopSteps();

  return (
    <>
      <div className="mt-6.5 px-2 pb-3 text-[11px] font-extrabold tracking-[0.1em] text-faint uppercase">
        The loop · rep {rep}
      </div>
      <div className="relative px-2.5">
        <div
          className="absolute top-3.5 bottom-3.5 left-[15px] w-0.5 bg-dash-rail"
          aria-hidden="true"
        />
        <ol className="relative z-1">
          {steps.map((step) => (
            <li key={step.label} className="flex items-start gap-3.25 py-1.25">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-pill text-[10px] font-bold",
                  step.done
                    ? "bg-ink text-on-ink"
                    : "border-hair border-ink bg-accent text-ink",
                )}
              >
                {step.done ? "✓" : steps.indexOf(step) + 1}
              </span>
              <span
                className={cn(
                  "pt-px text-[13.5px]",
                  step.current ? "font-bold" : "font-semibold",
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
