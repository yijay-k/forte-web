"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/modal";
import { PillButton } from "@/components/ui/pill-button";
import { useAuth } from "./use-auth";

/** The signup modal. Every path through it simply unlocks — there is no backend yet. */
export function UnlockWall() {
  const { wallOpen, dismissWall, unlock } = useAuth();
  const [email, setEmail] = useState("");

  return (
    <Modal open={wallOpen} onClose={dismissWall} label="Unlock the rest of your report">
      <div className="relative">
        <button
          type="button"
          onClick={dismissWall}
          aria-label="Close"
          className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-pill border-hair border-line text-[15px] text-muted transition-colors hover:border-ink hover:text-ink"
        >
          ✕
        </button>

        <div className="mb-3 text-[11.5px] font-extrabold tracking-[0.08em] text-faint uppercase">
          Nothing to re-upload
        </div>
        <div className="mb-3 text-pretty font-serif text-[31px] leading-[1.15] font-medium">
          Unlock the rest of your report
        </div>
        <p className="mb-6.5 text-[14.5px] leading-[1.55] text-muted">
          Your CV and score are already saved. You&rsquo;ll land back exactly where you
          are, with the blur gone.
        </p>

        <div className="mb-5 flex flex-col gap-2.75">
          <SocialButton onClick={unlock} glyph={<span className="size-5 shrink-0 rounded-pill border-[2.5px] border-ink" />}>
            Continue with Google
          </SocialButton>
          <SocialButton onClick={unlock} glyph={<span className="size-5 shrink-0 rounded-[5px] bg-ink" />}>
            Continue with LinkedIn
          </SocialButton>
        </div>

        <div className="mb-4.5 flex items-center gap-3">
          <span className="h-px flex-1 bg-ink/14" />
          <span className="text-xs font-semibold text-faint">or</span>
          <span className="h-px flex-1 bg-ink/14" />
        </div>

        <form
          className="flex flex-wrap gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            unlock();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="min-w-45 flex-1 rounded-pill border-hair border-ink bg-white px-4.5 py-3.5 text-[14.5px] font-medium outline-none focus:shadow-hard-xs"
          />
          <PillButton type="submit" variant="ink" size="lg">
            Send link
          </PillButton>
        </form>

        <p className="mt-4.5 text-[12.5px] leading-relaxed text-faint">
          Free forever for one posting. We never send your CV anywhere.
        </p>
      </div>
    </Modal>
  );
}

function SocialButton({
  children,
  glyph,
  onClick,
}: {
  children: ReactNode;
  glyph: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="press flex items-center justify-center gap-2.75 rounded-pill border-hair border-ink bg-surface px-5.5 py-3.75 text-[15px] font-semibold shadow-hard-md hover:shadow-hard-xs"
    >
      {glyph}
      {children}
    </button>
  );
}
