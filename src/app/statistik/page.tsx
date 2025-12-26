// src/app/statistik/page.tsx
import { client } from "@/sanity/lib/client";
import { Users, Home, User, UserCheck } from "lucide-react";

async function getStatistik() {
  const query = `*[_type == "statistik"][0] {
    judul,
    totalPenduduk,
    jumlahKK,
    lakiLaki,
    perempuan,
    demografi
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function StatistikPage() {
  const data = await getStatistik();

  if (!data) {
    return (
      <div className="min-h-screen pt-32 text-center text-gray-500">
        Data statistik belum diinput.
      </div>
    );
  }

  // Hitung Persentase Gender
  const persenLaki = Math.round((data.lakiLaki / data.totalPenduduk) * 100) || 0;
  const persenPerempuan = Math.round((data.perempuan / data.totalPenduduk) * 100) || 0;

  // Cari nilai tertinggi di demografi untuk skala grafik batang
  const maxDemografi = data.demografi 
    ? Math.max(...data.demografi.map((d: any) => d.jumlah)) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Statistik Kependudukan</h1>
          <p className="text-xl text-green-600 font-medium">{data.judul}</p>
        </div>

        {/* --- KARTU RINGKASAN UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Total Penduduk */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <Users size={32} />
            </div>
            <div>
              <p className="text-gray-500 font-medium">Total Penduduk</p>
              <h3 className="text-4xl font-bold text-gray-900">{data.totalPenduduk.toLocaleString('id-ID')} <span className="text-lg text-gray-400 font-normal">Jiwa</span></h3>
            </div>
          </div>

          {/* Jumlah KK */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
              <Home size={32} />
            </div>
            <div>
              <p className="text-gray-500 font-medium">Kepala Keluarga</p>
              <h3 className="text-4xl font-bold text-gray-900">{data.jumlahKK.toLocaleString('id-ID')} <span className="text-lg text-gray-400 font-normal">KK</span></h3>
            </div>
          </div>
        </div>

        {/* --- GRAFIK GENDER --- */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <UserCheck className="text-green-600" /> Komposisi Gender
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
             {/* Visual Bar */}
             <div className="w-full h-12 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="h-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-1000"
                  style={{ width: `${persenLaki}%` }}
                >
                  {persenLaki}%
                </div>
                <div 
                  className="h-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-1000"
                  style={{ width: `${persenPerempuan}%` }}
                >
                  {persenPerempuan}%
                </div>
             </div>
          </div>

          {/* Detail Angka Gender */}
          <div className="grid grid-cols-2 mt-6 text-center">
            <div className="border-r border-gray-100">
               <p className="text-gray-500 mb-1">Laki-laki</p>
               <p className="text-2xl font-bold text-blue-600">{data.lakiLaki.toLocaleString()} Jiwa</p>
            </div>
            <div>
               <p className="text-gray-500 mb-1">Perempuan</p>
               <p className="text-2xl font-bold text-pink-600">{data.perempuan.toLocaleString()} Jiwa</p>
            </div>
          </div>
        </div>

        {/* --- GRAFIK DEMOGRAFI (PEKERJAAN/PENDIDIKAN) --- */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <User className="text-green-600" /> Demografi Penduduk
          </h3>

          <div className="space-y-6">
            {data.demografi?.map((item: any, index: number) => {
              // Hitung panjang bar berdasarkan nilai tertinggi
              const widthPercentage = Math.round((item.jumlah / maxDemografi) * 100);
              
              return (
                <div key={index}>
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="text-gray-900 font-bold">{item.jumlah.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-green-600 h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <p className="text-xs text-gray-400 mt-8 text-center">
            * Data diperbarui berdasarkan sensus desa terakhir
          </p>
        </div>

      </div>
    </div>
  );
}