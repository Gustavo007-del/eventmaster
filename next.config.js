/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
