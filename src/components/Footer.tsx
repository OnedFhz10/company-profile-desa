// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

// Terima props namaDesa dan alamat
type FooterProps = {
  namaDesa?: string;
  alamat?: string;
};

export default function Footer({ namaDesa, alamat }: FooterProps) {
  const pathname = usePathname();

  // Sembunyi di Studio
  if (pathname.startsWith("/studio")) return null;

  const finalNama = namaDesa || "Desa Maju";
  const finalAlamat = alamat || "Jl. Raya Desa No. 123";

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Kolom 1 */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Pemerintah <span className="text-green-500">{finalNama}</span>
          </h3>
          <p className="leading-relaxed mb-6">
            Mewujudkan pemerintahan desa yang transparan, akuntabel, dan melayani masyarakat.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-green-400"><Facebook size={24} /></Link>
            <Link href="#" className="hover:text-green-400"><Instagram size={24} /></Link>
          </div>
        </div>

        {/* Kolom 2 */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6">Tautan Cepat</h4>
          <ul className="space-y-3">
            <li><Link href="/profil" className="hover:text-green-400">Profil Desa</Link></li>
            <li><Link href="/layanan" className="hover:text-green-400">Layanan Publik</Link></li>
            <li><Link href="/transparansi" className="hover:text-green-400">APBDes</Link></li>
            <li><Link href="/berita" className="hover:text-green-400">Berita</Link></li>
          </ul>
        </div>

        {/* Kolom 3 */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6">Hubungi Kami</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <span>{finalAlamat}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-green-500 flex-shrink-0" size={20} />
              <span>(021) 123-4567</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Pemerintah {finalNama}. All rights reserved.</p>
      </div>
    </footer>
  );
}