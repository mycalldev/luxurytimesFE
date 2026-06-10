'use client'

import styles from './product.module.css'

export default function SpeakToTeamBtn({ productTitle }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openLiveChat', { detail: { productTitle } }))

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'speak_to_the_team',
      cta_location: 'product_page_price',
      product_title: productTitle,
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.speakToTeamBtn}
    >
      Speak to the Team
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  )
}
