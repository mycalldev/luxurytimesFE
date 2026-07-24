import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import crypto from 'crypto'

// Shopify webhook receiver for on-demand ISR revalidation.
//
// Shopify is configured (Admin -> Settings -> Notifications -> Webhooks, or via
// the Admin API) to POST here on products/collections/articles changes. When a
// verified webhook arrives we invalidate the shared 'shopify' cache tag, which
// every Shopify-backed fetch carries (see app/utils/shopify.js). That marks all
// Shopify pages stale so they rebuild on their next request — meaning ISR writes
// happen only when catalogue data actually changes, not on a timer.

// Must run on the Node.js runtime (needs `crypto` + the raw request body).
export const runtime = 'nodejs'
// Never cache the webhook endpoint itself.
export const dynamic = 'force-dynamic'

function verifyShopifyHmac(rawBody, hmacHeader, secret) {
  if (!hmacHeader || !secret) return false
  const digest = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64')

  // Timing-safe compare; guard against length mismatch throwing.
  const a = Buffer.from(digest)
  const b = Buffer.from(hmacHeader)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret) {
    // Fail closed: without a secret we can't trust anyone, so don't revalidate.
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // Read the RAW body — HMAC must be computed over the exact bytes Shopify sent,
  // so we can't use request.json() (it would re-serialise and break the digest).
  const rawBody = await request.text()
  const hmacHeader = request.headers.get('x-shopify-hmac-sha256')

  if (!verifyShopifyHmac(rawBody, hmacHeader, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const topic = request.headers.get('x-shopify-topic') || 'unknown'

  // One shared tag invalidates every Shopify-backed page. Given the low change
  // frequency, this is simpler and safer than per-product tags.
  revalidateTag('shopify')

  return NextResponse.json({ revalidated: true, topic })
}

// Optional health check so you can confirm the route is deployed.
export async function GET() {
  return NextResponse.json({ ok: true, route: 'revalidate' })
}
