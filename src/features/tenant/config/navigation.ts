import { type SidebarItem } from "@/features/shared/layouts/AppSidebar";

// Tenant navigation items
export const tenantNavigation: SidebarItem[] = [
  {
    icon: "dashboard.png",
    title: "Dashboard",
    url: "/tenant",
  },
  {
    title: "Messages",
    icon: "message.png",
    url: "/tenant/messages",
  },
  {
    title: "Maintenance",
    icon: "maintenance.png",
    url: "/tenant/maintenance",
  },
  {
    title: "Leases",
    icon: "lease.png",
    url: "/tenant/leases",
  },
  {
    title: "Documents",
    icon: "documents.png",
    url: "/tenant/documents",
  },
  {
    title: "Sign Documents",
    icon: "sign-documents.png",
    url: "/tenant/sign-documents",
  },
  {
    title: "Payments",
    icon: "finance.png",
    url: "/tenant/payments",
  },
  {
    title: "Notification",
    icon: "notification.png",
    url: "/tenant/notification",
  },
  {
    title: "Help",
    icon: "help.png",
    url: "/tenant/help",
  },
  {
    title: "Settings",
    icon: "setting.png",
    url: "/tenant/settings",
  },
];
