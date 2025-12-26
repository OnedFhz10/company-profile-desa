// src/app/profil/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getData() {
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
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Modern */}
      <div className="bg-emerald-900 py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Profil Desa</h1>
        <p className="text-emerald-100 max-w-2xl mx-auto px-4 relative z-10 font-light text-lg">
          Mengenal lebih dekat sejarah, visi misi, dan jajaran pemerintahan desa.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 -mt-10 relative z-20">

        {/* Sambutan Kades */}
        {profil?.namaKepalaDesa && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                <div className="w-full md:w-1/3 bg-emerald-50 relative min-h-[350px]">
                    {profil.fotoKepalaDesa ? (
                        <Image 
                            src={urlFor(profil.fotoKepalaDesa).url()}
                            alt={profil.namaKepalaDesa}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Photo</div>
                    )}
                </div>

                <div className="w-full md:w-2/3 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sambutan Kepala Desa</h2>
                    <div className="h-1.5 w-20 bg-emerald-500 rounded-full mb-6"></div>
                    
                    <div className="prose prose-emerald text-gray-600 leading-relaxed mb-8">
                        {profil.sambutan && <PortableText value={profil.sambutan} />}
                    </div>

                    <div className="mt-auto">
                        <p className="font-bold text-gray-900 text-xl">{profil.namaKepalaDesa}</p>
                        <p className="text-emerald-600 font-medium">Kepala Desa</p>
                    </div>
                </div>
            </div>
        )}

        {/* Sejarah & Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">01</span>
                Sejarah Desa
            </h2>
            <div className="prose prose-sm prose-emerald text-gray-600 text-justify">
              {profil?.sejarah && <PortableText value={profil.sejarah} />}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">02</span>
                Visi & Misi
            </h2>
            <div className="mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-900 mb-2 uppercase tracking-wide text-sm">Visi</h3>
                <p className="italic text-gray-700 font-medium">"{profil?.visi}"</p>
            </div>
            <div>
                <h3 className="font-bold text-emerald-900 mb-2 uppercase tracking-wide text-sm">Misi</h3>
                <div className="prose prose-sm prose-emerald text-gray-600">
                    {profil?.misi && <PortableText value={profil.misi} />}
                </div>
            </div>
          </div>
        </div>

        {/* Perangkat Desa */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Struktur Pemerintahan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {perangkat.map((p: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group text-center p-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-emerald-50 group-hover:border-emerald-200 transition-colors relative">
                    {p.foto && <Image src={urlFor(p.foto).url()} alt={p.nama} fill className="object-cover" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{p.nama}</h3>
                  <p className="text-emerald-600 text-sm font-medium">{p.jabatan}</p>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}