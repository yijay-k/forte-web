"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { useAuth } from "@/features/auth/use-auth";
import { useBilling } from "@/features/billing/use-billing";
import { ACCOUNT_PROFILE } from "@/lib/data/account";
import { PLAN_LABEL } from "@/lib/data/plans";

/**
 * The account trigger and its popover. Opens upward — it sits at the bottom of
 * the sidebar — and animates with a spring on the way in, a shorter ease on the
 * way out, so dismissing feels immediate.
 */
export function SidebarUserMenu() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { plan, reset } = useBilling();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function goToAccount() {
    setOpen(false);
    router.push("/account");
  }

  function handleSignOut() {
    setOpen(false);
    reset();
    signOut();
    router.push("/cv");
  }

  return (
    <div ref={containerRef} className="relative border-t border-ink/10 pt-3">
      <div
        role="menu"
        aria-hidden={!open}
        className={cn(
          "absolute right-0 bottom-[calc(100%+8px)] left-0 z-30 flex origin-bottom flex-col",
          "rounded-xl border-hair border-ink bg-surface p-1.5 shadow-menu",
          "motion-reduce:transition-none",
          open
            ? "visible translate-y-0 scale-100 opacity-100 transition-[opacity,transform] duration-200 ease-[cubic-bezier(.2,1.3,.4,1)]"
            : "invisible translate-y-1.5 scale-97 opacity-0 transition-[opacity,transform,visibility] duration-130 ease-out",
        )}
      >
        <MenuItem onClick={goToAccount} icon={<PersonIcon />} disabled={!open}>
          Profile
        </MenuItem>
        <span className="mx-2 my-0.75 h-px bg-ink/10" />
        <MenuItem onClick={handleSignOut} icon={<LogoutIcon />} danger disabled={!open}>
          Log out
        </MenuItem>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors duration-150",
          open ? "bg-surface-alt" : "bg-transparent hover:bg-surface-alt",
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-ink text-[13px] font-bold text-on-ink">
          {ACCOUNT_PROFILE.initials}
        </span>
        <span className="min-w-0 flex-1 leading-[1.25]">
          <span className="block text-[13.5px] font-bold">{ACCOUNT_PROFILE.name}</span>
          <span className="block text-xs text-faint">{PLAN_LABEL[plan]}</span>
        </span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn(
            "shrink-0 text-faint transition-transform duration-200 ease-[cubic-bezier(.2,1.1,.4,1)] motion-reduce:transition-none",
            open ? "rotate-0" : "rotate-180",
          )}
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}

function MenuItem({
  children,
  icon,
  onClick,
  danger,
  disabled,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  /** Keeps the closed menu out of the tab order without unmounting it. */
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "flex w-full items-center gap-2.75 rounded-md px-3 py-2.75 text-left text-[13.5px] font-semibold transition-colors duration-120",
        danger ? "text-danger hover:bg-danger-tint" : "text-ink hover:bg-surface-alt",
      )}
    >
      <span className="shrink-0">{icon}</span>
      {children}
    </button>
  );
}

function PersonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
