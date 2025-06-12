import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.tsx',
        loaders: ['@svgr/webpack']
      }
    }
  },
  experimental: {
    optimizePackageImports: [
      'material-react-table',
      '@mui/x-date-pickers',
      '@mui/material',
      '@mui/icons-material',
      'motion'
    ],
    scrollRestoration: false,
    serverActions: {
      bodySizeLimit: '3mb'
    }
  },
  productionBrowserSourceMaps: false,
  webpack(config) {
    config.devtool = 'source-map';
    // Grab the existing rule that handles SVG imports
    // @ts-expect-error
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  output: 'standalone'
};

export default nextConfig;
