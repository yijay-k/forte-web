"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { SectionRule } from "@/components/ui/section-rule";
import { useAuth } from "@/features/auth/use-auth";
import { useBilling } from "@/features/billing/use-billing";

/** Export, and the two-step account deletion. */
export function DataSection() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { reset } = useBilling();
  const [confirming, setConfirming] = useState(false);

  function onDanger() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setConfirming(false);
    reset();
    signOut();
    router.push("/cv");
  }

  return (
    <section>
      <SectionRule note="Export or erase">Your data</SectionRule>

      <div className="mb-2.75 flex items-center gap-4 rounded-xl border-hair border-line bg-surface px-5 py-3.75">
        <p className="min-w-0 flex-1 text-[13.5px] leading-snug">
          Download everything — CVs, scores, transcripts, rewrites, as one file.
        </p>
        <button
          type="button"
          className="shrink-0 rounded-pill border-hair border-ink px-4.25 py-2.25 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-on-ink"
        >
          Download
        </button>
      </div>

      <div className="flex items-center gap-3.5 rounded-xl border-hair border-dashed border-danger-line px-5 py-4">
        <p className="min-w-0 flex-1 text-[13.5px] leading-snug text-muted">
          {confirming
            ? "This erases your CVs, scores, transcripts and rewrites. Unused applications are refunded. It cannot be undone."
            : "Close the account and erase all of it. Unused applications are refunded."}
        </p>

        {confirming && (
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="shrink-0 rounded-pill border-hair border-line px-4 py-2.25 text-[13px] font-semibold transition-colors hover:border-ink"
          >
            Keep it
          </button>
        )}

        <button
          type="button"
          onClick={onDanger}
          className={cn(
            "shrink-0 rounded-pill border-hair border-danger px-4.25 py-2.25 text-[13px] font-semibold whitespace-nowrap transition-colors",
            confirming ? "bg-danger text-on-ink" : "bg-transparent text-danger",
          )}
        >
          {confirming ? "Yes, erase everything" : "Delete account"}
        </button>
      </div>
    </section>
  );
}
