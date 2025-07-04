import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { SidebarMenuButton } from "./sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const LANGUAGES = [
  { code: "en", label: "english", flag: "🇺🇸" },
  { code: "es", label: "spanish", flag: "🇪🇸" },
  { code: "fr", label: "french", flag: "🇫🇷" },
];

interface LanguageSelectorProps {
  collapsed: boolean;
}

export function LanguageSelector({ collapsed }: LanguageSelectorProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [isTranslating, setIsTranslating] = useState(false);

  const changeLanguage = async (lang: string) => {
    if (currentLanguage === lang || isTranslating) return;
    setIsTranslating(true);
    try {
      await i18n.changeLanguage(lang);
      // Optionally: show a toast or feedback
    } catch {
      // Optionally: handle error
    } finally {
      setIsTranslating(false);
    }
  };

  return collapsed ? (
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
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  currentLanguage === lang.code && "bg-primary text-white",
                )}
              >
                {lang.flag} {t(lang.label)}
              </DropdownMenuItem>
            ))}
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
          className={cn("transition-all duration-300 ease-in-out", "pl-5")}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <div className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Languages className="h-4 w-4 flex-shrink-0 text-white" />
          )}
          <span className="ml-2 text-base text-white">
            {isTranslating ? t("translating") : t("language")}
          </span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-32">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              currentLanguage === lang.code && "bg-primary text-white",
            )}
          >
            {lang.flag} {t(lang.label)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
