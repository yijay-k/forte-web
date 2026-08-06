import { cn } from "@/utils/cn";

type Props = {
  title: string;
  sub: string;
  when: string;
  accent: boolean;
  last?: boolean;
};

export function ActivityRow({ title, sub, when, accent, last }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3.5 py-4.25",
        !last && "border-b border-ink/8",
      )}
    >
      <div
        className={cn(
          "size-8.5 shrink-0 rounded-[9px] border-hair border-ink",
          accent ? "bg-accent" : "bg-sage",
        )}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-semibold">{title}</div>
        <div className="text-[13px] text-faint">{sub}</div>
      </div>
      <div className="text-[13px] whitespace-nowrap text-faint">{when}</div>
    </div>
  );
}
