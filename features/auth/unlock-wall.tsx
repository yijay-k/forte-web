"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "./use-auth";

/** The signup modal. Every path through it unlocks — there is no backend yet. */
export function UnlockWall() {
  const { wallOpen, dismissWall, unlock } = useAuth();
  const [email, setEmail] = useState("");

  return (
    <Modal
      open={wallOpen}
      onClose={dismissWall}
      onCloseButton={dismissWall}
      label="Unlock the rest of your report"
    >
      <div className="mb-3 text-[11.5px] font-extrabold tracking-[0.08em] text-faint uppercase">
        Nothing to re-upload
      </div>
      <h2 className="mb-3 text-pretty font-serif text-[24px] app:text-[31px] leading-[1.15] font-medium">
        Unlock the rest of your report
      </h2>
      <p className="mb-6.5 text-[14.5px] leading-[1.55] text-muted">
        Your CV and score are already saved. You&rsquo;ll land back exactly where you
        are, with the blur gone.
      </p>

      <div className="mb-5 flex flex-col gap-2.75">
        <SocialButton
          onClick={unlock}
          glyph={<span className="size-5 shrink-0 rounded-pill border-[2.5px] border-ink" />}
        >
          Continue with Google
        </SocialButton>
        <SocialButton
          onClick={unlock}
          glyph={<span className="size-5 shrink-0 rounded-[5px] bg-ink" />}
        >
          Continue with LinkedIn
        </SocialButton>
      </div>

      <div className="mb-4.5 flex items-center gap-3">
        <span className="h-px flex-1 bg-ink/14" />
        <span className="text-xs font-semibold text-faint">or</span>
        <span className="h-px flex-1 bg-ink/14" />
      </div>

      {/* One pill: the field and its action share a border. */}
      <form
        className="flex items-center gap-2 rounded-pill border-hair border-ink bg-white py-1.25 pr-1.25 pl-5"
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
          className="min-w-0 flex-1 border-none bg-transparent py-2.25 text-[14.5px] font-medium outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-pill bg-ink px-5.5 py-3 text-sm font-semibold whitespace-nowrap text-on-ink transition-opacity hover:opacity-86"
        >
          Send link
        </button>
      </form>

      <p className="mt-4 text-[12.5px] leading-relaxed text-faint">
        Free forever for one posting. We never send your CV anywhere.
      </p>
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
      className="press flex items-center justify-center gap-2.75 rounded-pill border-hair border-ink bg-surface px-5.5 py-3.75 text-[15px] font-semibold shadow-hard-md hover:shadow-hard-sm"
    >
      {glyph}
      <span>{children}</span>
    </button>
  );
}
