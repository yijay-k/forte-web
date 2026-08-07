"use client";

import Link from "next/link";
import { useBilling } from "@/features/billing/use-billing";
import { READINESS } from "@/lib/data/progress";

/** Applications left, coaching left, readiness, and the buy button. */
export function EntitlementsCard() {
  const { appsLeft, appsTotal, sessionsLeft, openPay, appsUsed, usedPercent } =
    useBilling();

  return (
    <section className="mb-11.5 rounded-2xl border-hair border-ink bg-accent px-6 py-5.5 shadow-soft">
      <div className="flex flex-wrap items-end gap-8">
        <Counter
          label="Applications left"
          value={appsLeft}
          note={appsTotal > 1 ? `of ${appsTotal} bought` : "free application"}
        />
        <Counter label="Coaching sessions" value={sessionsLeft} note="20 min each" />

        <Link
          href="/progress"
          className="press rounded-14 border-hair border-ink bg-surface px-3.5 py-2.5 text-left shadow-hard-sm hover:shadow-hard-xs"
        >
          <div className="mb-1 text-[10.5px] font-extrabold tracking-[0.06em] text-faint uppercase">
            Readiness
          </div>
          <div className="flex items-baseline gap-1.75">
            <span className="font-serif text-[clamp(16.1px,4.33vw,26px)] leading-none font-medium">
              {READINESS.score}
            </span>
            <span className="text-[11.5px] font-bold text-good">
              {READINESS.delta}
            </span>
            <span className="ml-0.75 text-[11.5px] font-bold underline">
              See the curve
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={openPay}
          className="ml-auto shrink-0 rounded-pill border-hair border-ink bg-ink px-5.5 py-3 text-[13.5px] font-semibold whitespace-nowrap text-on-ink transition-transform duration-120 hover:translate-x-px hover:translate-y-px"
        >
          Buy applications
        </button>
      </div>

      <div className="mt-4.5">
        <div className="h-1.75 overflow-hidden rounded-pill bg-ink/16">
          <span
            className="block h-full rounded-pill bg-ink transition-[width] duration-400 ease-out"
            style={{ width: `${usedPercent}%` }}
          />
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <span className="text-[12.5px] leading-snug text-ink-soft">
            {appsLeft > 0
              ? "No expiry date. Use them whenever a posting is worth it."
              : "Your free one is spent. Everything you scored stays readable."}
          </span>
          <span className="font-mono text-[11.5px] font-medium whitespace-nowrap text-ink-soft">
            {appsUsed} / {appsTotal} used
          </span>
        </div>
      </div>
    </section>
  );
}

function Counter({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="min-w-30">
      <div className="mb-1.5 text-[10.5px] font-extrabold tracking-[0.06em] text-ink-soft uppercase">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-[clamp(23.6px,6.33vw,38px)] leading-none font-medium">{value}</span>
        <span className="text-[12.5px] font-semibold text-ink-soft">{note}</span>
      </div>
    </div>
  );
}
