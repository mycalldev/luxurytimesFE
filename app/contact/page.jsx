import React from 'react'
import Link from 'next/link'
import styles from './Contact.module.css'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <main>
      
      <div className={styles.container}>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}> Get in Touch with Luxury Times</h2>
          <p className={styles.formDescription}>
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <ContactForm />
          <div className={styles.buttonWrapper}>
        </div>
        </div>
      </div>
    </main>
  )
}
