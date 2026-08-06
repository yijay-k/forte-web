import type { ReactNode } from "react";
import { AccountHeader } from "./account-header";
import { AccountTabs } from "./account-tabs";

/** Shared chrome for both account tabs — header, tab bar, and the page frame. */
export function AccountScreen({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[900px] px-14 pt-11 pb-21">
      <AccountHeader />
      <AccountTabs />
      {children}
    </div>
  );
}
