"use client";

import { PillButton } from "@/components/ui/pill-button";

type Props = {
  /** Changes to "Continue rewrite" once a draft exists. */
  editLabel: string;
  onEdit: () => void;
  onCut: () => void;
  onStand: () => void;
};

/**
 * Three ways to resolve a claim. Standing by it is a first-class option — the
 * point is that every claim gets a decision, not that every claim gets changed.
 */
export function ClaimActions({ editLabel, onEdit, onCut, onStand }: Props) {
  return (
    <div className="mt-4.5 flex flex-wrap items-center gap-2.5">
      <PillButton variant="ink" onClick={onEdit}>
        {editLabel}
      </PillButton>
      <PillButton variant="outline" onClick={onCut}>
        Cut the line
      </PillButton>
      <PillButton variant="ghost" onClick={onStand}>
        Stand by it
      </PillButton>
    </div>
  );
}
