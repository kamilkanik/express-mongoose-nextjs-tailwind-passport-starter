/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.example.com'],
  },
  experimental: {
      appDir: true,
  }
}

  