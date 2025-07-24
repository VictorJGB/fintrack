
// components
import { AppSidebar } from "@/components/app-sidebar";
import MainSidebarHeader from "@/components/header/sidebar/main-sidebar-header";
import AuthLayout from "@/components/layouts/auth-layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: Readonly<Props>) {
  return (
    <AuthLayout>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <MainSidebarHeader />
          <main className="flex size-full flex-col px-2 sm:px-6 py-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthLayout>
  )
}