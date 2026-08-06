import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/** Two side-by-side entry points: score something new, or re-run the interview. */
export function QuickActions() {
  return (
    <div className="mb-9 grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
      <ActionCard
        href="/cv/new"
        tone="surface"
        title="Score against a new posting"
        body="Paste a JD, see what you don't cover"
        glyph={
          <span className="flex size-11.5 shrink-0 items-center justify-center rounded-lg border-hair border-ink bg-sage">
            <span className="h-[19px] w-[15px] rounded-xs border-[2.5px] border-ink" />
          </span>
        }
      />
      <ActionCard
        href="/interview"
        tone="accent"
        title="Re-run the same interview"
        body="Same questions, see the delta"
        glyph={
          <span className="flex size-11.5 shrink-0 items-center justify-center rounded-lg border-hair border-ink bg-surface">
            <span className="size-[17px] rounded-pill border-[3px] border-ink" />
          </span>
        }
      />
    </div>
  );
}

function ActionCard({
  href,
  tone,
  title,
  body,
  glyph,
}: {
  href: string;
  tone: "surface" | "accent";
  title: string;
  body: string;
  glyph: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "press flex items-center gap-4.5 rounded-2xl border-hair border-ink px-6.5 py-6 text-left shadow-hard hover:shadow-hard-sm",
        tone === "accent" ? "bg-accent" : "bg-surface",
      )}
    >
      {glyph}
      <div className="flex-1">
        <div className="font-serif text-[19px] font-medium">{title}</div>
        <div
          className={cn(
            "mt-0.5 text-[13px]",
            tone === "accent" ? "text-ink-soft" : "text-muted",
          )}
        >
          {body}
        </div>
      </div>
      <span
        className={cn("text-[19px]", tone === "accent" ? "text-ink" : "text-faint")}
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
