import React from 'react'
import Link from 'next/link'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <div>
      {/* <Meta /> */}
      <div>
        <h1 className={styles.headerTitle}>LUXURY TIMES CONTACT</h1>
      </div>

      <div className={styles.contactText}>
        Luxury Times Ltd is a Family Run Business. We're here to help and answer any questions you might have. 
        Whether you have a query about our products or services, 
        want to provide feedback, or simply want to say hello, we'd love to hear from you. 
        Please feel free to reach out to us using the contact information below, 
        and we'll get back to you as soon as possible.
      </div>

      {/* BTN */}
      <div className={styles.heroBtn}>
        <Link href="tel:07976753254" className={styles.linkBTN}>CALL NOW</Link>
      </div>
      <div className={styles.heroBtn}>
        <Link
          href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
        >
          WHATSAPP
        </Link>
      </div>
      <div className={styles.heroBtnDesktop}>07976 753 254</div>
    </div>
  )
}
