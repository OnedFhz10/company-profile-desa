// src/app/transparansi/page.tsx
import { client } from "@/sanity/lib/client";
import { Banknote, TrendingDown, TrendingUp, Wallet } from "lucide-react";

// Helper untuk format Rupiah
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

// Ambil data APBDes terbaru
async function getAPBDes() {
  const query = `*[_type == "apbdes"] | order(tahun desc)[0] {
    tahun,
    pendapatan,
    belanja
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function TransparansiPage() {
  const data = await getAPBDes();

  if (!data) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold text-gray-400">Belum ada data anggaran.</h1>
      </div>
    );
  }

  // Hitung Total Secara Otomatis
  const totalPendapatan = data.pendapatan?.reduce((acc: number, cur: any) => acc + cur.jumlah, 0) || 0;
  const totalBelanja = data.belanja?.reduce((acc: number, cur: any) => acc + cur.jumlah, 0) || 0;
  const surplusDefisit = totalPendapatan - totalBelanja;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Transparansi Anggaran</h1>
          <p className="text-xl text-green-600 font-semibold">Tahun Anggaran {data.tahun}</p>
        </div>

        {/* --- Ringkasan Kartu Atas --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pendapatan */}
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <TrendingUp className="absolute right-4 top-4 text-blue-400 opacity-20" size={100} />
            <p className="text-blue-100 font-medium mb-1">Total Pendapatan</p>
            <h3 className="text-2xl lg:text-3xl font-bold">{formatRupiah(totalPendapatan)}</h3>
          </div>

          {/* Belanja */}
          <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <TrendingDown className="absolute right-4 top-4 text-orange-300 opacity-20" size={100} />
            <p className="text-orange-100 font-medium mb-1">Total Belanja</p>
            <h3 className="text-2xl lg:text-3xl font-bold">{formatRupiah(totalBelanja)}</h3>
          </div>

          {/* Surplus/Defisit */}
          <div className={`${surplusDefisit >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white p-6 rounded-2xl shadow-lg relative overflow-hidden`}>
            <Wallet className="absolute right-4 top-4 text-white opacity-20" size={100} />
            <p className="text-white/80 font-medium mb-1">
                {surplusDefisit >= 0 ? 'Surplus Anggaran' : 'Defisit Anggaran'}
            </p>
            <h3 className="text-2xl lg:text-3xl font-bold">{formatRupiah(surplusDefisit)}</h3>
          </div>
        </div>

        {/* --- Tabel Detail --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tabel Pendapatan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600"/>
                <h3 className="font-bold text-blue-800">Rincian Pendapatan</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-4">
                    {data.pendapatan?.map((item: any, idx: number) => (
                        <li key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                            <span className="text-gray-600">{item.uraian}</span>
                            <span className="font-bold text-gray-900">{formatRupiah(item.jumlah)}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* Tabel Belanja */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-orange-50 p-4 border-b border-orange-100 flex items-center gap-2">
                <TrendingDown size={20} className="text-orange-600"/>
                <h3 className="font-bold text-orange-800">Rincian Belanja</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-4">
                    {data.belanja?.map((item: any, idx: number) => (
                        <li key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                            <span className="text-gray-600">{item.uraian}</span>
                            <span className="font-bold text-gray-900">{formatRupiah(item.jumlah)}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}