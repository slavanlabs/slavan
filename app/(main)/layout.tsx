import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">{children}</SidebarInset>
    </SidebarProvider>
  );
}
