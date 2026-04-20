'use client'

import { useState } from 'react'
import styles from './product.module.css'

export default function ShareButton({ handle, title }) {
  const [copied, setCopied] = useState(false)

  const buildShareUrl = () => {
    const base = `https://www.luxurytimesltd.co.uk/products/${handle}`
    const params = new URLSearchParams({
      utm_source: 'product_page',
      utm_medium: 'social',
      utm_campaign: 'product_share',
      utm_content: handle,
    })
    return `${base}?${params.toString()}`
  }

  const fireGAEvent = (method) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method,
        content_type: 'product',
        item_id: handle,
      })
    }
  }

  const handleShare = async () => {
    const url = buildShareUrl()

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        fireGAEvent('native_share')
      } catch (err) {
        // User cancelled — do nothing
      }
      return
    }

    // Clipboard fallback for desktop
    try {
      await navigator.clipboard.writeText(url)
      fireGAEvent('clipboard_copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silent fail
    }
  }

  return (
    <button
      onClick={handleShare}
      className={styles.shareButton}
      aria-label="Share this product"
    >
      {copied ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </>
      )}
    </button>
  )
}
