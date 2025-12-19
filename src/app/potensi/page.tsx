// src/app/potensi/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// Ambil data potensi
async function getPotensi() {
  const query = `*[_type == "potensi"] | order(_createdAt desc) {
    judul,
    kategori,
    gambar,
    deskripsi
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function PotensiPage() {
  const dataPotensi = await getPotensi();

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <div className="bg-green-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Potensi Desa</h1>
        <p className="text-gray-600 max-w-xl mx-auto px-4">
          Menjelajahi kekayaan alam, produk kreatif, dan hasil bumi kebanggaan desa kami.
        </p>
      </div>

      {/* Grid Galeri */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {dataPotensi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataPotensi.map((item: any, index: number) => (
              <div key={index} className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                
                {/* Gambar dengan Efek Zoom saat Hover */}
                <div className="relative h-64 w-full overflow-hidden">
                  {item.gambar ? (
                    <Image
                      src={urlFor(item.gambar).url()}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
                  )}
                  {/* Badge Kategori */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm uppercase tracking-wide">
                    {item.kategori}
                  </div>
                </div>

                {/* Deskripsi */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-20">Belum ada data potensi yang ditambahkan.</p>
        )}
      </div>
    </div>
  );
}