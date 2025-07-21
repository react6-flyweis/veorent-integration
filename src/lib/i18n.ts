/**
 * i18n configuration for the Veorent application with lazy loading
 * Supports English, Spanish, and French translations
 *
 * Features:
 * - Lazy loading of translation files to reduce initial bundle size
 * - Automatic language detection and persistence
 * - Utility functions for preloading and checking language availability
 *
 * Usage:
 * ```typescript
 * import i18n, { preloadLanguage, getSupportedLanguages } from '@/lib/i18n';
 *
 * // Preload a specific language
 * await preloadLanguage('es');
 *
 * // Get all supported languages
 * const languages = getSupportedLanguages();
 * ```
 */

import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Supported languages
const SUPPORTED_LANGUAGES = ["en", "es", "fr"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Translation file mappings for lazy loading
const translationFileMap = {
  en: {
    common: () => import("@/locales/en/common.json"),
    tenant: () => import("@/locales/en/tenant.json"),
    landlord: () => import("@/locales/en/landlord.json"),
    sidebar: () => import("@/locales/en/sidebar.json"),
    applying: () => import("@/locales/en/applying.json"),
    properties: () => import("@/locales/en/properties.json"),
  },
  es: {
    common: () => import("@/locales/es/common.json"),
    tenant: () => import("@/locales/es/tenant.json"),
    landlord: () => import("@/locales/es/landlord.json"),
    sidebar: () => import("@/locales/es/sidebar.json"),
    applying: () => import("@/locales/es/applying.json"),
    properties: () => import("@/locales/es/properties.json"),
  },
  fr: {
    common: () => import("@/locales/fr/common.json"),
    tenant: () => import("@/locales/fr/tenant.json"),
    landlord: () => import("@/locales/fr/landlord.json"),
    sidebar: () => import("@/locales/fr/sidebar.json"),
    applying: () => import("@/locales/fr/applying.json"),
    properties: () => import("@/locales/fr/properties.json"),
  },
} as const;

/**
 * Lazy load and merge all translation files for a specific language
 * @param lang - The language code to load translations for
 * @returns Promise that resolves to merged translations
 */
const loadLanguageTranslations = async (
  lang: SupportedLanguage,
): Promise<Record<string, unknown>> => {
  const files = translationFileMap[lang];

  try {
    const [common, tenant, landlord, sidebar, applying, properties] =
      await Promise.all([
        files.common(),
        files.tenant(),
        files.landlord(),
        files.sidebar(),
        files.applying(),
        files.properties(),
      ]);

    return {
      ...common.default,
      ...tenant.default,
      ...landlord.default,
      ...sidebar.default,
      ...applying.default,
      ...properties.default,
    };
  } catch (error) {
    console.error(`Failed to load translations for language: ${lang}`, error);
    throw error;
  }
};

// Initialize with basic configuration and lazy loading
const initI18n = async () => {
  // Load default language (English) translations
  const defaultTranslations = await loadLanguageTranslations("en");

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: defaultTranslations,
        },
      },
      fallbackLng: "en",
      debug: process.env.NODE_ENV === "development",

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },

      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });

  // Load other languages lazily when needed
  i18n.on("languageChanged", async (lng) => {
    const language = lng as SupportedLanguage;
    if (
      isSupportedLanguage(language) &&
      !i18n.hasResourceBundle(language, "translation")
    ) {
      try {
        const translations = await loadLanguageTranslations(language);
        i18n.addResourceBundle(language, "translation", translations);
      } catch (error) {
        console.error(`Failed to load language: ${language}`, error);
      }
    }
  });
};

// Initialize i18n
initI18n().catch((error) => {
  console.error("Failed to initialize i18n:", error);
});

export default i18n;

/**
 * Utility to get the list of supported languages
 * @returns Array of supported language codes
 */
export const getSupportedLanguages = (): readonly string[] =>
  SUPPORTED_LANGUAGES;

/**
 * Type guard to check if a language is supported
 * @param lang - Language code to check
 * @returns True if the language is supported
 */
export const isSupportedLanguage = (
  lang: string,
): lang is SupportedLanguage => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

/**
 * Preload translations for a specific language
 * @param lang - Language code to preload
 * @returns Promise that resolves when translations are loaded
 */
export const preloadLanguage = async (
  lang: SupportedLanguage,
): Promise<void> => {
  if (i18n.hasResourceBundle(lang, "translation")) {
    return; // Already loaded in i18next
  }

  try {
    const translations = await loadLanguageTranslations(lang);
    i18n.addResourceBundle(lang, "translation", translations);
  } catch (error) {
    console.error(`Failed to preload language: ${lang}`, error);
    throw error;
  }
};

/**
 * Preload all supported languages for better performance
 * @returns Promise that resolves when all languages are loaded
 */
export const preloadAllLanguages = async (): Promise<void> => {
  const promises = SUPPORTED_LANGUAGES.filter((lang) => lang !== "en").map(
    preloadLanguage,
  );
  await Promise.all(promises);
};

/**
 * Check if a language is currently loaded
 * @param lang - Language code to check
 * @returns True if the language is loaded
 */
export const isLanguageLoaded = (lang: SupportedLanguage): boolean => {
  return i18n.hasResourceBundle(lang, "translation");
};
