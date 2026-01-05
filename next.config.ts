import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'api.banandev.com',
      },
      {
        protocol: 'https',
        hostname: '*.banana.dev',
      },
      {
        protocol: 'https',
        hostname: 'banana.dev',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: '*.replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      }
    ],
    unoptimized: true,
  },
};

export default nextConfig;
