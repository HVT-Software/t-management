import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  turbopack: {
    rules: {
      "*.svg": {
        as: "*.tsx",
        loaders: ["@svgr/webpack"]
      }
    },
    resolveAlias: {
      canvas: "./empty-module.ts"
    }
  },
  webpack: config => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
  reactStrictMode: false,
  distDir: "build",
  output: "standalone"
};

export default nextConfig;
