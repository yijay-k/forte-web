import Link from "next/link";
import { SectionRule } from "@/components/ui/section-rule";
import { ACCOUNT_PROFILE } from "@/lib/data/account";

type Props = {
  usedCount: number;
  /** Free accounts have only ever uploaded once. */
  hasVersionHistory: boolean;
};

/** The single CV every application starts from. */
export function CvOnFile({ usedCount, hasVersionHistory }: Props) {
  return (
    <section className="mb-11.5">
      <SectionRule
        note={usedCount === 1 ? "Used in 1 application" : `Used in ${usedCount} applications`}
      >
        Your CV
      </SectionRule>

      <div className="mb-2.25 flex items-center gap-4 rounded-xl border-hair border-ink bg-surface px-5 py-4.25">
        <div
          className="h-11.5 w-9 shrink-0 rounded-md border-hair border-ink bg-surface-alt"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">{ACCOUNT_PROFILE.cvFile}</div>
          <div className="mt-0.75 text-[12.5px] text-faint">
            {ACCOUNT_PROFILE.cvUploaded} · every new application starts from this file
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2.25">
          <button
            type="button"
            className="rounded-pill border-hair border-line px-4.25 py-2.5 text-[13px] font-semibold transition-colors hover:border-ink"
          >
            View
          </button>
          <Link
            href="/cv/new"
            className="rounded-pill border-hair border-ink px-4.25 py-2.5 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-on-ink"
          >
            Replace
          </Link>
        </div>
      </div>

      <p className="text-[12.5px] text-faint">
        {hasVersionHistory ? "Two earlier versions kept." : "This is your first upload."}
      </p>
    </section>
  );
}
