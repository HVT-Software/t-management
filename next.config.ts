import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: []
  },
  webpack: config => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  }
};

export default nextConfig;
