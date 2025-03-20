'use client';

import React from 'react';
import ContactForm from '../components/ContactForm';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHeader}>
        <h1 className={styles.contactTitle}>Contact Luxury Times</h1>
        <p className={styles.contactIntro}>
          We're here to assist you with all your luxury watch inquiries. Whether you're looking for a specific model,
          need information about pricing, or want to discuss a potential purchase, our team of horological experts is ready to help.
        </p>
      </div>
      
      <div className={styles.contactContainer}>
        <ContactForm 
          contactTitle="Send Us a Message"
          contactDescription="Fill out the form below and we'll get back to you as soon as possible. Your luxury timepiece journey begins with a conversation."
        />
      </div>
      
      <div className={styles.contactInfo}>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Business Hours</h2>
          <p className={styles.infoText}>Monday - Friday: 9am - 6pm</p>
          <p className={styles.infoText}>Saturday: 10am - 4pm</p>
          <p className={styles.infoText}>Sunday: Closed</p>
        </div>
        
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Contact Details</h2>
          <p className={styles.infoText}>Phone: 07718 269 994</p>
          <p className={styles.infoText}>Email: info@luxurytimes.com</p>
        </div>
        
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Location</h2>
          <p className={styles.infoText}>Luxury Times Ltd.</p>
          <p className={styles.infoText}>123 Luxury Lane</p>
          <p className={styles.infoText}>London, UK</p>
        </div>
      </div>
    </div>
  );
}
