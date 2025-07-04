import { type SidebarItem } from "@/features/shared/layouts/AppSidebar";

// Tenant navigation items
export const tenantNavigation: SidebarItem[] = [
  {
    icon: "dashboard.png",
    title: "sidebar.dashboard",
    url: "/tenant",
  },
  {
    title: "sidebar.messages",
    icon: "message.png",
    url: "/tenant/messages",
  },
  {
    title: "sidebar.maintenance",
    icon: "maintenance.png",
    url: "/tenant/maintenance",
  },
  {
    title: "sidebar.leases",
    icon: "lease.png",
    url: "/tenant/leases",
  },
  {
    title: "sidebar.documents",
    icon: "documents.png",
    url: "/tenant/documents",
  },
  {
    title: "sidebar.signDocuments",
    icon: "sign-documents.png",
    url: "/tenant/sign-documents",
  },
  {
    title: "sidebar.payments",
    icon: "finance.png",
    url: "/tenant/payments",
  },
  {
    title: "sidebar.notification",
    icon: "notification.png",
    url: "/tenant/notification",
  },
  {
    title: "sidebar.help",
    icon: "help.png",
    url: "/tenant/help",
  },
  {
    title: "sidebar.settings",
    icon: "setting.png",
    url: "/tenant/settings",
  },
];
