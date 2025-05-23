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
import { NavLink, type To } from "react-router-dom";

export type SidebarSubItem = {
  title: string;
  url: To;
};

export type SidebarItemWithSubItems = {
  title: string;
  icon: string;
  items: SidebarSubItem[];
  url?: never;
};

export type SidebarItemWithoutSubItems = {
  title: string;
  icon: string;
  url: To;
};

export type SidebarItem = SidebarItemWithSubItems | SidebarItemWithoutSubItems;

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navigationItems: SidebarItem[];
  onLogout?: () => void;
}

export function AppSidebar({
  navigationItems,
  onLogout,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 py-2">
          <img src="/logo.png" alt="logo" className="w-32" />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu className="gap-0">
          {navigationItems.map((item) => {
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
                                <CircleIcon className="fill-primary size-2!" />
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
                <NavLink to={(item as SidebarItemWithoutSubItems).url} end>
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
            <SidebarMenuButton
              size="lg"
              className="gap-3 pl-6"
              onClick={onLogout}
            >
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
