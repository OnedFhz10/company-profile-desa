// src/app/lembaga/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Users } from "lucide-react";

async function getLembaga() {
  const query = `*[_type == "lembaga"] | order(nama asc) {
    nama,
    singkatan,
    ketua,
    logo,
    deskripsi
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function LembagaPage() {
  const dataLembaga = await getLembaga();

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lembaga Desa</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mitra kerja pemerintah desa dalam memberdayakan masyarakat dan membangun desa yang lebih mandiri.
          </p>
        </div>

        {/* Grid Lembaga */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataLembaga.length > 0 ? (
            dataLembaga.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center">
                
                {/* Logo Lembaga */}
                <div className="w-24 h-24 mb-6 relative">
                  {item.logo ? (
                    <Image
                      src={urlFor(item.logo).url()}
                      alt={item.nama}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Users size={32} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.nama}</h3>
                {item.singkatan && <p className="text-sm text-green-600 font-semibold mb-4">{item.singkatan}</p>}
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {item.deskripsi || "Lembaga mitra strategis pemerintah desa dalam bidang pemberdayaan."}
                </p>

                {/* Ketua */}
                <div className="mt-auto w-full pt-4 border-t border-gray-50">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Ketua Lembaga</p>
                  <p className="text-gray-800 font-medium">{item.ketua}</p>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">Belum ada data lembaga yang diinput.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}