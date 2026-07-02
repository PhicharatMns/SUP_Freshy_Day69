import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // สองดอกจันหมายถึง "ทุกโดเมน"
        port: '',
        pathname: '/**', // สองดอกจันหมายถึง "ทุกพาธ"
      },
    ],
  },

};

export default nextConfig;
