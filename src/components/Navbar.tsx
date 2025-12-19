// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Definisi Props
type NavbarProps = {
  logoUrl?: string | null;
  namaDesa?: string;
};

export default function Navbar({ logoUrl, namaDesa }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // LOGIKA 1: Sembunyi di Studio
  if (pathname.startsWith("/studio")) return null;

  const isHome = pathname === "/";
  const finalNamaDesa = namaDesa || "Desa Maju"; // Fallback default

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isHome && !scrolled ? "text-white" : "text-gray-800";
  const logoTextClass = isHome && !scrolled ? "text-white" : "text-green-900";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "pt-2" : "pt-0"
        }`}
      >
        <nav
          className={`transition-all duration-300 flex items-center justify-between px-6 ${
            scrolled
              ? "w-[95%] md:w-[85%] max-w-5xl bg-white/90 backdrop-blur-md shadow-lg rounded-full py-3 border border-white/20"
              : "w-full max-w-7xl py-6 bg-transparent"
          }`}
        >
          {/* --- LOGO DINAMIS --- */}
          <Link href="/" className="flex items-center gap-3 group">
            {logoUrl ? (
              <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden">
                <Image 
                  src={logoUrl} 
                  alt="Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
            ) : (
              // Icon Default kalau belum upload logo
              <div className={`p-1.5 rounded-lg transition-colors ${
                  isHome && !scrolled ? "bg-white/20 text-white" : "bg-green-600 text-white"
              }`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
                </svg>
              </div>
            )}
            
            <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${logoTextClass}`}>
              {finalNamaDesa}
            </span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { name: "Beranda", href: "/" },
              { name: "Profil", href: "/profil" },
              { name: "Layanan", href: "/layanan" },
              { name: "Lembaga", href: "/lembaga" },
              { name: "APBDes", href: "/transparansi" },
              { name: "Berita", href: "/berita" },
              { name: "Potensi", href: "/potensi" },
              { name: "Kontak", href: "/kontak" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? scrolled || !isHome
                        ? "bg-green-100 text-green-700 font-semibold" 
                        : "bg-white/20 text-white font-semibold"
                      : scrolled || !isHome
                      ? "text-gray-600 hover:bg-gray-100 hover:text-green-700" 
                      : "text-gray-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${textColor} hover:bg-white/20`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {[
                { name: "Beranda", href: "/" },
                { name: "Profil", href: "/profil" },
                { name: "Layanan", href: "/layanan" },
                { name: "Lembaga", href: "/lembaga" },
                { name: "APBDes", href: "/transparansi" },
                { name: "Berita", href: "/berita" },
                { name: "Potensi", href: "/potensi" },
                { name: "Kontak", href: "/kontak" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold ${
                    pathname === link.href ? "text-green-600" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Pemerintah {finalNamaDesa}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}