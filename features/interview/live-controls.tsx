"use client";

type Props = {
  listeningLabel: string;
  nextLabel: string;
  footer: string;
  onNext: () => void;
};

/** The only controls during a session: what it's hearing, and how to move on. */
export function LiveControls({ listeningLabel, nextLabel, footer, onNext }: Props) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.75 px-6 pt-5 pb-6">
      <div className="flex w-full max-w-[860px] flex-wrap items-center gap-3">
        <div className="flex min-w-55 flex-1 items-center gap-3 rounded-pill border border-paper/14 bg-paper/5 px-5.5 py-3.75">
          <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
            {[8, 16, 11, 20, 9].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-hair bg-accent"
                style={{ height: h }}
              />
            ))}
          </span>
          <span className="text-sm text-on-ink-faint">{listeningLabel}</span>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="rounded-pill border-hair border-accent bg-accent px-8 py-3.75 text-[15px] font-semibold whitespace-nowrap text-ink"
        >
          {nextLabel}
        </button>
      </div>
      <div className="text-center text-[12.5px] text-[#5e5d56]">{footer}</div>
    </div>
  );
}
