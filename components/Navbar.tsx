"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  
  const [mobileMenu, setMobileMenu] = useState(false);
  

 

 

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