"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/use-auth";
import { useBilling } from "@/features/billing/use-billing";
import { ACCOUNT_PROFILE } from "@/lib/data/account";
import { PLAN_LABEL } from "@/lib/data/plans";

/** Avatar, name, current pack, and the second logout affordance. */
export function AccountHeader() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { plan, reset } = useBilling();

  function handleSignOut() {
    reset();
    signOut();
    router.push("/cv");
  }

  return (
    <header className="mb-5.5 flex flex-wrap items-center gap-4">
      <div className="flex size-12.5 shrink-0 items-center justify-center rounded-pill bg-ink text-[17px] font-bold text-on-ink">
        {ACCOUNT_PROFILE.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="m-0 font-serif text-[clamp(18.6px,5vw,30px)] leading-[1.1] font-medium">
            {ACCOUNT_PROFILE.name}
          </h1>
          <span className="rounded-pill border-hair border-ink bg-sky px-2.5 py-0.75 text-[10.5px] font-extrabold tracking-[0.05em] uppercase">
            {PLAN_LABEL[plan]}
          </span>
        </div>
        <div className="mt-1 text-[13px] text-muted">
          {ACCOUNT_PROFILE.email} · {ACCOUNT_PROFILE.joined}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="shrink-0 rounded-pill border-hair border-line px-4.5 py-2.5 text-[13px] font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-on-ink"
      >
        Log out
      </button>
    </header>
  );
}
