/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      { source: '/products/collections/rolex',           destination: '/products?collection=rolex',           permanent: true },
      { source: '/products/collections/patek-philippe',  destination: '/products?collection=patek-philippe',  permanent: true },
      { source: '/products/collections/audemars-piguet', destination: '/products?collection=audemars-piguet', permanent: true },
      { source: '/products/collections/richard-mille',   destination: '/products?collection=richard-mille',   permanent: true },
    ]
  },
  images: {
    qualities: [75, 80, 85, 90, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'shopifycdn.net' },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://luxurytimesltd.co.uk'
  }
};

module.exports = nextConfig;



  
