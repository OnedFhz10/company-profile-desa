import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Untuk gambar contoh
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Persiapan untuk CMS Sanity nanti
      },
    ],
  },
};

export default nextConfig;