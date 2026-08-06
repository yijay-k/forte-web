import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/features/auth/auth-provider";
import { BillingProvider } from "@/features/billing/billing-provider";
import { ClaimsProvider } from "@/features/revise/claims-provider";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthProvider>
      <BillingProvider>
        <ClaimsProvider>
          <AppShell>{children}</AppShell>
        </ClaimsProvider>
      </BillingProvider>
    </AuthProvider>
  );
}
