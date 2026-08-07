import Link from "next/link";

/** Hands off to the interview. Gated, and the last thing in the report. */
export function CvInterviewCta() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border-hair border-ink bg-accent p-7.5 shadow-hard-lg">
      <div>
        <div className="mb-1 font-serif text-[clamp(14.3px,3.83vw,23px)] font-medium">
          Now defend it out loud
        </div>
        <p className="max-w-[460px] text-sm leading-relaxed text-ink-soft">
          Five questions built from this CV and this posting — starting with the
          claims you&rsquo;d least like to be asked about.
        </p>
      </div>
      <Link
        href="/interview"
        className="rounded-pill border-hair border-ink bg-ink px-7 py-3.5 text-[14.5px] font-semibold whitespace-nowrap text-on-ink"
      >
        Start mock interview →
      </Link>
    </div>
  );
}
