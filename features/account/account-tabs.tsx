"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const TABS = [
  { href: "/account", label: "Profile" },
  { href: "/account/settings", label: "Settings" },
];

/**
 * Real routes rather than local state: the two tabs hold substantial, linkable
 * content, and the back button should move between them.
 */
export function AccountTabs() {
  const pathname = usePathname();

  return (
    <nav className="mb-9 flex gap-5.5 border-b-[1.5px] border-ink/16">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "-mb-[1.5px] border-b-[2.5px] px-0.5 pb-3 text-[15px] transition-colors duration-150",
              active
                ? "border-ink font-bold text-ink"
                : "border-transparent font-semibold text-[#8a897e] hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
