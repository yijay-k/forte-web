import Link from "next/link";
import { ForteMark } from "@/components/brand/forte-mark";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-dot-grid bg-paper bg-[length:24px_24px] px-6">
      <div className="w-full max-w-[440px] rounded-4xl border-hair border-ink bg-surface p-9 text-center shadow-hard-lg">
        <div className="mb-6 flex justify-center">
          <ForteMark />
        </div>
        <h1 className="mb-2.5 font-serif text-[32px] leading-tight font-medium">
          Nothing here to score.
        </h1>
        <p className="mb-7 text-[14.5px] leading-relaxed text-muted">
          That page doesn&rsquo;t exist. Your CV and your reps are where you left them.
        </p>
        <Link
          href="/cv"
          className="press inline-block rounded-pill border-hair border-ink bg-accent px-7 py-3.5 text-[14.5px] font-semibold shadow-hard-md hover:shadow-hard-xs"
        >
          Back to the CV evaluator
        </Link>
      </div>
    </main>
  );
}
