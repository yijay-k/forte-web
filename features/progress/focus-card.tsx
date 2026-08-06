import Link from "next/link";
import { Sticker } from "@/components/ui/sticker";

/** The one number that isn't moving, and the way to move it. */
export function FocusCard() {
  return (
    <div className="relative rounded-3xl border-hair border-ink bg-surface-sunk px-6.5 py-6 shadow-amber">
      <Sticker position="absolute -top-3.25 left-6">your focus</Sticker>

      <div className="mt-2 mb-2 font-serif text-xl font-medium">
        Specificity · 51, barely moving
      </div>
      <p className="mb-4 text-[13.5px] leading-[1.55] text-muted">
        It&rsquo;s the only number that isn&rsquo;t climbing, and it&rsquo;s the one
        that collapses under a follow-up. Three flagged claims are waiting.
      </p>
      <Link
        href="/revise"
        className="inline-block rounded-pill border-hair border-ink bg-ink px-5.25 py-3 text-[13.5px] font-semibold text-on-ink"
      >
        Revise them →
      </Link>
    </div>
  );
}
