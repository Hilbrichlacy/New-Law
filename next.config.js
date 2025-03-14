/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true
  },
  // Enable static exports
  output: 'standalone',
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Trailing slashes configuration
  trailingSlash: false,
  // Configure powered by header
  poweredByHeader: false,
  // Configure compression
  compress: true,
  // Configure base path if needed
  basePath: '',
  // Configure asset prefix if needed
  assetPrefix: ''
}

module.exports = nextConfig 