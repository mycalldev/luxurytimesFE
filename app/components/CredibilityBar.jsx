import Image from 'next/image'
import styles from './CredibilityBar.module.css'

export default function CredibilityBar({ bordered = true }) {
  return (
    <div className={`${styles.bar} ${bordered ? styles.bordered : ''}`}>
      <p className={styles.subtitle}>Trusted &amp; Accredited</p>
      <div className={styles.logos}>
        <div className={styles.item}>
          <div className={styles.logoWrapper}>
            <Image
              src="/fga.png"
              alt="Fellow of the Gemmological Association of Great Britain"
              width={200}
              height={100}
              className={styles.logo}
              quality={100}
            />
          </div>
          <span className={styles.label}>FGA - Gemmological Association</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <div className={styles.logoWrapper}>
            <Image
              src="/bourse_logo.jpg"
              alt="London Diamond Bourse Member"
              width={200}
              height={100}
              className={styles.logo}
              quality={100}
            />
          </div>
          <span className={styles.label}>London Diamond Bourse</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <div className={styles.logoWrapper}>
            <Image
              src="/NAJ.png"
              alt="National Association of Jewellers Member"
              width={200}
              height={100}
              className={styles.logo}
              quality={100}
            />
          </div>
          <span className={styles.label}>National Association of Jewellers</span>
        </div>
      </div>
    </div>
  )
}
