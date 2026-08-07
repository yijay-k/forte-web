import { PillButton } from "@/components/ui/pill-button";

type Props = {
  sourceLabel: string;
  role: string;
  meta: string;
  requirements: readonly string[];
  numbered: boolean;
  onReplace: () => void;
};

/** What the parser found — shown instead of the textarea once a posting is read. */
export function JdParsedSummary({
  sourceLabel,
  role,
  meta,
  requirements,
  numbered,
  onReplace,
}: Props) {
  return (
    <div className="rounded-xl border-hair border-ink bg-surface-sunk px-5.5 py-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1.25 text-[11px] font-extrabold tracking-[0.06em] text-faint uppercase">
            {sourceLabel}
          </div>
          <div className="font-serif text-[clamp(13.6px,3.67vw,22px)] leading-tight font-medium">{role}</div>
          <div className="mt-0.75 text-[13px] text-muted">{meta}</div>
        </div>
        <PillButton variant="outline" size="sm" onClick={onReplace} className="shrink-0">
          Replace
        </PillButton>
      </div>

      <div className="mb-2.5 text-xs font-extrabold tracking-[0.06em] text-faint uppercase">
        Requirements we&rsquo;ll check you against
      </div>
      <ul className="flex flex-col gap-2">
        {requirements.map((text, i) => (
          <li key={text} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
            <span className="mt-px flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border-hair border-ink bg-surface text-[10px] font-bold">
              {numbered ? i + 1 : "!"}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
