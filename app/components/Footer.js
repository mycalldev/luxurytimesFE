import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'
import CookieSettingsButton from './CookieSettingsButton'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Company Info */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Luxury Times</h3>
          <p className={styles.footerDescription}>
            Your trusted destination for authentic luxury timepieces and fine jewellery.
          </p>
          <div className={styles.socialContainer}>
            <Link href={'https://www.instagram.com/luxurytimeslondon/'} aria-label="Visit our Instagram">
              <Image
                src={'/social.png'}
                width={40}
                height={40}
                quality={100}
                alt='Instagram icon'
                className={styles.socialIcon}
              />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <nav className={styles.footerLinks}>
            <Link href={'/products'} className={styles.linkBTN}>Shop Watches</Link>
            <Link href={'/sell'} className={styles.linkBTN}>Sell Your Watch</Link>
            <Link href={'/blog'} className={styles.linkBTN}>Blog</Link>
            <Link href={'/contact'} className={styles.linkBTN}>Contact Us</Link>
          </nav>
        </div>

        {/* Customer Service */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Customer Service</h4>
          <nav className={styles.footerLinks}>
            <Link href={'/FAQs'} className={styles.linkBTN}>FAQs</Link>
            <Link href={'/review'} className={styles.linkBTN}>Reviews</Link>
            <Link href={'/return'} className={styles.linkBTN}>Returns Policy</Link>
            <Link href={'/terms-and-conditions'} className={styles.linkBTN}>Terms & Conditions</Link>
            <CookieSettingsButton className={styles.linkBTN} />
          </nav>
        </div>

        {/* Policies */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Policies</h4>
          <nav className={styles.footerLinks}>
            <Link href={'/privacy-policy'} className={styles.linkBTN}>Privacy Policy</Link>
            <Link href={'/warranty-policy'} className={styles.linkBTN}>Warranty Policy</Link>
            <Link href={'/shipping-policy'} className={styles.linkBTN}>Shipping Policy</Link>
            <Link href={'/deposit-policy'} className={styles.linkBTN}>Deposit Policy</Link>
            <Link href={'/authenticity-guarantee'} className={styles.linkBTN}>Authenticity Guarantee</Link>
            <Link href={'/high-value-online-purchasing'} className={styles.linkBTN}>High Value Online Purchasing</Link>
          </nav>
        </div>

        {/* Compliance */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Compliance</h4>
          <nav className={styles.footerLinks}>
            <Link href={'/kyc-fraud-prevention'} className={styles.linkBTN}>KYC & Fraud Prevention</Link>
            <Link href={'/anti-money-laundering'} className={styles.linkBTN}>Anti-Money Laundering</Link>
            <Link href={'/sanctions-policy'} className={styles.linkBTN}>Sanctions Policy</Link>
          </nav>
        </div>

        {/* Visit Us */}
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
            We are independent dealers. All watches are genuine and authenticated via our in-house experts.
          </p>
          <p className={styles.companyDetails}>
            VAT No: 457606667 | Company No: 15300276
          </p>
        </div>
      </div>
    </footer>
  )
}
