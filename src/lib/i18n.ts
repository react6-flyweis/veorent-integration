import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      properties: "Properties",
      tenants: "Tenants",
      maintenance: "Maintenance",
      finances: "Finances",
      documents: "Documents",
      messages: "Messages",
      notifications: "Notifications",
      settings: "Settings",
      help: "Help",
      logout: "Logout",
      language: "Language",

      // Common actions
      translating: "Translating...",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      filter: "Filter",

      // Messages
      confirmLogout: "Are you sure you want to logout?",
      logoutSuccess: "Successfully logged out",

      // Languages
      english: "English",
      spanish: "Spanish",
    },
  },
  es: {
    translation: {
      // Navigation
      dashboard: "Tablero",
      properties: "Propiedades",
      tenants: "Inquilinos",
      maintenance: "Mantenimiento",
      finances: "Finanzas",
      documents: "Documentos",
      messages: "Mensajes",
      notifications: "Notificaciones",
      settings: "Configuración",
      help: "Ayuda",
      logout: "Cerrar Sesión",
      language: "Idioma",

      // Common actions
      translating: "Traduciendo...",
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      delete: "Eliminar",
      edit: "Editar",
      add: "Agregar",
      search: "Buscar",
      filter: "Filtrar",

      // Messages
      confirmLogout: "¿Estás seguro de que quieres cerrar sesión?",
      logoutSuccess: "Sesión cerrada exitosamente",

      // Languages
      english: "Inglés",
      spanish: "Español",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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
