// src/app/berita/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

// Ambil semua berita, urutkan dari yang terbaru
async function getAllBerita() {
  const query = `*[_type == "berita"] | order(tanggalTerbit desc) {
    judul,
    slug,
    gambarUtama,
    tanggalTerbit
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function BeritaPage() {
  const dataBerita = await getAllBerita();

  return (
    // PENTING: pt-24 diberikan agar konten tidak tertutup Navbar yang fixed
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kabar Desa</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru, kegiatan masyarakat, dan pengumuman resmi dari pemerintah desa.
          </p>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataBerita.length > 0 ? (
            dataBerita.map((item: any) => (
              <Link 
                href={`/berita/${item.slug.current}`} 
                key={item.slug.current}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Gambar Thumbnail */}
                <div className="relative h-56 w-full overflow-hidden">
                  {item.gambarUtama ? (
                    <Image
                      src={urlFor(item.gambarUtama).url()}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {/* Overlay tanggal */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-green-800 shadow-sm flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(item.tanggalTerbit).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Konten Teks */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                    {item.judul}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Baca Selengkapnya <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">Belum ada berita yang diterbitkan.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}