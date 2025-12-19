// src/app/berita/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

// 1. Fungsi ambil data
async function getBeritaDetail(slug: string) {
  const query = `*[_type == "berita" && slug.current == $slug][0] {
    judul,
    gambarUtama,
    tanggalTerbit,
    konten
  }`;
  const data = await client.fetch(query, { slug });
  return data;
}

// 2. Definisi Tipe Props untuk Next.js 15 (PENTING!)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BeritaDetail({ params }: Props) {
  // PENTING: Await params sebelum dipakai
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const berita = await getBeritaDetail(slug);

  // Jika data tidak ketemu, arahkan ke 404
  if (!berita) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Gambar Besar */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        {/* Gambar Background */}
        {berita.gambarUtama ? (
          <Image
            src={urlFor(berita.gambarUtama).url()}
            alt={berita.judul}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        
        {/* Overlay Gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Judul & Info di atas gambar */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-5xl mx-auto pt-20">
            <Link href="/berita" className="inline-flex items-center text-green-300 hover:text-green-200 mb-6 transition-colors font-medium">
                <ArrowLeft size={20} className="mr-2" /> Kembali ke Daftar Berita
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">{berita.judul}</h1>
            <div className="flex items-center text-gray-200 text-sm md:text-base">
                <Calendar size={18} className="mr-2" />
                {new Date(berita.tanggalTerbit).toLocaleDateString("id-ID", {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
            </div>
        </div>
      </div>

      {/* Konten Artikel */}
      <article className="max-w-3xl mx-auto bg-white p-6 md:p-12 rounded-xl shadow-lg -mt-10 relative z-10 border border-gray-100">
        <div className="prose prose-lg prose-green max-w-none text-gray-800 leading-relaxed">
            <PortableText 
                value={berita.konten} 
                components={{
                    block: {
                        h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-green-800 border-b pb-2">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3 text-green-700">{children}</h3>,
                        normal: ({children}) => <p className="mb-4 text-justify">{children}</p>,
                    },
                    list: {
                        bullet: ({children}) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                        number: ({children}) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                    }
                }}
            />
        </div>
      </article>

    </div>
  );
}