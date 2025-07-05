import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enApplying from "@/locales/en/applying.json";
import en from "@/locales/en/common.json";
import enLandlord from "@/locales/en/landlord.json";
import enSidebar from "@/locales/en/sidebar.json";
import enTenant from "@/locales/en/tenant.json";
import es from "@/locales/es/common.json";
import esLandlord from "@/locales/es/landlord.json";
import esSidebar from "@/locales/es/sidebar.json";
import esTenant from "@/locales/es/tenant.json";
import fr from "@/locales/fr/common.json";
import frLandlord from "@/locales/fr/landlord.json";
import frSidebar from "@/locales/fr/sidebar.json";
import frTenant from "@/locales/fr/tenant.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: Object.assign(
          {},
          en,
          enTenant,
          enLandlord,
          enSidebar,
          enApplying,
        ),
      },
      es: {
        translation: Object.assign({}, es, esTenant, esLandlord, esSidebar),
      },
      fr: {
        translation: Object.assign({}, fr, frTenant, frLandlord, frSidebar),
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

export default i18n;
