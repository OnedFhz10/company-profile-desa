// src/app/profil/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

// 1. Ambil Data Gabungan (Profil Text + Perangkat)
async function getData() {
  // Update Query: Ambil juga namaKepalaDesa, fotoKepalaDesa, dan sambutan
  const queryProfil = `*[_type == "profilDesa"][0] {
    namaKepalaDesa,
    fotoKepalaDesa,
    sambutan,
    sejarah,
    visi,
    misi
  }`;
  
  const queryPerangkat = `*[_type == "perangkat"] | order(_createdAt asc) {
    nama,
    jabatan,
    foto
  }`;

  const [profil, perangkat] = await Promise.all([
    client.fetch(queryProfil),
    client.fetch(queryPerangkat)
  ]);

  return { profil, perangkat };
}

export default async function ProfilPage() {
  const { profil, perangkat } = await getData();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      
      {/* --- Header Profil --- */}
      <div className="bg-green-800 py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Profil Desa</h1>
        <p className="text-green-100 max-w-2xl mx-auto px-4">
          Mengenal lebih dekat sejarah, visi misi, dan jajaran pemerintahan desa.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* --- BAGIAN BARU: SAMBUTAN KEPALA DESA --- */}
        {profil?.namaKepalaDesa && (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch border border-gray-100">
                {/* Kolom Kiri: Foto */}
                <div className="w-full md:w-1/3 bg-green-50 relative min-h-[300px] md:min-h-full">
                    {profil.fotoKepalaDesa ? (
                        <Image 
                            src={urlFor(profil.fotoKepalaDesa).url()}
                            alt={profil.namaKepalaDesa}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Photo</div>
                    )}
                    {/* Label Nama di Foto (Mobile Only/Optional Design) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white md:hidden">
                        <p className="font-bold text-lg">{profil.namaKepalaDesa}</p>
                        <p className="text-sm opacity-90">Kepala Desa</p>
                    </div>
                </div>

                {/* Kolom Kanan: Teks Sambutan */}
                <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sambutan Kepala Desa</h2>
                        <div className="h-1 w-20 bg-green-500 rounded-full"></div>
                    </div>
                    
                    <div className="prose prose-green text-gray-600 leading-relaxed mb-6 text-justify">
                        {profil.sambutan ? (
                            <PortableText value={profil.sambutan} />
                        ) : (
                            <p className="italic text-gray-400">Belum ada kata sambutan.</p>
                        )}
                    </div>

                    {/* Tanda Tangan / Nama Terang */}
                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <p className="font-bold text-gray-900 text-lg">{profil.namaKepalaDesa}</p>
                        <p className="text-green-600 font-medium">Kepala Desa Maju</p>
                    </div>
                </div>
            </div>
        )}

        
        {/* --- Bagian 2: Sejarah & Visi Misi (Struktur Lama) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Kolom Sejarah */}
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-200 pb-2 inline-block">Sejarah Desa</h2>
            <div className="text-gray-600 leading-relaxed text-justify prose prose-green">
              {profil?.sejarah ? (
                <PortableText value={profil.sejarah} />
              ) : (
                <p className="italic text-gray-400">Data sejarah belum diinput di CMS.</p>
              )}
            </div>
          </div>

          {/* Kolom Visi Misi */}
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-200 pb-2 inline-block">Visi & Misi</h2>
            
            <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2 bg-green-50 p-2 rounded-lg inline-block">Visi</h3>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{profil?.visi || 'Belum ada data visi'}"
                </p>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 bg-green-50 p-2 rounded-lg inline-block">Misi</h3>
                <div className="text-gray-600 prose prose-sm prose-green">
                    {profil?.misi ? (
                        <PortableText value={profil.misi} />
                    ) : (
                        <p className="italic text-gray-400">Belum ada data misi.</p>
                    )}
                </div>
            </div>
          </div>
        </div>

        {/* --- Bagian 3: Struktur Organisasi (Perangkat) --- */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Perangkat Desa
          </h2>

          {perangkat.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {perangkat.map((p: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center p-6 group border border-gray-100">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-50 group-hover:border-green-200 transition-colors">
                    {p.foto ? (
                      <Image
                        src={urlFor(p.foto).url()}
                        alt={p.nama}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Foto
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{p.nama}</h3>
                  <p className="text-green-600 text-sm font-medium">{p.jabatan}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">Belum ada data perangkat desa.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}