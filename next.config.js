/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    API_URL: process.env.API_URL,
    NEXT_ENV: process.env.NEXT_ENV,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'restcountries.com',
      },
    ],
  },
}

module.exports = nextConfig

// MONGODB_URL
// PORT
// API_URL
// JWT_SECRET
// JWT_EXPIRES_IN
// JWT_COOKIE_EXPIRES_IN
// NODE_ENV
