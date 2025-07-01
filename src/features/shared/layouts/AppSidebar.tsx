import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, type To } from "react-router-dom";
import { ChevronRight, CircleIcon, Languages } from "lucide-react";
import { motion } from "motion/react";

import { LogoutConfirmDialog } from "@/components/LogoutConfirmDialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
  SidebarRail,
  SidebarTrigger,
  SidebarContent,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

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
}

export function AppSidebar({ navigationItems, ...props }: AppSidebarProps) {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const logout = useAuthStore((store) => store.logout);
  const clearUserType = useUserPreferenceStore((store) => store.clearUserType);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const logoutHandler = () => {
    setShowLogoutDialog(false);
    logout();
    clearUserType();
    navigate("/login", { replace: true });
  };

  const changeLanguage = async (lang: string) => {
    if (currentLanguage === lang || isTranslating) {
      return;
    }

    setIsTranslating(true);

    try {
      await i18n.changeLanguage(lang);
      console.log(`Language changed to: ${lang}`);
    } catch (error) {
      console.error("Language change error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Component to handle individual text animations
  const AnimatedText = ({
    children,
    className,
  }: {
    children: string;
    className?: string;
  }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
      if (textRef.current) {
        setTextWidth(textRef.current.scrollWidth);
      }
    }, [children]);

    return (
      <>
        {/* Hidden span to measure text width */}
        <span
          ref={textRef}
          className={cn("invisible absolute whitespace-nowrap", className)}
          aria-hidden="true"
        >
          {children}
        </span>
        {/* Animated container */}
        <motion.div
          initial={false}
          animate={{
            width: state === "collapsed" ? 0 : textWidth,
          }}
          transition={{
            duration: state === "collapsed" ? 0.3 : 0.4,
            ease:
              state === "collapsed"
                ? [0.6, 0.04, 0.98, 0.335]
                : [0.175, 0.885, 0.32, 1.275],
            type: "tween",
          }}
          className="overflow-hidden"
          style={{ display: "inline-block" }}
        >
          <motion.span
            className={cn("whitespace-nowrap", className)}
            animate={{
              opacity: state === "collapsed" ? 0 : 1,
              x: state === "collapsed" ? -10 : 0,
            }}
            transition={{
              opacity: {
                duration: state === "collapsed" ? 0.2 : 0.3,
                delay: state === "collapsed" ? 0 : 0.15,
                ease: state === "collapsed" ? "easeIn" : "easeOut",
              },
              x: {
                duration: state === "collapsed" ? 0.25 : 0.35,
                delay: state === "collapsed" ? 0 : 0.1,
                ease:
                  state === "collapsed"
                    ? [0.55, 0.085, 0.68, 0.53]
                    : [0.25, 0.46, 0.45, 0.94],
              },
            }}
          >
            {children}
          </motion.span>
        </motion.div>
      </>
    );
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center">
          {state === "collapsed" ? (
            <SidebarTrigger className="size-8 text-white" />
          ) : (
            <img src="/logo.png" alt="logo" className="my-2 w-32" />
          )}
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
                    {state === "collapsed" ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            className={cn(
                              "group-data-[state=open]/collapsible:bg-sidebar-accent transition-all duration-300 ease-in-out group-data-[state=open]/collapsible:rounded-b-none",
                              "justify-center",
                            )}
                          >
                            <img
                              src={`/icons/${item.icon}`}
                              alt={item.title}
                              className="max-h-4 max-w-4 flex-shrink-0 transition-all duration-300"
                            />
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{t(item.title)}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <SidebarMenuButton
                        className={cn(
                          "group-data-[state=open]/collapsible:bg-sidebar-accent transition-all duration-300 ease-in-out group-data-[state=open]/collapsible:rounded-b-none",
                          "pl-5",
                        )}
                      >
                        <img
                          src={`/icons/${item.icon}`}
                          alt={item.title}
                          className="max-h-4 max-w-4 flex-shrink-0 transition-all duration-300"
                        />
                        <AnimatedText className="text-white">
                          {item.title}
                        </AnimatedText>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    )}
                  </CollapsibleTrigger>

                  {state !== "collapsed" && (
                    <CollapsibleContent className="bg-sidebar-accent rounded-b-md">
                      <SidebarMenuSub className="border-0 p-0">
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <NavLink
                              to={subItem.url}
                              className="flex items-center gap-2 text-sm"
                            >
                              {({ isActive }) => (
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive}
                                >
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
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <NavLink
                  className={cn(
                    "flex",
                    state === "collapsed" && "justify-center p-0",
                  )}
                  to={(item as SidebarItemWithoutSubItems).url}
                  end
                >
                  {({ isActive }) => (
                    <>
                      {state === "collapsed" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              size="lg"
                              className={cn(
                                "m-0! transition-all duration-300 ease-in-out",
                                "justify-center rounded-md",
                              )}
                              isActive={isActive}
                            >
                              <img
                                src={`/icons/${item.icon}`}
                                alt={item.title}
                                className="max-h-4 max-w-4 flex-shrink-0 transition-all duration-300"
                              />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{t(item.title.toLowerCase())}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton
                          size="lg"
                          className={cn(
                            "m-0! transition-all duration-300 ease-in-out",
                            "pl-5",
                          )}
                          isActive={isActive}
                        >
                          <img
                            src={`/icons/${item.icon}`}
                            alt={item.title}
                            className="max-h-4 max-w-4 flex-shrink-0 transition-all duration-300"
                          />
                          <AnimatedText className="text-white">
                            {t(item.title.toLowerCase())}
                          </AnimatedText>
                        </SidebarMenuButton>
                      )}
                    </>
                  )}
                </NavLink>
              </SidebarMenuItem>
            );
          })}

          <SidebarMenuItem className="flex justify-center">
            {state === "collapsed" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className={cn(
                          "transition-all duration-300 ease-in-out",
                          "justify-center",
                        )}
                        disabled={isTranslating}
                      >
                        {isTranslating ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <Languages className="h-4 w-4 text-white" />
                        )}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="w-32">
                      <DropdownMenuItem onClick={() => changeLanguage("en")}>
                        🇺🇸 {t("english")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage("es")}>
                        🇪🇸 {t("spanish")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage("fr")}>
                        🇫🇷 {t("french")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t("language")}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      "pl-5",
                    )}
                    disabled={isTranslating}
                  >
                    {isTranslating ? (
                      <div className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Languages className="h-4 w-4 flex-shrink-0 text-white" />
                    )}
                    <AnimatedText className="text-base text-white">
                      {isTranslating ? t("translating") : t("language")}
                    </AnimatedText>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-32">
                  <DropdownMenuItem onClick={() => changeLanguage("en")}>
                    🇺🇸 {t("english")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage("es")}>
                    🇪🇸 {t("spanish")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage("fr")}>
                    🇫🇷 {t("french")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem className="flex justify-center">
            {state === "collapsed" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      "justify-center",
                    )}
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <img
                      src={"/icons/logout.png"}
                      alt="logout"
                      className="max-h-4 max-w-4 flex-shrink-0 transition-all duration-300"
                    />
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t("logout")}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <SidebarMenuButton
                size="lg"
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  "pl-5",
                )}
                onClick={() => setShowLogoutDialog(true)}
              >
                <img
                  src={"/icons/logout.png"}
                  alt="logout"
                  className="max-h-4 max-w-4 flex-shrink-0 transition-all duration-300"
                />
                <AnimatedText className="text-base text-white">
                  {t("logout")}
                </AnimatedText>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={logoutHandler}
      />
    </Sidebar>
  );
}
