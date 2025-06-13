
// components
import { AppSidebar } from "@/components/app-sidebar";
import MainSidebarHeader from "@/components/header/sidebar/main-sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: Readonly<Props>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MainSidebarHeader />
        <main className="flex size-full flex-col px-6 py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}