"use client";

import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { PaperCard } from "@/components/ui/paper-card";
import { PillButton } from "@/components/ui/pill-button";
import { TARGET_COMPANY, TARGET_ROLE } from "@/lib/data/job-description";
import { ModePicker } from "./mode-picker";
import { InterviewerPicker } from "./interviewer-picker";
import type { InterviewSession } from "./use-interview-session";

export function InterviewSetup({ session }: { session: InterviewSession }) {
  return (
    <div className="mx-auto max-w-[940px] px-14 pt-11 pb-21">
      <Chip tone="sage" className="mb-4.5 px-4 py-1.75 text-[12.5px]">
        Mock Interview
      </Chip>

      <h1 className="mt-0 mb-2.5 font-serif text-[46px] leading-[1.03] font-medium tracking-[-0.02em]">
        They&rsquo;ll ask about the <em className="italic">34%</em>.
      </h1>
      <p className="mb-7.5 max-w-[600px] text-base leading-[1.55] text-muted">
        Five questions built from your CV and the {TARGET_COMPANY} posting — each one
        aimed at a claim you&rsquo;ve made. If an answer goes vague, expect a
        follow-up.
      </p>

      <div className="grid gap-4.5">
        <ModePicker
          mode={session.mode}
          onMode={session.setMode}
          speakAnswers={session.speakAnswers}
          onSpeakAnswers={session.setSpeakAnswers}
        />

        <InterviewerPicker
          selected={session.interviewerId}
          onSelect={session.setInterviewerId}
        />

        <PaperCard
          radius="rounded-3xl"
          padding="px-7 py-6"
          className="flex flex-wrap items-center justify-between gap-3.5"
        >
          <div>
            <div className="font-serif text-[19px] font-medium">
              {TARGET_ROLE} · {TARGET_COMPANY}
            </div>
            <div className="text-[13.5px] text-muted">
              From resume_v3.pdf and the posting · {session.questions.length} questions
              · ~12 min
            </div>
          </div>
          <Link
            href="/cv/new"
            className="rounded-pill border-hair border-ink px-4.75 py-2.5 text-[13px] font-semibold transition-colors hover:bg-sage"
          >
            Change posting
          </Link>
        </PaperCard>

        <PillButton
          variant="accent"
          size="xl"
          shadow="hard-md"
          onClick={session.begin}
          className="justify-self-start px-9 py-4 text-base"
        >
          Start interview <span aria-hidden="true">→</span>
        </PillButton>
      </div>
    </div>
  );
}
