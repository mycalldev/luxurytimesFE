import React from 'react'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <main>
        <Image src={'/canary_wharf_footer.jpg'} className={styles.imageFooter} width={1456} height={816} alt={'picture of canary wharf'} quality={100} />

        <div className={styles.containerFlex}>
          <div className={styles.itemFlex}>FAQs</div>
          <div className={styles.itemFlex}>T&Cs</div>
          <div className={styles.itemFlex}>REVIEWS</div>
        </div>
        
        <div className={styles.addressContainer}>
            <div className={styles.addressTitle}>ADDRESS</div>
            <div className={styles.addressContent}>25 Cabot Square, Canary Wharf, London E1 44Q</div>
            <div className={styles.addressCountry}>United Kingdom</div>
        </div>
    </main>
  )
}
