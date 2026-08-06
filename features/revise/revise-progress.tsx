import { ProgressBar } from "@/components/ui/progress-bar";

type Props = {
  resolved: number;
  total: number;
};

export function ReviseProgress({ resolved, total }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3.5">
      <ProgressBar
        percent={total === 0 ? 0 : Math.round((resolved / total) * 100)}
        height="h-2.5"
        className="min-w-55 flex-1"
      />
      <div className="text-[13.5px] font-bold">
        {resolved} of {total} resolved
      </div>
    </div>
  );
}
