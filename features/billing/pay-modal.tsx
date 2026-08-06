"use client";

import { Modal } from "@/components/ui/modal";
import { FREE_TIER, getPacks, PAYMENT_METHODS } from "@/lib/data/plans";
import { PayMark } from "./pay-mark";
import { PackCard, FreeTierCard } from "./pack-card";
import { useBilling } from "./use-billing";

/**
 * The plans modal. Copy shifts depending on whether the user still has
 * applications: a top-up reads differently from hitting the free limit.
 */
export function PayModal() {
  const { payOpen, dismissPay, buy, appsLeft, appsTotal } = useBilling();
  const hasApps = appsLeft > 0;

  return (
    <Modal
      open={payOpen}
      onClose={dismissPay}
      label="Buy applications"
      size="wide"
      onCloseButton={dismissPay}
    >
      <div className="mb-3 text-[11.5px] font-extrabold tracking-[0.08em] text-faint uppercase">
        {hasApps ? "Top up" : "You've used your free application"}
      </div>
      <h2 className="mb-2.5 pr-9 text-pretty font-serif text-[29px] leading-[1.15] font-medium">
        {hasApps ? "Add more applications" : "Get more applications"}
      </h2>
      <p className="mb-2 max-w-[44ch] text-[14.5px] leading-[1.55] text-muted">
        One application is one CV against one posting, start to finish.
      </p>
      <p className="mb-5.5 text-[13px] font-semibold">
        Applications never expire. Nothing renews.
      </p>

      <div className="mb-5 flex flex-col gap-2.75">
        {getPacks().map((pack, i) => (
          <PackCard
            key={pack.id}
            pack={pack}
            featured={i === 0}
            onBuy={() => buy(pack.id)}
          />
        ))}

        <FreeTierCard
          name={FREE_TIER.name}
          price={FREE_TIER.price}
          unitPrice={FREE_TIER.unitPrice}
          features={FREE_TIER.features}
          badge={appsTotal > 1 ? "Included" : "Used"}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3.5 border-t border-ink/14 pt-3.75">
        <p className="min-w-50 flex-1 text-[12.5px] leading-[1.55] text-muted">
          Everything you&rsquo;ve already scored stays readable forever, whether or
          not you ever buy.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <PayMark />
          <span className="text-xs font-semibold text-muted">{PAYMENT_METHODS}</span>
        </div>
      </div>
    </Modal>
  );
}
