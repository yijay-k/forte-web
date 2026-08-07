"use client";

import { SectionRule } from "@/components/ui/section-rule";
import { useBilling } from "@/features/billing/use-billing";
import { getReceipts, receiptTotal } from "@/lib/data/account";
import { SavedCard } from "./saved-card";

const GRID = "grid gap-5.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,292px),1fr))] items-start mb-11.5";

/** Card on file and receipts. Nothing renews, so there is no subscription UI. */
export function PaymentSection() {
  const { plan, openPay } = useBilling();
  const receipts = getReceipts(plan);

  if (receipts.length === 0) {
    return (
      <section>
        <SectionRule note="Nothing renews">Payment</SectionRule>
        <div className={GRID}>
          <SavedCard empty />
          <div className="rounded-xl border-hair border-line bg-surface p-5">
            <div className="mb-2.5 font-mono text-[10.5px] font-medium tracking-[0.09em] text-faint uppercase">
              Receipts
            </div>
            <p className="mb-4 text-[13.5px] leading-[1.55] text-muted">
              Nothing charged yet, and your free application never will be. Link,
              Apple Pay or a card at checkout, whenever you buy.
            </p>
            <button
              type="button"
              onClick={openPay}
              className="rounded-pill border-hair border-ink px-4.25 py-2.25 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-on-ink"
            >
              See packs
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionRule note="Nothing renews">Payment</SectionRule>
      <div className={GRID}>
        <SavedCard />

        <div className="overflow-hidden rounded-xl border-hair border-ink bg-surface">
          <div className="flex items-baseline justify-between gap-3 border-b-hair border-ink bg-surface-alt px-4.5 py-3.25">
            <span className="font-mono text-[10.5px] font-medium tracking-[0.09em] text-muted uppercase">
              Receipts
            </span>
            <span className="font-mono text-[11.5px] font-medium text-muted">
              Paid {receiptTotal(receipts)}
            </span>
          </div>

          {receipts.map((receipt, i) => (
            <div
              key={receipt.id}
              className={`flex items-center gap-3.5 px-4.5 py-3.5 ${
                i === receipts.length - 1 ? "" : "border-b border-ink/8"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] leading-snug font-semibold">
                  {receipt.what}
                </div>
                <div className="mt-0.75 font-mono text-[11.5px] text-faint">
                  {receipt.date}
                </div>
              </div>
              <div className="shrink-0 font-mono text-[13.5px] font-medium">
                {receipt.amount}
              </div>
              <button
                type="button"
                className="shrink-0 text-[12.5px] font-bold underline"
              >
                Receipt
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
