import type { CoachingSession, UsageRow } from "@/types/account";
import type { PlanId, Receipt } from "@/types/billing";

export const ACCOUNT_PROFILE = {
  name: "Alex Chen",
  initials: "AC",
  email: "alex.chen@email.com",
  joined: "joined March 2026",
  signIn: "Continue with Google",
  cvFile: "resume_v3.pdf",
  cvUploaded: "Uploaded 2 Aug 2026",
} as const;

export const SAVED_CARD = {
  brand: "Link",
  network: "VISA",
  last4: "4419",
  holder: "Alex Chen",
  expires: "12 / 28",
} as const;

const ALL_USAGE: readonly UsageRow[] = [
  {
    id: "meridian",
    role: "Senior Product Designer",
    company: "Meridian",
    date: "2 Aug 2026",
    used: "Scorecard, 3 fixes, 1 interview, 3 rewrites",
    to: "89",
    fromLine: "from 82",
  },
  {
    id: "halden",
    role: "Product Designer",
    company: "Halden Health",
    date: "24 Jul 2026",
    used: "Scorecard, 3 fixes, 2 interviews",
    to: "80",
    fromLine: "from 71",
  },
  {
    id: "ostara",
    role: "Design Lead",
    company: "Ostara",
    date: "11 Jul 2026",
    used: "Scorecard only — no posting attached",
    to: "68",
    fromLine: "first score",
  },
];

const ALL_SESSIONS: readonly CoachingSession[] = [
  {
    id: "s1",
    claim: "The 34% activation number",
    where: "Meridian · bullet 4",
    date: "2 Aug 2026",
    spent: "20 min",
  },
  {
    id: "s2",
    claim: "Owning the analytics dashboard",
    where: "Meridian · bullet 3",
    date: "2 Aug 2026",
    spent: "14 min",
  },
  {
    id: "s3",
    claim: "Design-system governance",
    where: "Halden Health · summary",
    date: "25 Jul 2026",
    spent: "20 min",
  },
];

const ALL_RECEIPTS: readonly Receipt[] = [
  {
    id: "r1",
    what: "12 applications + 15 coaching sessions",
    date: "24 Jul 2026",
    amount: "$15.00",
  },
  {
    id: "r2",
    what: "3 applications + 3 coaching sessions",
    date: "11 Jul 2026",
    amount: "$7.00",
  },
];

/**
 * History is scoped to the plan: a free user has spent exactly one
 * application, has no coaching and has never been charged. Buying reveals the
 * history a paying account would have.
 */
export function getUsage(plan: PlanId): readonly UsageRow[] {
  return plan === "free" ? ALL_USAGE.slice(0, 1) : ALL_USAGE;
}

export function getSessions(plan: PlanId): readonly CoachingSession[] {
  if (plan === "free") return [];
  return plan === "starter" ? ALL_SESSIONS.slice(0, 2) : ALL_SESSIONS;
}

export function getReceipts(plan: PlanId): readonly Receipt[] {
  if (plan === "free") return [];
  return plan === "starter" ? ALL_RECEIPTS.slice(1) : ALL_RECEIPTS;
}

export function receiptTotal(receipts: readonly Receipt[]): string {
  const total = receipts.reduce(
    (sum, r) => sum + Number.parseFloat(r.amount.replace("$", "")),
    0,
  );
  return `$${total.toFixed(2)}`;
}
