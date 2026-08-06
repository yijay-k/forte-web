"use client";

import { useCallback, useState } from "react";
import { DEFAULT_ACCOUNT_SETTINGS, type AccountSettings } from "@/types/account";

/**
 * The settings toggles. Local to the Settings tab — nothing else in the app
 * reads them yet, so they do not belong in a provider.
 */
export function useAccountSettings() {
  const [settings, setSettings] = useState<AccountSettings>(DEFAULT_ACCOUNT_SETTINGS);

  const set = useCallback(
    <K extends keyof AccountSettings>(key: K) =>
      (value: AccountSettings[K]) =>
        setSettings((current) => ({ ...current, [key]: value })),
    [],
  );

  return { settings, set };
}
