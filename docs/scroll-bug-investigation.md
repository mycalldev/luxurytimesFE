# Scroll Bug Investigation

## Bug 1 — Product page opens at footer (FIXED)

**Route:** `/products` → click "View Details" → `/products/[handle]`

**Symptom:** On some mobile browsers, the product page opened scrolled to the enquiry form instead of the top.

**Root cause:** The `EnquiryForm` has `id="enquiry"` on its wrapper div. The Daytona landing page (`/daytona-116520`) has a "Book a viewing" CTA that links to the specific Daytona product URL with `#enquiry` appended:

```js
// app/daytona-116520/page.jsx:480
href={`${DAYTONA_PDP}#enquiry`}
```

This puts a history entry for `[product-url]#enquiry` in the browser. Some mobile browsers (iOS Safari, Samsung Internet) then apply scroll restoration from that cached entry even when subsequently navigating to the same URL without the hash.

**Fix applied:** Added `app/products/[handle]/ScrollReset.jsx` — a client component that runs `window.scrollTo(0, 0)` on mount, unless `window.location.hash === '#enquiry'` (so the "Book a viewing" CTA still scrolls to the form as intended).

---

## Bug 2 — Back button from product page lands at bottom of `/products` (OPEN)

**Route:** `/products/[handle]` → browser back button → `/products`

**Symptom:** On some mobile browsers and devices, hitting the native browser back button from a product page returns the user to the bottom of `/products` instead of where they were.

**Key detail from user:** This happens with SOME products and not others.

### Investigation findings

All components were read and checked for scroll-related effects:
- `ProductsClient.jsx` — has `scrollIntoView({ behavior: 'smooth', block: 'start' })` tied to `collectionFilter` changes, guarded by `isInitialMount` ref. No direct link to the bottom-scroll symptom found.
- `EnquiryForm.jsx` — `id="enquiry"` anchor (covered by Bug 1 fix)
- `FeaturedProductsClient.jsx` — no scroll effects
- `ImageGallery.jsx` — no scroll effects
- `LiveChat.jsx` — `scrollIntoView` only fires when chat window is open; `focus()` only when chat is open
- `Breadcrumb.jsx` — no scroll effects
- `WishlistIcon.jsx` / `wishlist.js` — no scroll effects

### Most likely cause

The `/products` page fetches up to 100 products. On mobile, the grid collapses to a single column (`grid-template-columns: 1fr`). Each card is roughly viewport-width square. The page can reach 50,000–60,000px tall.

Products near the **bottom of the sorted list** (Richard Mille last by brand priority, then alphabetical within each brand) require a scroll of Y=40,000+. When the user navigates back, Next.js and the mobile browser both attempt to restore that Y position. If the page layout hasn't fully calculated to that height at the exact moment scroll restoration fires, the scroll gets clamped to whatever the current max is — which LOOKS like the bottom of the page.

This explains:
- **Some products not others** — only products requiring deep scroll (near the bottom of the list) are affected
- **Device/browser specific** — timing of scroll restoration vs layout varies between browsers

### Proposed fix (not yet implemented)

Implement explicit scroll position management in `ProductsClient` using `sessionStorage`:
- On unmount (navigating away), save `window.scrollY` to `sessionStorage` keyed by the current URL
- On mount, check `sessionStorage` for a saved position and restore it — bypassing Next.js/browser native restoration entirely

This gives full control over scroll on this specific page and avoids the timing race on very long mobile pages.

### Files involved
- `app/products/ProductsClient.jsx` — scroll logic lives here
- `app/products/products.module.css:393` — mobile single-column grid definition
