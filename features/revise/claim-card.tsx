"use client";

import { cn } from "@/utils/cn";
import { CLAIM_STATUS_META } from "@/constants/scoring";
import { isResolved, type Claim } from "@/types/revise";
import { useClaims } from "./use-claims";
import { ClaimEditor } from "./claim-editor";
import { ClaimActions } from "./claim-actions";

/** One undefended claim, in whichever of its five states it currently sits. */
export function ClaimCard({ claim, index }: { claim: Claim; index: number }) {
  const { dispatch } = useClaims();
  const meta = CLAIM_STATUS_META[claim.status];
  const resolved = isResolved(claim.status);
  const editing = claim.status === "editing";
  const cut = claim.status === "cut";

  return (
    <article
      className={cn(
        "rounded-3xl border-hair border-ink bg-surface px-7 py-6.5",
        resolved ? "shadow-soft-xs" : "shadow-hard-lg",
        cut && "opacity-70",
      )}
    >
      <header className="mb-3.5 flex flex-wrap items-center gap-2.5">
        <span className="text-[11px] font-extrabold tracking-[0.06em] text-faint uppercase">
          Claim {claim.n} · {claim.where}
        </span>
        <span
          className={cn(
            "rounded-pill border-hair border-ink px-2.75 py-1 text-[11px] font-bold",
            meta.chip,
          )}
        >
          {meta.label}
        </span>
      </header>

      <div className="mb-1.75 text-[11px] font-bold tracking-[0.08em] text-faint uppercase">
        On your CV
      </div>
      <p
        className={cn(
          "rounded-md border border-ink/14 bg-surface-sunk px-3.5 py-3 text-[15px] leading-relaxed",
          cut ? "text-faint line-through" : "text-ink",
        )}
      >
        {claim.original}
      </p>

      <div className="mt-4 border-l-2 border-amber pl-3.5">
        <div className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-warn uppercase">
          We asked
        </div>
        <p className="mb-2 font-serif text-[14.5px] leading-snug">{claim.probe}</p>
        <p className="text-[13.5px] leading-[1.55] text-muted">{claim.whyFailed}</p>
      </div>

      {editing && (
        <ClaimEditor
          draft={claim.draft}
          onDraft={(value) => dispatch({ type: "draft", index, value })}
          onSave={() => dispatch({ type: "save", index })}
          onSuggest={() => dispatch({ type: "suggest", index })}
          onCancel={() => dispatch({ type: "cancel", index })}
        />
      )}

      {claim.status === "rewritten" && (
        <div className="mt-4.5 rounded-14 border-hair border-good bg-surface px-4 py-3.5">
          <div className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-good uppercase">
            Now reads
          </div>
          <p className="text-sm leading-relaxed">{claim.draft}</p>
        </div>
      )}

      {!editing && !resolved && (
        <ClaimActions
          editLabel={claim.draft ? "Continue rewrite" : "Rewrite it"}
          onEdit={() => dispatch({ type: "edit", index })}
          onCut={() => dispatch({ type: "cut", index })}
          onStand={() => dispatch({ type: "stand", index })}
        />
      )}

      {resolved && (
        <button
          type="button"
          onClick={() => dispatch({ type: "reopen", index })}
          className="mt-4 border-b-[1.5px] border-ink/25 text-[13px] font-semibold text-muted transition-colors hover:text-ink"
        >
          Undo
        </button>
      )}
    </article>
  );
}
