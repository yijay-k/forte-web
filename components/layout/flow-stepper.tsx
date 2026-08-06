"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  FLOW_STEPS,
  FLOW_STEPPER_CAPTION,
  flowStepForPath,
} from "@/constants/navigation";

/** Four steps across the top of the flow. Hidden on screens outside the loop. */
export function FlowStepper() {
  const pathname = usePathname();
  const activeIndex = flowStepForPath(pathname);

  if (activeIndex === null) return null;

  return (
    <div className="mx-auto max-w-[940px] px-14 pt-8">
      <ol className="flex items-start">
        {FLOW_STEPS.map((label, i) => {
          const done = i < activeIndex;
          const current = i === activeIndex;
          const isLast = i === FLOW_STEPS.length - 1;

          return (
            <li
              key={label}
              className={cn("flex items-start", isLast ? "flex-none" : "flex-1")}
              aria-current={current ? "step" : undefined}
            >
              <div className="flex w-19 shrink-0 flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-8.5 items-center justify-center rounded-pill border-hair text-[13.5px] font-bold",
                    done && "border-ink bg-ink text-on-ink",
                    current && "border-ink bg-accent text-ink shadow-hard-xs",
                    !done && !current && "border-line bg-surface text-faint",
                  )}
                >
                  {done ? "✓" : i + 1}
                </div>
                <div
                  className={cn(
                    "text-xs whitespace-nowrap",
                    current ? "font-bold text-ink" : done ? "font-semibold text-ink" : "font-semibold text-faint",
                  )}
                >
                  {label}
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mt-4 h-[2.5px] flex-1 rounded-hair mx-2",
                    done ? "bg-ink" : "bg-[#d9d8cc]",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-3 text-center text-xs font-semibold text-faint">
        {FLOW_STEPPER_CAPTION}
      </div>
    </div>
  );
}
