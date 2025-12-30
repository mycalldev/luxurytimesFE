import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import BrandCard from './components/BrandCard'
import Button from './components/Button'
import BlogFeature from './components/BlogFeature'
import ContactForm from './components/ContactForm'

// Define metadata for the page using Next.js Metadata API
export const metadata = {
  title: 'Luxury Times - Exclusive Luxury Watches',
  description: 'Discover premium luxury watches at Luxury Times. Authorized dealer for Rolex, Patek Philippe, and Audemars Piguet.',
  openGraph: {
    title: 'Luxury Times - Exclusive Luxury Watches',
    description: 'Discover premium luxury watches at Luxury Times. Authorized dealer for Rolex, Patek Philippe, and Audemars Piguet.',
    images: [
      {
        url: '/favicon.ico',
        width: 500,
        height: 500,
      },
    ],
    type: 'website',
  },
};


export default async function Home() {
  
  return (
    <>
      <main className={styles.main}>
      <section className={styles.containerFeature}>

    {/* HERO SECTION */}
      {/* MOBILE HERO */}
      <Image
        className={styles.heroImageMobile}
        src={'/home-page-hero-mobile.JPG'}
        width={2304}
        height={1536}
        alt={'hero image'}
        quality={100}
      />

      {/* DESKTOP HERO */}
      <Image
        className={styles.heroImageDesktop}
        src={'/home-page-hero-desktop.jpeg'}
        width={2304}
        height={644}
        alt={'hero image'}
        quality={100}
      />
      
      <Button href="tel:07714611699" desktopText="07714611699">
        CONTACT
      </Button>
      

      {/* CATEGORY SECTION */}
      <section className={styles.categoryContainerGrid}>
          <BrandCard 
            image="/Rolex_thumb.JPG"
            title="Rolex"
            href="/products/collections/rolex"
            width={3272.5}
            height={2181.5}
            altText="Rolex watches collection"
          />

          <BrandCard 
            image="/PP_thumb.JPG"
            title="Patek Philippe"
            href="/products/collections/patek-philippe"
            width={3272.5}
            height={2181.5}
            altText="Patek Philippe watches collection"
          />

      </section>
      </section>

      {/* Explore All Watches CTA */}
      <section className={styles.exploreSection}>
        <div className={styles.exploreContainer}>
          <h2 className={styles.exploreTitle}>Explore Our Complete Collection</h2>
          <p className={styles.exploreDescription}>
            Discover our full range of luxury timepieces from the world's most prestigious watchmakers
          </p>
          <div className={styles.exploreButton}>
            <Button href="/products" prefetch={true}>
              Explore All Watches
            </Button>
          </div>
        </div>
      </section>

      <div className={styles.spaceDesktop}></div>

      <section className={styles.showcaseContainer}>
        <div className={styles.keyPointsSection}>
          <h2 className={styles.keyPointsHeading}>Experience The Luxury Times Difference</h2>
          <ul className={styles.keyPointsList}>
            <li className={styles.keyPoint}>
              <strong>Family Run, Trusted Service:</strong> Over 25 years of experience in luxury timepieces, offering honest advice and personal attention.
            </li>
            <li className={styles.keyPoint}>
              <strong>Quality Assured:</strong> Every watch is meticulously inspected for authenticity, provenance, and condition.
            </li>
            <li className={styles.keyPoint}>
              <strong>Expert Guidance:</strong> From buying to selling, receive tailored guidance every step of the way—no question is too small!
            </li>
          </ul>
        </div>
      </section>

      {/* BLOG FEATURE SECTION */}
      <BlogFeature limit={2} />
      

      <ContactForm />
    </main>
    </>
  )
}
  