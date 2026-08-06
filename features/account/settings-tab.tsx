"use client";

import { SignInSection } from "./sign-in-section";
import { NotificationSettings } from "./notification-settings";
import { RecordingSettings } from "./recording-settings";
import { PaymentSection } from "./payment-section";
import { DataSection } from "./data-section";
import { useAccountSettings } from "./use-account-settings";

export function SettingsTab() {
  const { settings, set } = useAccountSettings();

  return (
    <div>
      <SignInSection />
      <NotificationSettings settings={settings} set={set} />
      <RecordingSettings settings={settings} set={set} />
      <PaymentSection />
      <DataSection />
    </div>
  );
}
