import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AgencyStoreHydrator } from "@/components/store-hydrator/agency-store-hydrator";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.user.findUnique({
    where: { id: session?.session.userId },
    select: { userType: true },
  });
  const agency =
    user?.userType === "AGENCY_OWNER"
      ? await prisma.agency.findUnique({
          where: { userId: session?.session.userId },
          include: { projects: true, members: true },
        })
      : null;
  

  return (
    <SidebarProvider>
      <AgencyStoreHydrator agency={agency}/>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
