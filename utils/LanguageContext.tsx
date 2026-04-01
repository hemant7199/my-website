"use client";

import { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

// ✅ SUPPORTED LANGUAGES (KEEP CODES)
type LangType = "en" | "de" | "es" | "fr" | "ja" | "zh";

interface LangContextType {
  lang: LangType;
  setLang: (l: LangType) => void;
  t: (key: string) => any;
}

// ✅ FULL LANGUAGE NAMES
export const languageLabels: Record<LangType, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  ja: "Japanese",
  zh: "Chinese",
};

const LanguageContext = createContext<LangContextType | null>(null);

export const LanguageProvider = ({ children }: any) => {
  const supported: LangType[] = ["en", "de", "es", "fr", "ja", "zh"];

  const getDefaultLang = (): LangType => {
    if (typeof window === "undefined") return "en";

    const saved = localStorage.getItem("lang") as LangType;
    if (saved && supported.includes(saved)) return saved;

    const browserLang = navigator.language.slice(0, 2) as LangType;
    return supported.includes(browserLang) ? browserLang : "en";
  };

  const [lang, setLangState] = useState<LangType>("en");

  useEffect(() => {
    setLangState(getDefaultLang());
  }, []);

  const setLang = (l: LangType) => {
    if (!supported.includes(l)) return;
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  // ✅ TRANSLATION FUNCTION (NESTED + FALLBACK)
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations?.[lang];

    for (let k of keys) {
      value = value?.[k];
    }

    if (!value) {
      let fallback: any = translations?.["en"];
      for (let k of keys) {
        fallback = fallback?.[k];
      }
      return fallback || key;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider missing");
  return context;
};