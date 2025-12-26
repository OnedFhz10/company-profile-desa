// src/app/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { 
  ArrowRight, 
  Users, 
  Home, 
  UserCheck, 
  FileText, 
  MapPin, 
  BarChart3,
  CalendarDays,
  Quote
} from "lucide-react";

// 1. Ambil Berita
async function getBeritaUtama() {
  const query = `*[_type == "berita"] | order(tanggalTerbit desc)[0...3] {
    judul, slug, gambarUtama, tanggalTerbit, deskripsiSingkat
  }`;
  return await client.fetch(query);
}

// 2. Ambil Statistik
async function getStatistik() {
  const query = `*[_type == "statistik"][0] {
    totalPenduduk, jumlahKK, lakiLaki, perempuan
  }`;
  return await client.fetch(query);
}

// 3. Ambil Identitas
async function getIdentitas() {
  const query = `*[_type == "identitas"][0] { namaDesa }`;
  return await client.fetch(query);
}

// 4. BARU: Ambil Profil Kepala Desa
async function getProfilKades() {
  const query = `*[_type == "profilDesa"][0] {
    namaKepalaDesa,
    fotoKepalaDesa,
    sambutan
  }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const [beritaUtama, statistik, identitas, profil] = await Promise.all([
    getBeritaUtama(),
    getStatistik(),
    getIdentitas(),
    getProfilKades()
  ]);

  const namaDesa = identitas?.namaDesa || "Desa Kami";

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
            alt="Pemandangan Desa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-emerald-300 font-medium tracking-[0.2em] uppercase mb-4 animate-fade-in text-sm md:text-base">
              Website Resmi Pemerintah
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
              <span className="block text-2xl md:text-4xl font-light tracking-wide opacity-90 mb-2">
                Selamat Datang di
              </span>
              <span className="text-emerald-400 font-extrabold tracking-tight">
                {namaDesa}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Pusat pelayanan digital dan informasi publik terpadu. <br className="hidden md:block" />
              Melayani dengan hati, membangun dengan transparansi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/layanan" 
                className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-900/40 flex items-center gap-2 transform hover:scale-105"
              >
                Layanan Warga 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/profil" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold transition-all flex items-center gap-2"
              >
                Jelajahi Desa
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/50 rounded-full mt-2"></div>
            </div>
        </div>
      </section>

      {/* ================= STATISTIK FLOATING & QUICK ACCESS ================= */}
      {/* Wrapper ini mengangkat konten ke atas menutupi Hero */}
      <div className="relative z-20 px-4 -mt-20 mb-20 space-y-8">
        
        {/* 1. DATA STATISTIK */}
        {statistik && (
            <div className="container mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border-b-4 border-emerald-500 p-8 md:p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
                    <div className="text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Penduduk</p>
                        <h3 className="text-3xl font-extrabold text-emerald-600">{statistik.totalPenduduk?.toLocaleString() || 0}</h3>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Kepala Keluarga</p>
                        <h3 className="text-3xl font-extrabold text-emerald-600">{statistik.jumlahKK?.toLocaleString() || 0}</h3>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Laki-Laki</p>
                        <h3 className="text-3xl font-extrabold text-blue-600">{statistik.lakiLaki?.toLocaleString() || 0}</h3>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Perempuan</p>
                        <h3 className="text-3xl font-extrabold text-pink-600">{statistik.perempuan?.toLocaleString() || 0}</h3>
                    </div>
                </div>
                </div>
            </div>
        )}

        {/* 2. AKSES CEPAT (Quick Menu) */}
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/layanan" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Administrasi</h3>
                            <p className="text-gray-500 text-sm">Panduan & Syarat Surat</p>
                        </div>
                    </div>
                </Link>
                <Link href="/transparansi" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Transparansi</h3>
                            <p className="text-gray-500 text-sm">Realisasi APBDes</p>
                        </div>
                    </div>
                </Link>
                <Link href="/potensi" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Potensi Desa</h3>
                            <p className="text-gray-500 text-sm">Wisata & UMKM</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
      </div>

      {/* ================= SAMBUTAN KEPALA DESA (UKURAN FOTO DIPERKECIL) ================= */}
      {profil && (
        <section className="py-20 bg-emerald-50 relative overflow-hidden">
          {/* Hiasan Background Pattern */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              
              {/* Foto Kades (Kiri) - UKURAN DIPERKECIL (md:w-1/3) */}
              <div className="w-full md:w-5/12 lg:w-1/3 relative group max-w-sm mx-auto md:mx-0">
                <div className="absolute inset-0 bg-emerald-200 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4] border-4 border-white">
                  {profil.fotoKepalaDesa ? (
                    <Image 
                      src={urlFor(profil.fotoKepalaDesa).url()}
                      alt={profil.namaKepalaDesa || "Kepala Desa"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Photo</div>
                  )}
                  {/* Badge Nama di Foto */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                    <p className="font-bold text-lg md:text-xl">{profil.namaKepalaDesa}</p>
                    <p className="text-emerald-300 text-sm font-medium">Kepala Desa</p>
                  </div>
                </div>
              </div>

              {/* Teks Sambutan (Kanan) - LEBIH LEBAR (md:w-2/3) */}
              <div className="w-full md:w-7/12 lg:w-2/3">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-1 bg-emerald-500 rounded-full"></span>
                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs md:text-sm">Sambutan Kepala Desa</span>
                 </div>
                 
                 <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    Membangun Desa dengan <span className="text-emerald-600">Inovasi</span> dan <span className="text-emerald-600">Hati.</span>
                 </h2>

                 <div className="relative">
                    <Quote className="absolute -top-4 -left-2 text-emerald-200 w-12 h-12 opacity-50 transform -scale-x-100" />
                    <div className="prose prose-emerald text-gray-600 relative z-10 line-clamp-6 mb-8 text-base md:text-lg leading-relaxed">
                       {profil.sambutan && <PortableText value={profil.sambutan} />}
                    </div>
                 </div>

                 <Link 
                    href="/profil" 
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-emerald-600 transition-colors shadow-lg text-sm md:text-base"
                 >
                    Baca Sambutan Lengkap <ArrowRight size={18} className="ml-2" />
                 </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ================= BERITA TERBARU ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase">Kabar Desa</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Informasi Terkini</h2>
            </div>
            <Link href="/berita" className="hidden md:flex items-center text-gray-500 hover:text-emerald-600 font-medium transition-colors">
              Lihat Semua Berita <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaUtama.length > 0 ? (
              beritaUtama.map((item: any) => (
                <Link 
                  href={`/berita/${item.slug.current}`} 
                  key={item.slug.current}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    {item.gambarUtama ? (
                      <Image
                        src={urlFor(item.gambarUtama).url()}
                        alt={item.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-emerald-600" />
                        {new Date(item.tanggalTerbit).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {item.deskripsiSingkat || "Klik untuk membaca berita selengkapnya..."}
                    </p>
                    <span className="text-emerald-600 text-sm font-bold flex items-center mt-auto">
                        BACA SELENGKAPNYA <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">Belum ada berita yang diterbitkan.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}