import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: []
  },
  experiments: {
    asyncWebAssembly: true
  }
};

export default nextConfig;
