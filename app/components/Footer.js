import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Company Info Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Luxury Times</h3>
          <p className={styles.footerDescription}>
            Your trusted destination for authentic luxury timepieces and fine jewellery.
          </p>
          <div className={styles.socialContainer}>
            <Link href={'https://www.instagram.com/_luxurytimes_/'} aria-label="Visit our Instagram">
              <Image 
                src={'/social.png'} 
                width={40} 
                height={40} 
                quality={100} 
                alt='Instagram icon' 
                className={styles.socialIcon}
              />
            </Link>
            {/* 
            <Link href={'https://www.youtube.com/@LuxuryTimesLondon'} aria-label="Visit our YouTube">
              <Image 
                src={'/youtube.png'} 
                width={40} 
                height={40} 
                quality={100} 
                alt='Youtube icon' 
                className={styles.socialIcon}
              />
            </Link> */}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <nav className={styles.footerLinks}>
            <Link href={'/products'} className={styles.linkBTN}>Shop Watches</Link>
            <Link href={'/jewellery'} className={styles.linkBTN}>Jewellery</Link>
            <Link href={'/sell'} className={styles.linkBTN}>Sell Your Watch</Link>
            <Link href={'/blog'} className={styles.linkBTN}>Blog</Link>
            <Link href={'/contact'} className={styles.linkBTN}>Contact Us</Link>
          </nav>
        </div>

        {/* Customer Service Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Customer Service</h4>
          <nav className={styles.footerLinks}>
            <Link href={'/FAQs'} className={styles.linkBTN}>FAQs</Link>
            <Link href={'/terms-and-conditions'} className={styles.linkBTN}>Terms & Conditions</Link>
            <Link href={'/review'} className={styles.linkBTN}>Reviews</Link>
            <Link href={'/return'} className={styles.linkBTN}>Returns Policy</Link>
            <Link href={'/guide'} className={styles.linkBTN}>Buying Guide</Link>
          </nav>
        </div>

        {/* Contact Information Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Visit Us</h4>
          <div className={styles.contactInfo}>
            <div className={styles.addressBlock}>
              <p className={styles.addressTitle}>Mayfair</p>
              <p className={styles.addressText}>15 St George's House</p>
              <p className={styles.addressText}>Hanover Square London, W1S 1HS</p>
            </div>
            <div className={styles.addressBlock}>
              <p className={styles.addressTitle}>Hatton Garden</p>
              <p className={styles.addressText}>100 Hatton Garden</p>
              <p className={styles.addressText}>London, EC1N 8NX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Luxury Times. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            We are independent dealers. All watches are genuine and authenticated from trusted suppliers.
          </p>
        </div>
      </div>
    </footer>
  )
}
