import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { tenantNavigation } from "@/features/tenant/config/navigation";
import { landlordNavigation } from "@/features/landlord/config/navigation";
import { ToastProvider } from "@/contexts/ToastContext";
import { useIsMobile, useScreenSize } from "@/hooks/use-screen-size";

export function DashboardLayout() {
  const location = useLocation();
  const isLandlord = location.pathname.startsWith("/landlord");

  // Use the appropriate navigation config based on the route
  const navigationItems = isLandlord ? landlordNavigation : tenantNavigation;

  const isMobile = useIsMobile();
  const screenSize = useScreenSize();

  // Determine sidebar behavior based on screen size
  const getSidebarProps = () => {
    if (isMobile) {
      // Mobile: Use offcanvas (sheet), no collapsible icon
      return {
        collapsible: "offcanvas" as const,
        defaultOpen: false,
      };
    } else if (screenSize === "tablet") {
      // Tablet: Default collapsed with icon
      return {
        collapsible: "icon" as const,
        defaultOpen: false,
      };
    } else {
      // Desktop: Default expanded with icon capability
      return {
        collapsible: "icon" as const,
        defaultOpen: true,
      };
    }
  };

  const sidebarProps = getSidebarProps();

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <SidebarProvider defaultOpen={sidebarProps.defaultOpen}>
      <ToastProvider>
        <AppSidebar
          collapsible={sidebarProps.collapsible}
          navigationItems={navigationItems}
          onLogout={handleLogout}
        />
        <SidebarInset className="@container flex flex-1 flex-col p-5 md:p-10">
          {
            // Show sidebar trigger only on mobile devices
            isMobile && <SidebarTrigger className="md:hidden" />
          }
          <Outlet />
        </SidebarInset>
      </ToastProvider>
    </SidebarProvider>
  );
}
