"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../watch_rolex.module.css';

export default function RiseOfLuxuryTimes() {
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}> The Rise of Luxury Times</h1>
        <p className={styles.subtitle}>Canary Wharf Exclusive</p>
        <p className={styles.readTime}>2 minute read</p>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/footer_new.jpg" 
            alt="Luxury Watches" 
            width={1116.5} 
            height={744.25} 
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.imageCaption}>The epitome of luxury and precision</div>
      </section>

      <article className={styles.content}>
        <section className={styles.introduction}>
          <h2>The Humble Beginnings</h2>
          <p>
            Luxury Times began as a small family-run business with a passion for horology. Nestled in the heart of Canary Wharf, 
            the founders envisioned a boutique that would offer not just watches, but a curated experience of luxury and elegance.
          </p>
          <p>
            Over the years, the business has grown, yet it remains true to its roots—providing personalized service and 
            an unparalleled selection of timepieces from the world's most prestigious brands.
          </p>
        </section>

        <section className={styles.collectionSection}>
          <h2>The Prestigious Brands</h2>
          <p>
            At Luxury Times, we pride ourselves on offering a diverse range of luxury watches. From the timeless elegance 
            of Rolex to the avant-garde designs of Richard Mille, our collection caters to the discerning tastes of our clientele.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/audemars1.jpg" 
                alt="Audemars Piguet" 
                width={564}
                height={846} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>Audemars Piguet - A blend of tradition and innovation</div>
          </div>
          
          <p>
            Audemars Piguet, known for its Royal Oak collection, represents the perfect fusion of tradition and innovation. 
            Each timepiece is a testament to the brand's commitment to craftsmanship and excellence.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/patek2.jpg" 
                alt="Patek Philippe" 
                width={1660} 
                height={1106.5} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>Patek Philippe - The pinnacle of watchmaking artistry</div>
          </div>
          
          <p>
            Patek Philippe is synonymous with watchmaking artistry. Its timepieces are not only functional but also 
            masterpieces of design, cherished by collectors and connoisseurs alike.
          </p>
        </section>

        <section className={styles.luxurySection}>
          <h2>The Family Legacy</h2>
          <p>
            The heart of Luxury Times is its family legacy. Each generation has contributed to the business's growth, 
            bringing new ideas while preserving the core values of quality and customer satisfaction.
          </p>
          <p>
            As we look to the future, we remain committed to offering the finest luxury watches and an exceptional 
            shopping experience that reflects our passion for horology.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/richard1.jpg" 
                alt="Richard Mille" 
                width={1199} 
                height={1865} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>Richard Mille - The avant-garde of watchmaking</div>
          </div>
          
          <p>
            Richard Mille's avant-garde designs push the boundaries of traditional watchmaking. Known for its innovative 
            use of materials and technology, Richard Mille creates timepieces that are as much works of art as they are 
            feats of engineering.
          </p>
        </section>

        <section className={styles.craftSection}>
          <h2>The Art of Curation</h2>
          <p>
            At Luxury Times, we believe in the art of curation. Our selection process is meticulous, ensuring that each 
            watch we offer is a reflection of our commitment to excellence and our understanding of our clients' desires.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/rise1.jpg" 
                alt="Luxury Watch Collection" 
                width={700} 
                height={450} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>A curated collection of the finest timepieces</div>
          </div>
          
          <p>
            Our curated collection is a testament to our dedication to quality and our passion for horology. Each piece 
            is selected not only for its beauty and craftsmanship but also for its ability to tell a story and evoke emotion.
          </p>
        </section>
      </article>

      {/* Get in Touch Form Section */}
      <section className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Get in Touch</h2>
        <p className={styles.contactDescription}>
          Interested in our luxury timepieces? Have questions about a specific model? 
          Fill out the form below and our horological experts will get back to you shortly.
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
            
            <div className={styles.formGroup}>
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
            </div>
            
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

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Luxury Times | The Ultimate Guide to Exceptional Timepieces</p>
        <p>For inquiries about our luxury watch collection, please contact our horological experts.</p>
      </footer>
    </div>
  );
} 