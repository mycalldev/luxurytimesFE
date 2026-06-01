'use client'

import { useEffect, useState } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { hasCategoryConsent, COOKIE_CATEGORIES } from '../utils/cookieConsent'

export default function ConditionalGTM({ gtmId }) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const hasAnalyticsConsent = hasCategoryConsent(COOKIE_CATEGORIES.ANALYTICS)
      setShouldLoad(hasAnalyticsConsent)
    }

    checkConsent()

    window.addEventListener('cookieConsentUpdated', checkConsent)

    return () => {
      window.removeEventListener('cookieConsentUpdated', checkConsent)
    }
  }, [])

  if (!shouldLoad) return null

  return <GoogleTagManager gtmId={gtmId} />
}
