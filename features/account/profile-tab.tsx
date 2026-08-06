"use client";

import { useBilling } from "@/features/billing/use-billing";
import { getSessions, getUsage } from "@/lib/data/account";
import { EntitlementsCard } from "./entitlements-card";
import { CvOnFile } from "./cv-on-file";
import { ApplicationsSection } from "./applications-section";
import { CoachingSection } from "./coaching-section";

/** What you have, what you've spent it on. */
export function ProfileTab() {
  const { plan } = useBilling();
  const usage = getUsage(plan);
  const sessions = getSessions(plan);

  return (
    <div>
      <EntitlementsCard />
      <CvOnFile usedCount={usage.length} hasVersionHistory={plan !== "free"} />
      <ApplicationsSection rows={usage} />
      <CoachingSection sessions={sessions} />
    </div>
  );
}
