import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/features/auth/auth-provider";
import { ClaimsProvider } from "@/features/revise/claims-provider";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthProvider>
      <ClaimsProvider>
        <AppShell>{children}</AppShell>
      </ClaimsProvider>
    </AuthProvider>
  );
}
