import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { tenantNavigation } from "@/features/tenant/config/navigation";
import { landlordNavigation } from "@/features/landlord/config/navigation";

export function DashboardLayout() {
  const location = useLocation();
  const isLandlord = location.pathname.startsWith("/landlord");

  // Use the appropriate navigation config based on the route
  const navigationItems = isLandlord ? landlordNavigation : tenantNavigation;

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <SidebarProvider>
      <AppSidebar navigationItems={navigationItems} onLogout={handleLogout} />
      <SidebarInset>
        <main className="p-10 h-full flex flex-col">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
