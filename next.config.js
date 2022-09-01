/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    server:'http://localhost:8000'
  }
}

module.exports = nextConfig
