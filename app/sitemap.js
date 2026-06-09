import { getAllProducts, getAllArticles } from './utils/shopify'

const SITE = 'https://luxurytimesltd.co.uk'

const STATIC_ROUTES = [
  // Core
  { path: '/',               changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/daytona-116520', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/sell',           changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact',        changeFrequency: 'yearly',  priority: 0.6 },
  { path: '/review',         changeFrequency: 'monthly', priority: 0.6 },
  { path: '/FAQs',           changeFrequency: 'yearly',  priority: 0.5 },

  // Products & collections
  { path: '/products',                              changeFrequency: 'daily',   priority: 0.9 },
  { path: '/products/collections/rolex',            changeFrequency: 'daily',   priority: 0.8 },
  { path: '/products/collections/patek-philippe',   changeFrequency: 'daily',   priority: 0.8 },
  { path: '/products/collections/audemars-piguet',  changeFrequency: 'daily',   priority: 0.8 },
  { path: '/products/collections/richard-mille',    changeFrequency: 'weekly',  priority: 0.7 },

  // Blog index
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },

  // Legal & policy pages
  { path: '/authenticity-guarantee',      changeFrequency: 'yearly', priority: 0.3 },
  { path: '/warranty-policy',             changeFrequency: 'yearly', priority: 0.3 },
  { path: '/shipping-policy',             changeFrequency: 'yearly', priority: 0.3 },
  { path: '/return',                      changeFrequency: 'yearly', priority: 0.3 },
  { path: '/deposit-policy',              changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms-and-conditions',        changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy-policy',              changeFrequency: 'yearly', priority: 0.2 },
  { path: '/kyc-fraud-prevention',        changeFrequency: 'yearly', priority: 0.2 },
  { path: '/anti-money-laundering',       changeFrequency: 'yearly', priority: 0.2 },
  { path: '/sanctions-policy',            changeFrequency: 'yearly', priority: 0.2 },
  { path: '/high-value-online-purchasing',changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap() {
  const now = new Date()

  const [products, articles] = await Promise.all([
    getAllProducts(250).catch(() => []),
    getAllArticles().catch(() => []),
  ])

  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const productEntries = products.map(({ node }) => ({
    url: `${SITE}/products/${node.handle}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articleEntries = articles.map(({ node }) => ({
    url: `${SITE}/blog/${node.handle}`,
    lastModified: node.publishedAt ? new Date(node.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticEntries, ...productEntries, ...articleEntries]
}
