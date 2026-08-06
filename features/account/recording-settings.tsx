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

export function RecordingSettings({ settings, set }: Props) {
  return (
    <section className="mb-11.5">
      <SectionRule note="Yours only">Interviews and recordings</SectionRule>

      <div className="mb-3 overflow-hidden rounded-xl border-hair border-line bg-surface">
        <SettingRow
          title="Camera delivery analysis"
          description="Reads pauses and posture. Never a gaze or emotion score."
          toggle={{ on: settings.cameraAnalysis, onChange: set("cameraAnalysis") }}
        />
        <SettingRow
          title="Auto-delete after 30 days"
          description="Recordings go. Scores and transcripts stay."
          toggle={{ on: settings.autoDelete, onChange: set("autoDelete") }}
        />
        <SettingRow
          title="Delete every recording now"
          last
          action={
            <button
              type="button"
              className="shrink-0 rounded-pill border-hair border-ink px-4.25 py-2.25 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-on-ink"
            >
              Delete recordings
            </button>
          }
        />
      </div>

      <p className="text-[12.5px] leading-relaxed text-faint">
        Nothing here trains anything, and nothing is shown to an employer.
      </p>
    </section>
  );
}
