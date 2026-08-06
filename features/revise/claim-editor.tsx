"use client";

import { PillButton } from "@/components/ui/pill-button";

type Props = {
  draft: string;
  onDraft: (value: string) => void;
  onSave: () => void;
  onSuggest: () => void;
  onCancel: () => void;
};

export function ClaimEditor({ draft, onDraft, onSave, onSuggest, onCancel }: Props) {
  return (
    <div className="mt-4.5">
      <div className="mb-1.75 text-[11px] font-bold tracking-[0.08em] text-faint uppercase">
        Your rewrite
      </div>
      <textarea
        value={draft}
        onChange={(e) => onDraft(e.target.value)}
        aria-label="Your rewrite"
        className="min-h-24 w-full resize-y rounded-lg border-hair border-ink bg-white px-4 py-3.5 text-sm leading-relaxed outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <PillButton variant="ink" onClick={onSave}>
          Save rewrite
        </PillButton>
        <PillButton variant="accent" onClick={onSuggest}>
          Use our suggestion
        </PillButton>
        <PillButton variant="ghost" onClick={onCancel}>
          Cancel
        </PillButton>
      </div>
    </div>
  );
}
