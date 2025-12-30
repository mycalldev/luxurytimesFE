'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './CookieConsent.module.css'
import Button from './Button'
import {
  getCookieConsent,
  acceptAllCookies,
  rejectAllCookies,
  saveCustomConsent,
  hasConsentBeenGiven,
  COOKIE_CATEGORIES,
} from '../utils/cookieConsent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [preferences, setPreferences] = useState({
    [COOKIE_CATEGORIES.ANALYTICS]: false,
    [COOKIE_CATEGORIES.MARKETING]: false,
  })

  useEffect(() => {
    // Check if consent has been given
    if (!hasConsentBeenGiven()) {
      // Small delay to ensure smooth animation
      setTimeout(() => setShowBanner(true), 100)
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setShowBanner(false)
    // Trigger a custom event so other components can react
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated'))
  }

  const handleRejectAll = () => {
    rejectAllCookies()
    setShowBanner(false)
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated'))
  }

  const handleCustomize = () => {
    setShowCustomize(true)
  }

  const handleSavePreferences = () => {
    saveCustomConsent(preferences)
    setShowBanner(false)
    setShowCustomize(false)
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated'))
  }

  const handleTogglePreference = (category) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleOpenSettings = () => {
    const consent = getCookieConsent()
    if (consent) {
      setPreferences({
        [COOKIE_CATEGORIES.ANALYTICS]: consent[COOKIE_CATEGORIES.ANALYTICS] || false,
        [COOKIE_CATEGORIES.MARKETING]: consent[COOKIE_CATEGORIES.MARKETING] || false,
      })
    }
    setShowCustomize(true)
    setShowBanner(true)
  }

  // Expose function globally so footer can trigger it
  useEffect(() => {
    window.openCookieSettings = handleOpenSettings
    return () => {
      delete window.openCookieSettings
    }
  }, [])

  if (!showBanner) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        {!showCustomize ? (
          <>
            <div className={styles.content}>
              <h3 className={styles.title}>Cookie Preferences</h3>
              <p className={styles.description}>
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can also customize your preferences 
                or reject non-essential cookies. Learn more in our{' '}
                <Link href="/terms-and-conditions" className={styles.link}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={handleRejectAll}
                className={styles.buttonReject}
                aria-label="Reject all non-essential cookies"
              >
                Reject All
              </Button>
              <Button
                onClick={handleCustomize}
                className={styles.buttonCustomize}
                aria-label="Customize cookie preferences"
              >
                Customize
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="active"
                className={styles.buttonAccept}
                aria-label="Accept all cookies"
              >
                Accept All
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.customizePanel}>
            <h3 className={styles.title}>Customize Cookie Preferences</h3>
            <p className={styles.description}>
              Choose which cookies you want to accept. Essential cookies are required for the website to function 
              and cannot be disabled.
            </p>

            <div className={styles.categoryList}>
              <div className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <h4 className={styles.categoryTitle}>Essential Cookies</h4>
                  <span className={styles.categoryStatus}>Always Active</span>
                </div>
                <p className={styles.categoryDescription}>
                  These cookies are necessary for the website to function and cannot be switched off. 
                  They are usually set in response to actions made by you.
                </p>
              </div>

              <div className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <h4 className={styles.categoryTitle}>Analytics Cookies</h4>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={preferences[COOKIE_CATEGORIES.ANALYTICS]}
                      onChange={() => handleTogglePreference(COOKIE_CATEGORIES.ANALYTICS)}
                      aria-label="Toggle analytics cookies"
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <p className={styles.categoryDescription}>
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
              </div>

              <div className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <h4 className={styles.categoryTitle}>Marketing Cookies</h4>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={preferences[COOKIE_CATEGORIES.MARKETING]}
                      onChange={() => handleTogglePreference(COOKIE_CATEGORIES.MARKETING)}
                      aria-label="Toggle marketing cookies"
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <p className={styles.categoryDescription}>
                  These cookies are used to deliver personalized advertisements and track campaign performance.
                </p>
              </div>
            </div>

            <div className={styles.customizeButtons}>
              <Button
                onClick={() => setShowCustomize(false)}
                className={styles.buttonCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePreferences}
                variant="active"
                className={styles.buttonSave}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

