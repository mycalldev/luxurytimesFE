'use client'

import styles from './daytona116520.module.css'

export default function SpeakToTeamBtn() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openLiveChat'))

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'speak_to_the_team',
      cta_location: 'reviews',
      landing_page: 'daytona-116520',
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.btn} ${styles.btnNavy} ${styles.speakBtn}`}
    >
      Speak to the Team
      <span className={styles.arrow} aria-hidden="true">→</span>
    </button>
  )
}
