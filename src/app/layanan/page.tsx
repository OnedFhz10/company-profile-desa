// src/app/layanan/page.tsx
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { FileText, Download } from "lucide-react";

// Ambil data layanan
async function getLayanan() {
  const query = `*[_type == "layanan"] | order(judul asc) {
    judul,
    deskripsi,
    syarat,
    "fileUrl": fileFormulir.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function LayananPage() {
  const dataLayanan = await getLayanan();

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Layanan Administrasi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Daftar persyaratan dan prosedur pengurusan dokumen di Kantor Desa. 
            Pastikan berkas Anda lengkap sebelum datang untuk mempercepat proses pelayanan.
          </p>
        </div>

        {/* List Layanan */}
        <div className="grid gap-8">
          {dataLayanan.length > 0 ? (
            dataLayanan.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-md transition-shadow">
                
                {/* Ikon Besar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center">
                    <FileText size={32} />
                  </div>
                </div>

                {/* Konten */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.judul}</h3>
                  <p className="text-gray-600 mb-6">{item.deskripsi}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Persyaratan Dokumen:</h4>
                    <div className="prose prose-sm prose-green text-gray-700">
                      <PortableText value={item.syarat} />
                    </div>
                  </div>
                </div>

                {/* Tombol Download (Jika ada file) */}
                {item.fileUrl && (
                  <div className="flex-shrink-0 flex md:flex-col justify-end">
                    <a 
                      href={`${item.fileUrl}?dl=`} 
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-colors w-full md:w-auto text-center"
                    >
                      <Download size={18} />
                      Download Formulir
                    </a>
                  </div>
                )}

              </div>
            ))
          ) : (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">Belum ada informasi layanan.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}