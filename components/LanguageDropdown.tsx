"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { label: "English", code: "en" },
    { label: "Español", code: "es" },
    { label: "Français", code: "fr" },
    { label: "Deutsch", code: "de" },
    { label: "Italiano", code: "it" },
    { label: "Português", code: "pt" },
    { label: "Nederlands", code: "nl" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language)?.label || "English";

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code); // 🔥 instant translation
    setOpen(false);
  };

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="border px-3 py-2 rounded bg-white text-sm hover:bg-gray-100"
      >
        {currentLang} ▼
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">

          {languages.map((l, i) => (
            <div
              key={i}
              onClick={() => handleSelect(l.code)}
              className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                i18n.language === l.code ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {l.label}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}