"use client";

import { usePathname } from "next/navigation";
import { PillButton } from "@/components/ui/pill-button";
import { isCvReportPath } from "@/constants/navigation";
import { getCvReport } from "@/lib/data/cv-report";
import { useAuth } from "./use-auth";

/**
 * Takes over once the wall has been dismissed. The modal only ever fires once;
 * after that the ask stays visible but stops interrupting.
 *
 * Scoped to the report route: everywhere else there is nothing behind the
 * blur yet, so the bar would be asking for a signup against nothing.
 */
export function UnlockStickyBar() {
  const { authed, wallSeen, wallOpen, openWall } = useAuth();
  const pathname = usePathname();

  if (authed || !wallSeen || wallOpen || !isCvReportPath(pathname)) return null;

  return (
    <div className="sticky right-0 bottom-0 left-0 z-40 flex flex-wrap items-center justify-between gap-5 border-t-hair border-ink bg-ink px-10 py-4 shadow-bar">
      <div className="text-[14.5px] leading-snug text-on-ink">
        <strong>Your score is {getCvReport().overall}.</strong>{" "}
        <span className="text-on-ink-muted">Two more fixes take it to ~90.</span>
      </div>
      <PillButton variant="accent" size="lg" onClick={openWall}>
        Unlock the rest — free
      </PillButton>
    </div>
  );
}
