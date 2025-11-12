import React from 'react'
import Link from 'next/link'
import styles from './Contact.module.css'
import Button from '../components/Button'

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
        <Button href="tel:07714611699">CALL NOW</Button>
      </div>
      <div className={styles.heroBtn}>
        <Button href="https://wa.me/447714611699?text=Hi%20Luxury%20Times....">
          WHATSAPP
        </Button>
      </div>
      <div className={styles.heroBtnDesktop}>07714 611 699</div>
    </div>
  )
}
