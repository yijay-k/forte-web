import { SectionRule } from "@/components/ui/section-rule";
import { SettingRow } from "@/components/ui/setting-row";
import { ACCOUNT_PROFILE } from "@/lib/data/account";

const OUTLINE =
  "shrink-0 rounded-pill border-hair border-ink px-4.25 py-2.25 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-on-ink";
const SUBTLE =
  "shrink-0 rounded-pill border-hair border-line px-4.25 py-2.25 text-[13px] font-semibold transition-colors hover:border-ink";

export function SignInSection() {
  return (
    <section className="mb-11.5">
      <SectionRule note="Google">Sign-in</SectionRule>

      <div className="overflow-hidden rounded-xl border-hair border-line bg-surface">
        <SettingRow
          title={ACCOUNT_PROFILE.email}
          description="Where reports and receipts are sent"
          action={
            <button type="button" className={OUTLINE}>
              Change
            </button>
          }
        />
        <SettingRow
          title={ACCOUNT_PROFILE.signIn}
          description="No password on this account"
          last
          action={
            <button type="button" className={SUBTLE}>
              Add a password
            </button>
          }
        />
      </div>
    </section>
  );
}
