// src/app/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";

// Fungsi untuk mengambil data (Query GROQ)
async function getBerita() {
  const query = `*[_type == "berita"] | order(tanggalTerbit desc)[0...3] {
    judul,
    slug,
    gambarUtama,
    tanggalTerbit
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const dataBerita = await getBerita(); // Panggil data

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Tampilkan Hero Section yang tadi dipisah */}
      <HeroSection />

      {/* 2. Statistik Singkat */}
      <section className="py-12 bg-white -mt-10 relative z-20 rounded-t-3xl shadow-xl mx-4 md:mx-10 lg:mx-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
            <div className="p-4"><h3 className="text-4xl font-bold text-green-700 mb-2">1.250</h3><p className="text-gray-600">Penduduk</p></div>
            <div className="p-4 border-l border-gray-200"><h3 className="text-4xl font-bold text-green-700 mb-2">450</h3><p className="text-gray-600">KK</p></div>
            <div className="p-4 border-l border-gray-200"><h3 className="text-4xl font-bold text-green-700 mb-2">5</h3><p className="text-gray-600">Dusun</p></div>
        </div>
      </section>

      {/* 3. Bagian Berita Terbaru (DARI SANITY) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kabar Desa Terbaru</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataBerita.map((berita: any) => (
              <div key={berita.slug.current} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                {/* Gambar Berita */}
                <div className="relative h-48 w-full">
                  {berita.gambarUtama && (
                    <Image
                      src={urlFor(berita.gambarUtama).url()} // Konversi URL gambar
                      alt={berita.judul}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                {/* Konten Teks */}
                <div className="p-6">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    {new Date(berita.tanggalTerbit).toLocaleDateString("id-ID", {
                      dateStyle: "long",
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {berita.judul}
                  </h3>
                  <Link href={`/berita/${berita.slug.current}`} className="text-green-700 font-semibold hover:underline mt-4 inline-block">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Jika belum ada berita */}
          {dataBerita.length === 0 && (
            <p className="text-center text-gray-500">Belum ada berita yang diterbitkan.</p>
          )}

        </div>
      </section>
    </div>
  );
}