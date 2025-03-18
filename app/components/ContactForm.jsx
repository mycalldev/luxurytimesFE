'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm({ 
  contactTitle = "Get in Touch",
  contactDescription = "Interested in our luxury timepieces? Have questions about a specific model? Fill out the form below and our horological experts will get back to you shortly."
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitted: false,
      error: false,
      message: 'Submitting your message...'
    });
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'There was an error sending your message. Please try again.'
      });
    }
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.contactTitle}>{contactTitle}</h2>
      <p className={styles.contactDescription}>
        {contactDescription}
      </p>
      
      <div className={styles.formWrapper}>
        {formStatus.message && (
          <div className={`${styles.formMessage} ${formStatus.error ? styles.formError : formStatus.submitted ? styles.formSuccess : ''}`}>
            {formStatus.message}
          </div>
        )}
        
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className={styles.formInput} 
              placeholder="Your name" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className={styles.formInput} 
              placeholder="Your email address" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          {/* <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className={styles.formInput} 
              placeholder="Your phone number" 
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div> */}
          
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>Message</label>
            <textarea 
              id="message" 
              name="message" 
              className={styles.formTextarea} 
              placeholder="Tell us which models you're interested in" 
              rows="4" 
              required
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className={styles.formGroup}>
            <button 
              type="submit" 
              className={styles.formSubmitBtn}
              disabled={formStatus.submitted}
            >
              {formStatus.submitted ? 'Sent' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 