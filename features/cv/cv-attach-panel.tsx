"use client";

import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { PillButton } from "@/components/ui/pill-button";

type Props = {
  fileName: string | null;
  onAttach: (name: string) => void;
  onRemove: () => void;
};

/** Step 1 — get the CV in. Two escape hatches so nobody is blocked by a parser. */
export function CvAttachPanel({ fileName, onAttach, onRemove }: Props) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <CardTitle className="mb-4">1 · Your CV</CardTitle>

      {fileName ? (
        <div className="flex items-center gap-3.5 rounded-xl border-hair border-ink bg-surface-sunk px-5 py-4.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border-hair border-ink bg-accent">
            <span className="h-[19px] w-[15px] rounded-xs border-[2.5px] border-ink" />
          </span>
          <div className="flex-1">
            <div className="text-[14.5px] font-semibold">{fileName}</div>
            <div className="text-[12.5px] font-semibold text-good">
              ✓ Read · 8 bullets across 2 roles
            </div>
          </div>
          <PillButton variant="outline" size="sm" onClick={onRemove}>
            Remove
          </PillButton>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-[#C4AEF5] bg-surface-sunk px-6 py-10 text-center">
          <div className="mx-auto mb-3.5 flex size-13 items-center justify-center rounded-lg border-hair border-ink bg-accent">
            <span className="h-5 w-4 rounded-xs border-[2.5px] border-ink" />
          </div>
          <div className="mb-1 text-[15.5px] font-semibold">
            Drop your CV here, or browse
          </div>
          <div className="text-[13px] text-faint">
            PDF or DOCX · up to 5MB · no account needed
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            <PillButton variant="outline" onClick={() => onAttach("resume_v3.pdf")}>
              Use sample · resume_v3.pdf
            </PillButton>
            <PillButton variant="ghost" onClick={() => onAttach("pasted CV text")}>
              Can&rsquo;t read your file? Paste it as text
            </PillButton>
          </div>
        </div>
      )}
    </PaperCard>
  );
}
