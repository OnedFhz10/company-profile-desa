// src/app/layanan/page.tsx
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { FileText, Download, CheckCircle2 } from "lucide-react";

async function getLayanan() {
  const query = `*[_type == "layanan"] | order(judul asc) {
    judul, deskripsi, syarat, "fileUrl": fileFormulir.asset->url
  }`;
  return await client.fetch(query);
}

export default async function LayananPage() {
  const dataLayanan = await getLayanan();

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-emerald-900 py-32 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Layanan Administrasi</h1>
        <p className="text-emerald-100 max-w-2xl mx-auto px-4 font-light text-lg">
           Panduan lengkap pengurusan dokumen kependudukan dan perizinan.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 -mt-10 relative z-20 space-y-8">
        {dataLayanan.map((item: any, index: number) => (
          <div key={index} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
               <FileText size={32} />
            </div>

            <div className="flex-grow">
               <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.judul}</h3>
               <p className="text-gray-500 mb-6">{item.deskripsi}</p>
               
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    Persyaratan Dokumen:
                  </h4>
                  <div className="prose prose-sm prose-emerald text-gray-600">
                     <PortableText value={item.syarat} />
                  </div>
               </div>
            </div>

            {item.fileUrl && (
              <a href={`${item.fileUrl}?dl=`} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-200 transition-all flex items-center gap-2 whitespace-nowrap">
                <Download size={18} /> Download Form
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}