// src/components/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop"
          alt="Pemandangan Desa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Konten Teks Tengah */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-green-600/80 backdrop-blur-sm text-sm font-semibold mb-4 border border-green-400">
            Selamat Datang di Website Resmi
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Desa Maju, Kecamatan Sejahtera
            <br />
            <span className="text-green-400">Kabupaten Indonesia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Mewujudkan desa yang mandiri, transparan, dan berdaya saing melalui teknologi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/profil"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2"
            >
              Tentang Kami <ArrowRight size={20} />
            </Link>
            <Link 
              href="/potensi"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
            >
              Jelajahi Potensi <MapPin size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}