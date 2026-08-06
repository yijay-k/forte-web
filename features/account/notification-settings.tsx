"use client";

import { SectionRule } from "@/components/ui/section-rule";
import { SettingRow } from "@/components/ui/setting-row";
import type { AccountSettings } from "@/types/account";

type Props = {
  settings: AccountSettings;
  set: <K extends keyof AccountSettings>(
    key: K,
  ) => (value: AccountSettings[K]) => void;
};

export function NotificationSettings({ settings, set }: Props) {
  return (
    <section className="mb-11.5">
      <SectionRule note="Email only">Notifications</SectionRule>

      <div className="overflow-hidden rounded-xl border-hair border-line bg-surface">
        <SettingRow
          title="Scoring finished"
          description="When a CV is done being scored"
          toggle={{ on: settings.scoreDone, onChange: set("scoreDone") }}
        />
        <SettingRow
          title="Interview graded"
          description="When a mock interview has its grading ready"
          toggle={{ on: settings.interviewGraded, onChange: set("interviewGraded") }}
        />
        <SettingRow
          title="Weekly readiness note"
          description="One email a week with your curve"
          toggle={{ on: settings.weeklyDigest, onChange: set("weeklyDigest") }}
          last
        />
      </div>
    </section>
  );
}
