/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Add any other Next.js configuration options here
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://luxurytimesltd.co.uk'
  }
};

module.exports = nextConfig;
  
