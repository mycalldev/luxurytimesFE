"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../watch_rolex.module.css';
import ContactForm from '@/app/components/ContactForm';

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
        <h1 className={styles.title}>Will Rolex Discontinue the Olive Green Dial Day-Date 40 in 2025?</h1>
        <p className={styles.subtitle}>Rolex discontinuations create market waves—will the olive dial Day-Date 40 be next?</p>
        <p className={styles.readTime}>3 minute read</p>
      </header>
      <div className={styles.metaInfo} style={{ textAlign: 'left', margin: '1rem', color: '#999'}}>
        <p className={styles.author}>Author: Robert Campbell, CEO of Luxury Times Ltd</p>
        <p className={styles.date}>Date: March 18th, 2025</p>
      </div>

      <section className={styles.heroSection}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/blogs/discontinued/1scaled.jpg" 
            alt="Luxury Watches" 
            width={830} 
            height={553} 
            className={styles.heroImage}
            priority
          />
        </div>
        {/* <div className={styles.imageCaption}>The epitome of luxury and precision</div> */}
      </section>

      <article className={styles.content}>
        <section className={styles.introduction}>
          <h2>Will Rolex Discontinue the Olive Green Dial Day-Date 40 in 2025?</h2>
          <p>
          Within the coming weeks, Rolex is expected to discontinue one or more models, a move that has historically shaped market demand and collector interest. 
          Rumors within the trade suggest that the Rolex Day-Date 40 with the olive green dial could be among the models facing retirement.
          </p>
          
        </section>

        <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/blogs/discontinued/scale3.jpg" 
                alt="olive dial" 
                width={1024}
                height={576} 
                className={styles.contentImage}
              />
            </div>
        </div>

        <section className={styles.collectionSection}>
          <h2>Why the Olive Green Dial?</h2>
          <p>
          Rolex has a long-standing strategy of retiring highly sought-after dials to keep them rare and exclusive. The olive green dial, a favorite among collectors and traders, has been in production for nearly a decade. Its potential discontinuation in 2025 would likely make it even more desirable among enthusiasts.
          </p>
          
          <h2>The 2023 "John Mayer" Daytona Discontinuation: A Case Study</h2>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/blogs/discontinued/scale2.jpg" 
                alt="John Mayer" 
                width={1680} 
                height={944} 
                className={styles.contentImage}
              />
            </div>
          </div>
          
        
        <p>April 2023 marked the end of the Rolex Daytona 116508 with the green dial, often referred to as the "John Mayer" Daytona. This watch saw incredible market fluctuations:</p>
        <ul className={styles.timelineList}>
          <li>Late 2021: The gold Daytona with the green dial was in extremely high demand.</li>
          <li>Late 2022: Interest cooled, reflecting broader turbulence in the luxury watch sector.</li>
          <li>Early 2023: Rumors of its discontinuation sparked renewed attention.</li>
          <li>March 2023: The speculation intensified, with collectors and traders taking notice.</li>
          <li>Post-discontinuation: Interest in the model surged, cementing its place as a sought-after collector&apos;s piece.</li>
        </ul>

        <p>The removal of the John Mayer Daytona injected fresh excitement into the Rolex market, proving that discontinuations can create major shifts in demand.</p>
        </section>

        <section className={styles.luxurySection}>
        <h2>How Will Rolex&apos;s Next Move Affect the Market?</h2>
          <p>
            Over the past few weeks, the watch market has been buzzing with activity. If Rolex does indeed discontinue the olive green Day-Date 40, the immediate effect could be:
          </p>
          <ol className={styles.impactList}>
            <li>Increased interest in remaining stock: Collectors and enthusiasts may rush to secure the model before it becomes scarce.</li>
            <li>Speculation on new releases: Rolex typically introduces a successor or an alternative model, shifting market focus.</li>
            <li>Changes in collector sentiment: If the new releases capture attention, they could fuel further excitement in the market.</li>
          </ol>

          <h2>What&apos;s Next for Rolex?</h2>
          <p>
            Predicting Rolex&apos;s next move is never easy, but history suggests that whenever a model is discontinued, a new release follows. If Rolex unveils something groundbreaking, it could energize the market and push both traders and collectors into a new buying frenzy.
          </p>
          <p>
            In our next blog, we&apos;ll explore potential Rolex releases and what might replace the discontinued models.
          </p>
          
          <section className={styles.personalExperienceSection}>
            <h2>My Personal Experience: A Missed Opportunity That Cost Me £20,000</h2>
            <p>
              A watch is meant to be worn and enjoyed—but sometimes, there&apos;s a missed opportunity to make a great deal.
            </p>
            <p>
              Back in March 2023, rumors were circulating that the Rolex Daytona 116508 John Mayer would be discontinued. The Friday before the official announcement, a close friend and fellow trader—who owned five of these watches—offered me one at £65,000. He even said he wouldn&apos;t rush me for the payment (a phrase every trader loves to hear).
            </p>
            <p>
            I hesitated. By Monday morning, I checked the Rolex website and saw that the 116508 was gone. Rolex had officially discontinued it. I immediately called my friend, only to hear him laughing at the other end of the phone.
            </p>
            <p>
              "Rob, you should&apos;ve bought one on Friday," he said. "It&apos;s already up £20,000."
            </p>
            <p>
              I had to applaud his guts—he took a high-risk bet that paid off handsomely.
            </p>
            <p>
                The watch market isn&apos;t just about winning or missing out—it&apos;s about appreciating the craftsmanship and history behind each piece. Opportunities come and go, but a truly great watch remains timeless.
            </p>
          </section>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/blogs/discontinued/1scaled966.jpg" 
                alt="Day-date" 
                width={966} 
                height={644} 
                className={styles.contentImage}
              />
            </div>
            {/* <div className={styles.imageCaption}>Richard Mille - The avant-garde of watchmaking</div> */}
          </div>
          
          <p>
            
          </p>
        </section>

        <section className={styles.craftSection}>
          <h2>Final Thoughts</h2>

          <p>
            If the Rolex Day-Date 40 with the olive green dial is discontinued, we could see a repeat of the John Mayer scenario, with interest in the model rising overnight. As always, the key is market awareness and timing.
          </p>
          <p>
            At Luxury Times, we believe in the art of curation. Our selection process is meticulous, ensuring that each 
            watch we offer is a reflection of our commitment to excellence and our understanding of our clients' desires.
          </p>
          
        </section>
      </article>

      <ContactForm contactTitle="Share Your Thoughts" 
          contactDescription="Share your thoughts on the Rolex Day-Date 40 with the olive green dial and whether you think it will be discontinued in 2025?"
          />


      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Luxury Times | The Ultimate Guide to Exceptional Timepieces</p>
        <p>For inquiries about our luxury watch collection, please contact our horological experts.</p>
      </footer>
    </div>
  );
} 