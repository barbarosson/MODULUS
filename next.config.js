/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  swcMinify: true,
  compress: true,
  generateBuildId: async () => {
    return `v2-deploy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
