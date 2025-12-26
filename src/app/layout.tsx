// src/app/layout.tsx
import type { Metadata } from "next";
// 1. Ganti import Inter dengan Plus_Jakarta_Sans
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client"; 

// 2. Konfigurasi Font
const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Ambil variasi ketebalan
  variable: "--font-jakarta", // Opsional: untuk custom css variable
});

async function getIdentitas() {
  const query = `*[_type == "identitas"][0] {
    namaDesa,
    alamat,
    "logoUrl": logo.asset->url
  }`;
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
  const identitas = await getIdentitas();

  return (
    <html lang="id">
      {/* 3. Terapkan className font ke body */}
      <body className={fontSans.className}>
        
        <Navbar 
          namaDesa={identitas?.namaDesa} 
          logoUrl={identitas?.logoUrl} 
        />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <Footer 
          namaDesa={identitas?.namaDesa}
          alamat={identitas?.alamat}
        />
      </body>
    </html>
  );
}