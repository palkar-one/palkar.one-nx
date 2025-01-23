import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol:"http",
        hostname:"localhost"
      },
      {
        protocol:"https",
        hostname:"palkar.one"
      },
      {
        protocol:"https",
        hostname:"picsum.photos"
      }
    ]
  },
  experimental: 
  { 
    serverActions: { allowedOrigins: [ "localhost:3000", "palkar.one"], },
  },


  /* config options here */
};

export default nextConfig;
