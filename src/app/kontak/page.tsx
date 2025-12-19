// src/app/kontak/page.tsx
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600">
            Punya pertanyaan atau butuh layanan administrasi? Silakan datang atau kirim pesan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Bagian Kiri: Informasi & Peta */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Informasi Kantor</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Alamat</h4>
                    <p className="text-gray-600">Jl. Raya Desa Maju No. 123, Kec. Sejahtera</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><Phone /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Telepon</h4>
                    <p className="text-gray-600">(022) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><Mail /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-gray-600">layanan@desamaju.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><Clock /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Jam Operasional</h4>
                    <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Peta (Iframe Google Maps Dummy) */}
            <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666427009761!2d106.82496477499015!3d-6.175115060508173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1709180000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Bagian Kanan: Form Kontak */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all" placeholder="Nama Anda" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all" placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all" placeholder="Keperluan surat / aduan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button type="button" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                Kirim Pesan
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}