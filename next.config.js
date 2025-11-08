/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  transpilePackages: [
    '@refinedev/mui',
    '@refinedev/core',
    '@refinedev/nextjs-router',
  ],
}

module.exports = nextConfig
