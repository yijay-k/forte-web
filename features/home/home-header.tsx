import { Chip } from "@/components/ui/chip";
import { CURRENT_REP, USER } from "@/lib/data/progress";
import { TARGET_COMPANY, TARGET_ROLE } from "@/lib/data/job-description";

/** Greeting chips and the serif headline that frames the whole dashboard. */
export function HomeHeader() {
  const firstName = USER.name.split(" ")[0];

  return (
    <header>
      <div className="mb-5.5 flex flex-wrap items-center gap-3">
        <Chip tone="sage" className="px-4 py-1.75 text-[12.5px]">
          Good morning, {firstName}
        </Chip>
        <Chip tone="neutral" className="px-3.5 py-1.75 text-[12.5px] shadow-drop">
          Rep {CURRENT_REP} · {TARGET_ROLE} at {TARGET_COMPANY}
        </Chip>
      </div>

      <h1 className="mt-0 mb-3.5 max-w-[780px] text-pretty font-serif text-[clamp(34px,5.4vw,54px)] leading-[1.02] font-medium tracking-[-0.025em]">
        Three claims on your CV didn&rsquo;t{" "}
        <em className="rounded-sm bg-accent px-2.25 [box-decoration-break:clone] italic">
          survive
        </em>{" "}
        the interview.
      </h1>
      <p className="mb-8.5 max-w-[560px] text-[17px] leading-[1.55] text-muted">
        That&rsquo;s the useful part. Fix the lines you couldn&rsquo;t defend, and the
        next recruiter never gets to ask.
      </p>
    </header>
  );
}
