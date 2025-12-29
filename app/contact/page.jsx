import React from 'react'
import Link from 'next/link'
import styles from './Contact.module.css'
import Button from '../components/Button'

export default function Contact() {
  return (
    <main>
      <Link href={'/'} className={styles.backLinkBTN}>
        <div className={styles.backNav}>
          {'< Home'}
        </div>
      </Link>
      
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <Button href="tel:07714611699" desktopText="07714611699">
            CONTACT
          </Button>
        </div>

        <div className={styles.titleMain}>
          Get in Touch with Luxury Times
        </div>

        <div className={styles.contentExtra}>
          Luxury Times Ltd is a Family Run Business. We're here to help and answer any questions you might have. 
          Whether you have a query about our products or services, 
          want to provide feedback, or simply want to say hello, we'd love to hear from you.
        </div>

        <div className={styles.contentExtra}>
          Please feel free to reach out to us using the contact button above, 
          and we'll get back to you as soon as possible.
        </div>

        <div className={styles.contentExtraThick}>
          We look forward to hearing from you and helping you with all your luxury timepiece needs.
        </div>
      </div>
    </main>
  )
}
