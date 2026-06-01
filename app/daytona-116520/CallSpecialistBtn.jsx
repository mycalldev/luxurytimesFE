'use client'

import { useState } from 'react'
import styles from './daytona116520.module.css'

const PHONE_NUMBER = '+44 7999 297 359'
const PHONE_HREF = 'tel:+447999297359'

export default function CallSpecialistBtn() {
  const [revealed, setRevealed] = useState(false)

  const handleClick = (e) => {
    const isDesktop = window.matchMedia('(min-width: 720px)').matches

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'daytona_cta_click',
      cta_label: 'call_specialist',
      cta_location: 'private_viewing',
      destination: PHONE_HREF,
      landing_page: 'daytona-116520',
    })

    if (window.gtag) {
      window.gtag('event', 'landing_cta_click', {
        landing_page: 'daytona-116520',
        cta_label: 'call_specialist',
        cta_location: 'private_viewing',
        destination: PHONE_HREF,
      })
    }

    if (isDesktop) {
      e.preventDefault()
      setRevealed(true)
    }
  }

  return (
    <a
      href={PHONE_HREF}
      onClick={handleClick}
      className={`${styles.btn} ${styles.btnGhost} ${revealed ? styles.btnRevealed : ''}`}
      aria-label={revealed ? `Call us on ${PHONE_NUMBER}` : 'Call the specialist'}
    >
      {revealed ? PHONE_NUMBER : 'Call the specialist'}
    </a>
  )
}
