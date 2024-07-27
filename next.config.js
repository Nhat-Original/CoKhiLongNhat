/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
