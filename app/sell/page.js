import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './sell.module.css'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'

export default function Sell() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Image 
          src={'/sell_hero.jpg'} 
          width={2880} 
          height={1200} 
          className={styles.heroImage}
          alt='Professional watch evaluation and selling service' 
          quality={100} 
          priority
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Sell Your Luxury Timepiece</h1>
            <p className={styles.heroSubtitle}>
              Get the best value for your watch with our expert evaluation and transparent pricing
            </p>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <div className={styles.backNavigation}>
        <Link href={'/'} className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>Home</span>
        </Link>
      </div>

      {/* Main Content Container */}
      <div className={styles.container}>

        {/* Process Section */}
        <section className={styles.processSection}>
          <h2 className={styles.sectionTitle}>Our Simple Three-Step Process</h2>
          <p className={styles.sectionSubtitle}>
            Selling your luxury watch has never been easier. Follow our streamlined process designed for your convenience.
          </p>
          
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Initial Consultation</h3>
                <p className={styles.stepDescription}>
                  Contact our team with your watch details—make, model, condition, and any relevant documentation. 
                  We&apos;ll provide you with a preliminary valuation based on current market conditions.
                </p>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Professional Evaluation</h3>
                <p className={styles.stepDescription}>
                  Choose from an in-person consultation at our Mayfair or Hatton Garden showroom, or schedule a 
                  secure video call for a real-time evaluation. Our experts will assess authenticity, condition, and market value.
                </p>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Final Offer & Payment</h3>
                <p className={styles.stepDescription}>
                  Receive a competitive, transparent offer. Upon acceptance, we&apos;ll complete authentication verification 
                  and issue immediate payment via your preferred method—bank transfer, cheque, or cash.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ContactForm />


        {/* Image Section */}
        <section className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image 
              src={'/world_of_watches.png'} 
              width={1456} 
              height={816} 
              className={styles.contentImage}
              alt='Luxury watch collection and expertise' 
              quality={100} 
            />
          </div>
        </section>

        {/* Detailed Process Section */}
        <section className={styles.detailedSection}>
          <h2 className={styles.sectionTitle}>How We Determine Your Watch&apos;s Value</h2>
          
          <div className={styles.detailedContent}>
            <div className={styles.detailedBlock}>
              <h3 className={styles.detailedTitle}>Market Analysis</h3>
              <p className={styles.detailedText}>
                Our team continuously monitors global auction results, dealer networks, and market trends to ensure 
                our valuations reflect the true current market value of your timepiece.
              </p>
            </div>

            <div className={styles.detailedBlock}>
              <h3 className={styles.detailedTitle}>Condition Assessment</h3>
              <p className={styles.detailedText}>
                Every watch undergoes meticulous examination of its case, dial, movement, bracelet, and overall 
                condition. We use professional grading standards to accurately assess your watch&apos;s state.
              </p>
            </div>

            <div className={styles.detailedBlock}>
              <h3 className={styles.detailedTitle}>Provenance & Documentation</h3>
              <p className={styles.detailedText}>
                Original boxes, papers, service records, and warranty documentation significantly enhance value. 
                We carefully review all accompanying materials to maximize your watch&apos;s worth.
              </p>
            </div>

            <div className={styles.detailedBlock}>
              <h3 className={styles.detailedTitle}>Authenticity Verification</h3>
              <p className={styles.detailedText}>
                Our certified experts verify authenticity through movement inspection, serial number verification, 
                and comparison with manufacturer specifications. This ensures both buyer and seller confidence.
              </p>
            </div>
          </div>
        </section>


        {/* Trust Section */}
        <section className={styles.trustSection}>
          <div className={styles.trustContent}>
            <h2 className={styles.trustTitle}>Trusted by Collectors Worldwide</h2>
            <p className={styles.trustDescription}>
              With over 25 years of experience in the luxury timepiece industry, Luxury Times Ltd has established 
              itself as a premier destination for buying and selling fine watches. Our family-run business combines 
              traditional expertise with modern market knowledge, ensuring every transaction is handled with the 
              utmost professionalism and care.
            </p>
            <p className={styles.trustDescription}>
              We specialize in Rolex, Patek Philippe, Audemars Piguet, and other prestigious brands, offering 
              competitive valuations and transparent processes. Whether you&apos;re selling a single timepiece or 
              an entire collection, we provide personalized service tailored to your needs.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Sell Your Watch?</h2>
          <p className={styles.ctaSubtitle}>
            Get started today with a free, no-obligation valuation from our expert team.
          </p>
         
        </section>
      </div>
    </main>
  )
}
