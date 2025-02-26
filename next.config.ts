import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: []
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          as: "*.tsx",
          loaders: ["@svgr/webpack"]
        }
      },
      resolveAlias: {
        canvas: "./empty-module.ts"
      }
    }
  },
  webpack: config => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  }
};

export default nextConfig;
