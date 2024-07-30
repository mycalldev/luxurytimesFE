import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <main>
        <Image src={'/Lt_Footer.jpg'} 
          className={styles.imageFooter} 
          width={1552} 
          height={1024} 
          alt={'picture of canary wharf'} 
          quality={100} 
        />

        <div className={styles.containerFlex}>
          <Link href={'/FAQs'} className={styles.linkBTN}>
            <div className={styles.itemFlex}>FAQs</div>
          </Link>
          <Link href={'/terms-and-conditions'} className={styles.linkBTN}>
            <div className={styles.itemFlex}>T&Cs</div>
          </Link>
          <Link href={'/review'} className={styles.linkBTN}>
            <div className={styles.itemFlex}>REVIEWS</div>
          </Link>
          <Link href={'/return'} className={styles.linkBTN}>
            <div className={styles.itemFlex}>RETURN</div>
          </Link>
        </div>
        <div className={styles.socialContainer}>
          <Link href={'https://www.instagram.com/_luxurytimes_/'}>
            <Image src={'/instagram.png'} width={64} height={64} quality={100} alt='Instagram icon' />
          </Link>
          <Link href={'https://www.youtube.com/@LuxuryTimesLondon'}>
            <Image src={'/youtube.png'} width={64} height={64} quality={100} alt='Youtube icon' />
          </Link>
        </div>
        
        <div className={styles.addressContainer}>
            <div className={styles.addressContent}>25 Cabot Square, Canary Wharf, London E14 4QZ</div>
            <div className={styles.addressCountry}>United Kingdom</div>
            <div className={styles.disclaimer}>Disclaimer: we are not authorized rolex dealers. All of our watches are genuine, authenticated and sourced from trusted suppliers.</div>
        </div>
    </main>
  )
}
