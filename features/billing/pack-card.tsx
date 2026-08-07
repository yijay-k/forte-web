"use client";

import { cn } from "@/utils/cn";
import type { Pack } from "@/types/billing";

type Props = {
  pack: Pack;
  /** The best-value pack gets the accent shadow and a filled arrow. */
  featured?: boolean;
  onBuy: () => void;
};

export function PackCard({ pack, featured, onBuy }: Props) {
  return (
    <button
      type="button"
      onClick={onBuy}
      className={cn(
        "press w-full rounded-xl border-hair bg-surface px-[14px] py-[13px] app:px-4.75 app:py-4.25 text-left",
        featured
          ? "border-ink shadow-accent-md hover:shadow-[4px_4px_0_var(--forte-accent)]"
          : "border-line hover:border-ink hover:shadow-[2px_2px_0_rgb(22_21_19_/_0.35)]",
      )}
    >
      <div className="mb-3.25 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold">{pack.name}</span>
            {pack.badge && (
              <span className="rounded-pill border-hair border-ink bg-accent px-2 py-0.5 text-[10px] font-extrabold tracking-[0.05em] uppercase">
                {pack.badge}
              </span>
            )}
          </div>
          <div className="mt-0.75 text-xs font-semibold text-faint">
            {pack.unitPrice}
          </div>
        </div>
        {/* Right-aligned so the two packs' prices stack against a common edge
            whether or not a local amount sits under them. */}
        <div className="shrink-0 text-right">
          <div className="font-serif text-[22px] leading-none app:text-[27px] font-medium">
            {pack.price}
          </div>
          {pack.localPrice && (
            <div className="mt-1 text-[11.5px] font-semibold text-faint">
              {pack.localPrice}
            </div>
          )}
        </div>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-pill text-sm leading-none",
            featured ? "bg-ink text-on-ink" : "border-hair border-ink text-ink",
          )}
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <PackFeatures features={pack.features} />
    </button>
  );
}

/** The free tier is shown for comparison and is never purchasable. */
export function FreeTierCard({
  name,
  price,
  unitPrice,
  features,
  badge,
}: {
  name: string;
  price: string;
  unitPrice: string;
  features: readonly string[];
  badge: string;
}) {
  return (
    <div className="rounded-xl border-hair border-dashed border-line px-3.5 py-3.25 app:px-4.75 app:py-4.25 transition-colors hover:border-faint">
      <div className="mb-3.25 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold text-muted">{name}</span>
            <span className="rounded-pill border-hair border-line px-2 py-0.5 text-[10px] font-extrabold tracking-[0.05em] text-[#8a897e] uppercase">
              {badge}
            </span>
          </div>
          <div className="mt-0.75 text-xs font-semibold text-faint">{unitPrice}</div>
        </div>
        <div className="shrink-0 font-serif text-[22px] leading-none app:text-[27px] font-medium text-muted">
          {price}
        </div>
      </div>
      <PackFeatures features={features} muted />
    </div>
  );
}

function PackFeatures({
  features,
  muted,
}: {
  features: readonly string[];
  muted?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-1.5">
      {features.map((feature) => (
        <li
          key={feature}
          className={cn(
            "flex items-start gap-2.25 text-[12.5px] leading-snug",
            muted ? "text-muted" : "text-[#2a2822]",
          )}
        >
          <span
            className={cn(
              "mt-1.5 size-[5px] shrink-0 rounded-pill",
              muted ? "bg-faint" : "bg-ink",
            )}
            aria-hidden="true"
          />
          {feature}
        </li>
      ))}
    </ul>
  );
}
