// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Mail, Phone, MapPin, ChevronRight, Youtube, Twitter } from "lucide-react";

type FooterProps = {
  namaDesa?: string;
  alamat?: string;
};

export default function Footer({ namaDesa, alamat }: FooterProps) {
  const pathname = usePathname();

  // Sembunyikan Footer jika berada di halaman Sanity Studio
  if (pathname.startsWith("/studio")) return null;

  const finalNama = namaDesa || "Desa Maju";
  const finalAlamat = alamat || "Jl. Raya Desa No. 123";

  return (
    <footer className="bg-gray-950 text-gray-400 py-20 font-sans border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Kolom 1: Identitas & Sosmed (Lebih Lebar: 5 kolom) */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Pemerintah <span className="text-emerald-500">{finalNama}</span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm max-w-md">
              Mengabdi dengan integritas, melayani dengan hati. Mewujudkan desa yang mandiri, sejahtera, dan transparan melalui digitalisasi pelayanan publik.
            </p>
            
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <Link 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                    <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat (3 kolom) */}
          <div className="md:col-span-3 md:pl-8">
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Akses Cepat</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Profil Desa", href: "/profil" },
                { name: "Layanan Publik", href: "/layanan" },
                { name: "Lembaga Desa", href: "/lembaga" },
                { name: "Statistik Data", href: "/statistik" },
                { name: "Transparansi Dana", href: "/transparansi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 hover:text-emerald-400 transition-all duration-300 group"
                  >
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-emerald-500 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak (4 kolom) */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Hubungi Kami</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 text-emerald-500">
                    <MapPin size={18} />
                </div>
                <span className="leading-relaxed">{finalAlamat}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 text-emerald-500">
                    <Phone size={18} />
                </div>
                <span>(021) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 text-emerald-500">
                    <Mail size={18} />
                </div>
                <span>admin@{finalNama.replace(/\s+/g, '').toLowerCase()}.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Pemerintah {finalNama}. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-300">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-gray-300">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}