// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client"; 

const inter = Inter({ subsets: ["latin"] });

// Ambil data Identitas dari Sanity
async function getIdentitas() {
  const query = `*[_type == "identitas"][0] {
    namaDesa,
    alamat,
    "logoUrl": logo.asset->url
  }`;
  // Gunakan try-catch agar tidak error kalau data belum ada
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    return null;
  }
}

export const metadata: Metadata = {
  title: "Website Resmi Desa",
  description: "Pusat Informasi Pemerintahan Desa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ambil data di server
  const identitas = await getIdentitas();

  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Kirim data ke Navbar */}
        <Navbar 
          namaDesa={identitas?.namaDesa} 
          logoUrl={identitas?.logoUrl} 
        />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Kirim data ke Footer */}
        <Footer 
          namaDesa={identitas?.namaDesa}
          alamat={identitas?.alamat}
        />
      </body>
    </html>
  );
}