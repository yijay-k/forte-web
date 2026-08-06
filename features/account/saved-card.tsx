import { PayMark } from "@/features/billing/pay-mark";
import { SAVED_CARD } from "@/lib/data/account";

/** The card on file, or a dashed placeholder when nothing has been bought. */
export function SavedCard({ empty }: { empty?: boolean }) {
  if (empty) {
    return (
      <div className="flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-[20px] border-hair border-dashed border-line px-5.5 py-5 text-[#8a897e]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-bold text-[#8a897e]">No card saved</span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-[#b3b2a6] uppercase">
            Empty
          </span>
        </div>
        <div className="font-mono text-[15px] tracking-[0.08em] text-[#c4c3b7]">
          •••• •••• •••• ••••
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-[20px] border-hair border-ink bg-ink px-5.5 py-5 text-on-ink shadow-[6px_6px_0_rgb(22_21_19_/_0.16)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_85%_at_102%_-8%,rgba(23,178,106,0.30),transparent_62%)]"
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.25">
            <PayMark variant="card" />
            <span className="text-[13px] font-bold tracking-[-0.01em]">
              {SAVED_CARD.brand}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.1em] text-on-ink-muted uppercase">
            Saved
          </span>
        </div>

        <div className="relative">
          <div className="mb-3.5 font-mono text-base tracking-[0.08em]">
            •••• •••• •••• {SAVED_CARD.last4}
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="mb-0.75 font-mono text-[9.5px] tracking-[0.12em] text-[#8f8d80] uppercase">
                Cardholder
              </div>
              <div className="text-[12.5px] font-semibold tracking-[0.02em]">
                {SAVED_CARD.holder}
              </div>
            </div>
            <div className="text-right">
              <div className="mb-0.75 font-mono text-[9.5px] tracking-[0.12em] text-[#8f8d80] uppercase">
                Expires
              </div>
              <div className="font-mono text-[12.5px]">{SAVED_CARD.expires}</div>
            </div>
            <span className="font-mono text-xs font-semibold tracking-[0.16em] text-on-ink-strong">
              {SAVED_CARD.network}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3.25 flex items-center gap-3">
        <p className="min-w-0 flex-1 text-xs leading-snug text-faint">
          One tap at checkout. Never charged automatically.
        </p>
        <button
          type="button"
          className="shrink-0 rounded-pill border-hair border-ink px-3.75 py-2 text-[12.5px] font-semibold transition-colors hover:bg-ink hover:text-on-ink"
        >
          Manage
        </button>
      </div>
    </div>
  );
}
