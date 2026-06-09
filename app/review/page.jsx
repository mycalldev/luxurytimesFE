import Script from 'next/script'
import Link from 'next/link'
import styles from './Reviews.module.css'
import Button from '../components/Button'

export const metadata = {
  title: 'Client Reviews | Luxury Times',
  description: 'Read reviews from Luxury Times clients. Trusted by collectors across the UK and worldwide.',
  alternates: { canonical: '/review' },
};

export default function Reviews() {
  return (
    <main className={styles.containerReview}>
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />

      <div className={styles.headerSection}>
        <Link href={'/'} className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>Home</span>
        </Link>
        <h1 className={styles.titleMain}>Customer Reviews</h1>
        <div className={styles.contactSection}>
          <div className={styles.contactMobile}>
            <Button href="tel:07714611699" desktopText="07714611699">
              CONTACT
            </Button>
          </div>
          <div className={styles.contactDesktop}>
            <h3 className={styles.contactTitle}>Contact Us</h3>
            <a href="tel:07714611699" className={styles.phoneNumber}>07714 611 699</a>
          </div>
        </div>
      </div>

      <div className={styles.widgetSection}>
        <div
          className="elfsight-app-363242a1-1f3f-4d9b-a150-8fb5bf7bf579"
          data-elfsight-app-lazy
        />
      </div>
    </main>
  )
}
