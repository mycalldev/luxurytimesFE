
import Image from 'next/image'
import styles from './page.module.css'
import BrandCard from './components/BrandCard'
import Button from './components/Button'
import BlogFeature from './components/BlogFeature'
import ContactForm from './components/ContactForm'
import HeroSlider from './components/HeroSlider'
import FeaturedProducts from './components/FeaturedProducts'
import { getFeaturedProducts } from './utils/shopify'

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
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <main className={styles.main}>
      <section className={styles.containerFeature}>

    {/* HERO SECTION */}
      <HeroSlider
        images={[
          {
            src: '/AP_hero.jpg',
            srcDesktop: '/AP_hero_Desktop.jpg',
            alt: 'Audemars Piguet luxury watch',
            width: 2000,
            height: 1333,
            widthDesktop: 2000,
            heightDesktop: 1000
          },
          {
            src: '/PP_hero.jpg',
            srcDesktop: '/PP_hero_Desktop.jpg',
            alt: 'Patek Philippe luxury watch',
            width: 2000,
            height: 1333,
            widthDesktop: 2000,
            heightDesktop: 1000
          },
          {
            src: '/Rolex_hero.jpg',
            srcDesktop: '/Rolex_hero_Desktop.jpg',
            alt: 'Rolex luxury watch',
            width: 2000,
            height: 1333,
            widthDesktop: 2000,
            heightDesktop: 1000
          },
        ]}
        slideInterval={3000}
      />
      
      {/* Explore All Watches CTA */}
      <section className={styles.exploreSection}>
        <div className={styles.exploreContainer}>
          <h2 className={styles.exploreTitle}>Explore Our Complete Collection</h2>
          <p className={styles.exploreDescription}>
            Discover our full range of Luxury Timepieces
          </p>
          <div className={styles.exploreButton}>
            <Button href="/products" prefetch={true}>
              Explore All Watches
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <FeaturedProducts products={featuredProducts} />
      {/* CATEGORY SECTION */}
      <section className={styles.categoryContainerGrid}>
          <BrandCard 
            image="/Rolex_thumb.jpg"
            title="Rolex"
            href="/products/collections/rolex"
            width={640}
            height={428}
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

      {/* CREDIBILITY SECTION */}
      <section className={styles.credibilitySection}>
        <div className={styles.credibilityContainer}>
          <p className={styles.credibilitySubtitle}>Trusted & Accredited</p>
          <div className={styles.credibilityLogos}>
            <div className={styles.credibilityItem}>
              <div className={styles.credibilityLogoWrapper}>
                <Image
                  src="/fga.png"
                  alt="Fellow of the Gemmological Association of Great Britain"
                  width={200}
                  height={100}
                  className={styles.credibilityLogo}
                  quality={100}
                />
              </div>
              <span className={styles.credibilityLabel}>FGA - Gemmological Association</span>
            </div>
            <div className={styles.credibilityDivider} />
            <div className={styles.credibilityItem}>
              <div className={styles.credibilityLogoWrapper}>
                <Image
                  src="/bourse_logo.jpg"
                  alt="London Diamond Bourse Member"
                  width={200}
                  height={100}
                  className={styles.credibilityLogo}
                  quality={100}
                />
              </div>
              <span className={styles.credibilityLabel}>London Diamond Bourse</span>
            </div>
            <div className={styles.credibilityDivider} />
            <div className={styles.credibilityItem}>
              <div className={styles.credibilityLogoWrapper}>
                <Image
                  src="/NAJ.png"
                  alt="National Association of Jewellers Member"
                  width={200}
                  height={100}
                  className={styles.credibilityLogo}
                  quality={100}
                />
              </div>
              <span className={styles.credibilityLabel}>National Association of Jewellers</span>
            </div>
          </div>
        </div>
      </section>

      </section>

      <div className={styles.spaceDesktop}></div>
      {/* BLOG FEATURE SECTION */}
      <BlogFeature limit={2} />
      

      <ContactForm />
    </main>
    </>
  )
}
  