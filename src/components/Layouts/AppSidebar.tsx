import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, CircleIcon } from "lucide-react";
import { NavLink, type To } from "react-router";

type SidebarSubItem = {
  title: string;
  url: To;
};

type SidebarItemWithSubItems = {
  title: string;
  icon: string;
  items: SidebarSubItem[];
  url?: never;
};

type SidebarItemWithoutSubItems = {
  title: string;
  icon: string;
  url: To;
};

type SidebarItem = SidebarItemWithSubItems | SidebarItemWithoutSubItems;

// This is sample data.
const navMain: SidebarItem[] = [
  {
    icon: "dashboard.png",
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Messages",
    icon: "message.png",
    url: "/messages",
  },
  {
    title: "Maintenance",
    icon: "maintenance.png",
    url: "/maintenance",
  },
  {
    title: "Leases",
    icon: "lease.png",
    url: "/leases",
  },
  {
    title: "Documents",
    icon: "documents.png",
    url: "/documents",
  },
  {
    title: "Sign Documents",
    icon: "sign-documents.png",
    url: "/sign-documents",
  },
  {
    title: "Payments",
    icon: "finance.png",
    url: "/payments",
  },
  {
    title: "Notification",
    icon: "notification.png",
    url: "/notification",
  },
  {
    title: "Help",
    icon: "help.png",
    url: "/help",
  },
  {
    title: "Settings",
    icon: "setting.png",
    url: "/settings",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  //   const logoutHandler = async () => {
  //     toast.loading("Logging out...");
  //     wait(200).then(() => {
  //       logout();
  //       toast.dismiss();
  //     });
  //   };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 py-2">
          <img src="/logo.png" alt="logo" className="w-32" />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu className="gap-0">
          {navMain.map((item) => {
            const hasSubItems = "items" in item && item.items?.length > 0;

            return hasSubItems ? (
              <Collapsible
                key={item.title}
                title={item.title}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group-data-[state=open]/collapsible:bg-sidebar-accent group-data-[state=open]/collapsible:rounded-b-none">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="size-4"
                      />
                      {item.title}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent className="bg-sidebar-accent rounded-b-md">
                  <SidebarMenuSub className="border-0 p-0">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <NavLink
                          to={subItem.url}
                          className="flex items-center gap-2 text-sm"
                        >
                          {({ isActive }) => (
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <div>
                                <CircleIcon className="size-2! fill-primary" />
                                {subItem.title}
                              </div>
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <NavLink to={(item as SidebarItemWithoutSubItems).url}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      size="lg"
                      className="pl-5"
                      isActive={isActive}
                    >
                      <img
                        src={"/icons/" + item.icon}
                        alt={item.title}
                        className="size-4"
                      />

                      <span className="text-white"> {item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pl-6 gap-3">
              <img src={"/icons/logout.png"} alt="logout" className="size-4" />
              <span className="text-base text-white"> logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
