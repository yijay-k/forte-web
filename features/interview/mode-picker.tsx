"use client";

import { cn } from "@/utils/cn";
import { PaperCard } from "@/components/ui/paper-card";
import { CardTitle } from "@/components/ui/section-heading";
import { Toggle } from "@/components/ui/toggle";
import { VIDEO_MODE_LOGS, VOICE_MODE_LOGS } from "@/lib/data/interview-feedback";
import type { InterviewMode } from "@/types/interview";

type Props = {
  mode: InterviewMode;
  onMode: (mode: InterviewMode) => void;
  speakAnswers: boolean;
  onSpeakAnswers: (next: boolean) => void;
};

export function ModePicker({ mode, onMode, speakAnswers, onSpeakAnswers }: Props) {
  return (
    <PaperCard radius="rounded-3xl" padding="p-7">
      <CardTitle className="mb-1.5">Mode</CardTitle>
      <p className="mb-4.5 text-[13.5px] leading-relaxed text-muted">
        Nothing is scored while you talk. You get one timer and nothing else — because
        a real interview has no dashboard. Both modes interrupt you like a person
        would.
      </p>

      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]">
        <ModeCard
          selected={mode === "voice"}
          onSelect={() => onMode("voice")}
          title="Voice only"
          kicker="the screening call"
          body="No camera, no browser permission. It hears you hedge, trail off, or correct yourself mid-sentence, and pushes there."
          logs={VOICE_MODE_LOGS}
        />
        <ModeCard
          selected={mode === "video"}
          onSelect={() => onMode("video")}
          title="Voice + video"
          kicker="the panel round"
          body={
            <>
              Adds one thing: it can cut in because of something it{" "}
              <em className="italic">saw</em> — you reaching for notes, you going still
              on a hard question.
            </>
          }
          logs={VIDEO_MODE_LOGS}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3.5 border-t border-ink/10 pt-4">
        <div>
          <div className="text-[14.5px] font-semibold">Speak my answers</div>
          <div className="text-[12.5px] text-faint">
            Turn off to type instead — you lose the interruption behaviour.
          </div>
        </div>
        <Toggle on={speakAnswers} onChange={onSpeakAnswers} label="Speak my answers" />
      </div>
    </PaperCard>
  );
}

function ModeCard({
  selected,
  onSelect,
  title,
  kicker,
  body,
  logs,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  kicker: string;
  body: React.ReactNode;
  logs: readonly string[];
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border-hair px-5.5 py-5 text-left transition-colors",
        selected ? "border-ink bg-accent" : "border-ink/18 bg-surface-sunk",
      )}
    >
      <div className="mb-2.25 flex items-start justify-between gap-2.5">
        <div>
          <div className="font-serif text-[17px] font-semibold">{title}</div>
          <div className="mt-px text-xs font-semibold text-muted">{kicker}</div>
        </div>
        <span className="flex size-5 shrink-0 items-center justify-center rounded-pill border-hair border-ink bg-surface">
          <span
            className={cn("size-2.5 rounded-pill", selected ? "bg-ink" : "bg-transparent")}
          />
        </span>
      </div>
      <p className="mb-3 text-[13.5px] leading-relaxed text-muted">{body}</p>
      <ul className="flex flex-col gap-1.25">
        {logs.map((log) => (
          <li
            key={log}
            className="flex items-start gap-1.75 text-[12.5px] leading-snug text-ink-soft"
          >
            <span className="mt-1.5 size-[5px] shrink-0 rounded-pill bg-ink" />
            {log}
          </li>
        ))}
      </ul>
    </button>
  );
}
