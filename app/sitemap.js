const SITE = 'https://luxurytimesltd.co.uk'

const ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/daytona-116520', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products', changeFrequency: 'daily', priority: 0.9 },
  { path: '/jewellery', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sell', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/review', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/FAQs', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/return', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap() {
  const lastModified = new Date()
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
