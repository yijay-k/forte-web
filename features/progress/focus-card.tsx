import Link from "next/link";
import { Sticker } from "@/components/ui/sticker";
import { PROGRESS_FOCUS } from "@/lib/data/progress";

/** The one number that isn't moving, and the way to move it. */
export function FocusCard() {
  return (
    <div className="relative rounded-3xl border-hair border-ink bg-surface-sunk px-6.5 py-6 shadow-amber">
      <Sticker position="absolute -top-3.25 left-6">your focus</Sticker>

      <div className="mt-2 mb-2 font-serif text-xl font-medium">
        {PROGRESS_FOCUS.title}
      </div>
      <p className="mb-4 text-[13.5px] leading-[1.55] text-muted">
        {PROGRESS_FOCUS.body}
      </p>
      <Link
        href="/revise"
        className="inline-block rounded-pill border-hair border-ink bg-ink px-5.25 py-3 text-[13.5px] font-semibold text-on-ink"
      >
        {PROGRESS_FOCUS.cta}
      </Link>
    </div>
  );
}
