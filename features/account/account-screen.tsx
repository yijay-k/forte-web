import type { ReactNode } from "react";
import { AccountHeader } from "./account-header";
import { AccountTabs } from "./account-tabs";

/** Shared chrome for both account tabs — header, tab bar, and the page frame. */
export function AccountScreen({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[900px] px-[clamp(16px,4.5vw,56px)] pt-[clamp(24px,4.5vw,44px)] pb-21">
      <AccountHeader />
      <AccountTabs />
      {children}
    </div>
  );
}
