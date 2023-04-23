/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL
  },
  output: 'standalone'
}

module.exports = nextConfig
