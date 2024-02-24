/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }],
  },
}

module.exports = nextConfig
