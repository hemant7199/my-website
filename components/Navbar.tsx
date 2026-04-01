"use client";

import { useLanguage } from "../utils/LanguageContext"; // adjust path
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 py-4">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          BLACKLINE
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* LANGUAGE */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border px-2 py-1 rounded text-sm"
            >
              {lang.toUpperCase()} ▾
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow rounded w-44 z-50">

                <p onClick={() => setLang("en")} className="p-2 hover:bg-gray-100 cursor-pointer">
                  English
                </p>

                <p onClick={() => setLang("es")} className="p-2 hover:bg-gray-100 cursor-pointer">
                  Español
                </p>

                <p onClick={() => setLang("fr")} className="p-2 hover:bg-gray-100 cursor-pointer">
                  Français
                </p>

                <p onClick={() => setLang("de")} className="p-2 hover:bg-gray-100 cursor-pointer">
                  Deutsch
                </p>

                <p onClick={() => setLang("ja")} className="p-2 hover:bg-gray-100 cursor-pointer">
                  日本語
                </p>

                <p onClick={() => setLang("zh")} className="p-2 hover:bg-gray-100 cursor-pointer">
                  简体中文
                </p>

              </div>
            )}
          </div>

          {/* LOGIN / USER */}
          {!user ? (
            <Link href="/login">
              <button className="border px-3 py-1 rounded-full text-sm">
                SIGN IN
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="border px-3 py-1 rounded-full text-sm"
              >
                {user.firstName || "User"}
              </button>

              {userMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                  <Link href="/rides" className="block px-4 py-3 hover:bg-gray-100">
                    Rides
                  </Link>

                  <Link href="/account" className="block px-4 py-3 hover:bg-gray-100">
                    My Account
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-2xl md:hidden"
          >
            ☰
          </button>

        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex justify-center gap-10 py-3 border-t">
        <Link href="/services">Travel Services</Link>
        <Link href="/overview">Overview</Link>
        <Link href="/help">Help & Support</Link>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <Link href="/services" className="block">Travel Services</Link>
          <Link href="/overview" className="block">Overview</Link>
          <Link href="/help" className="block">Help & Support</Link>
        </div>
      )}

    </nav>
  );
}