"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: "en",
      fallbackLng: "en",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources: {}, // ✅ no import
    });
}

export default i18n;