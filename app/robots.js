export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/wishlist', '/api/'],
      },
    ],
    sitemap: 'https://luxurytimesltd.co.uk/sitemap.xml',
    host: 'https://luxurytimesltd.co.uk',
  }
}
