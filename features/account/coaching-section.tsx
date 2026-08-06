import { SectionRule } from "@/components/ui/section-rule";
import type { CoachingSession } from "@/types/account";

/** Coaching comes with a pack, so a free account sees the empty state. */
export function CoachingSection({ sessions }: { sessions: readonly CoachingSession[] }) {
  return (
    <section>
      <SectionRule note="20 minutes each">Coaching sessions</SectionRule>

      {sessions.length === 0 ? (
        <p className="rounded-xl border-hair border-dashed border-line p-5 text-[13.5px] leading-relaxed text-muted">
          No sessions yet. Coaching comes with a pack — three with the 3-pack, fifteen
          with the 12-pack.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border-hair border-line bg-surface">
          {sessions.map((session, i) => (
            <div
              key={session.id}
              className={`flex items-center gap-4 px-5 py-3.5 ${
                i === sessions.length - 1 ? "" : "border-b border-ink/8"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] leading-snug font-semibold">
                  {session.claim}
                </div>
                <div className="mt-0.75 text-xs text-faint">
                  {session.where} · {session.date}
                </div>
              </div>
              <div className="shrink-0 font-mono text-xs text-muted">
                {session.spent}
              </div>
              <button
                type="button"
                className="shrink-0 text-[12.5px] font-bold underline"
              >
                Transcript
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
