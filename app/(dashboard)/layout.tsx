import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/query/getSession";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
