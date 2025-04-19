
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
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}