# Structured Data / Schema for `/daytona-116520`

Status: **draft — not yet implemented**. Use this as the working brief when we revisit.

## What structured data is

Machine-readable JSON embedded in the page that tells Google exactly what the page is about, using the [Schema.org](https://schema.org) vocabulary. The format Google prefers is **JSON-LD** — a `<script type="application/ld+json">` block.

Without it, Google reads the HTML and *infers*:
> "This page mentions 'Rolex Daytona 116520', a price probably, an address probably… maybe a product?"

With it, you hand Google a structured record:

```json
{
  "@type": "Product",
  "name": "Rolex Daytona 116520 White Dial",
  "brand": "Rolex",
  "offers": { "price": "...", "availability": "InStock" }
}
```

Now Google *knows* it's a Product, with a Brand, an Offer, a Price. No guessing.

## Why it matters for this landing page

- **Rich results in search** — star ratings, price, "In stock" badge directly under the blue link (much higher CTR than plain results).
- **Better ad/shopping eligibility** — Google Merchant Center, Performance Max, and Google Shopping rely on Product schema. Without it, ads can't show product-specific extensions.
- **Knowledge graph entry** — Google may treat this page as the canonical source for "Rolex Daytona 116520 at Luxury Times".
- **Voice / Assistant answers** — structured data is how "Hey Google, where can I buy a Daytona 116520 in Mayfair?" gets answered.

## Schema types that fit this page

| Type | What it declares |
|---|---|
| **Product** | The watch itself — name, image, brand, sku, description |
| **Offer** | Price, currency, availability, seller (nested inside Product) |
| **AggregateRating** / **Review** | Customer reviews (boosts the rich snippet with stars) |
| **Organization** / **LocalBusiness** | Luxury Times Ltd — Mayfair address, phone, accreditations |
| **BreadcrumbList** | Helps Google build the breadcrumb shown in search results |
| **FAQPage** | If we add an FAQ section, Google can render expandable Q&A under the result |

## What we'd implement in Next.js

Inline in the page component (App Router, server component is fine):

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Rolex Daytona 116520 White Dial',
    // ...
  })}}
/>
```

For a single page this is fine inline. If we end up with multiple product/landing pages, factor into a helper.

## Outstanding data needed before we ship

To populate the schema, we need:

- **Price** (or a clear decision to use `"PriceSpecification" → "PriceOnApplication"` if not publicly listed)
- **Currency** (presumably `GBP`)
- **Availability** (`InStock` / `OutOfStock` / `PreOrder` — tied to live Shopify state?)
- **SKU / MPN** — Rolex reference `116520` is the MPN; do we have an internal SKU?
- **Aggregate rating** — number of reviews + average score, if we have them
- **Organization details** — legal name, full Mayfair address, phone, social URLs, logo
- **Breadcrumb path** — e.g., `Home → Rolex → Daytona → 116520`

## How to verify after deploy

- [Google Rich Results Test](https://search.google.com/test/rich-results) — paste the URL, see which rich-result features qualify
- [Schema.org Validator](https://validator.schema.org) — pure spec compliance check
- Google Search Console → Enhancements panel will surface schema errors per page once Google has re-crawled

## Open questions for the next conversation

1. Pull price/availability live from Shopify, or hard-code on the landing page?
2. Do we have review data anywhere (Trustpilot, Google reviews, in-house)?
3. Add a FAQ section to the landing page so we can attach `FAQPage` schema?
4. Should `Organization` schema live globally in `app/layout.js` (so every page gets it) rather than per-page?
