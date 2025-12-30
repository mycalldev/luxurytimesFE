'use client'

import { useEffect, useState } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { hasCategoryConsent, COOKIE_CATEGORIES } from '../utils/cookieConsent'

export default function ConditionalGTM({ gtmId }) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Check if analytics cookies are consented
    const checkConsent = () => {
      // Google Tag Manager is typically used for analytics, so check analytics consent
      const hasAnalyticsConsent = hasCategoryConsent(COOKIE_CATEGORIES.ANALYTICS)
      setShouldLoad(hasAnalyticsConsent)
    }

    // Check immediately
    checkConsent()

    // Listen for consent updates
    const handleConsentUpdate = () => {
      checkConsent()
    }

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate)

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate)
    }
  }, [])

  if (!shouldLoad) return null

  return <GoogleTagManager gtmId={gtmId} />
}

