import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
