import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import BrandCard from './components/BrandCard'
import Button from './components/Button'

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
            <li className={styles.keyPoint}>
              <strong>Competitive Pricing:</strong> Transparent, fair prices on all watches and jewellery. No hidden fees.
            </li>
            <li className={styles.keyPoint}>
              <strong>Fast, Secure Transactions:</strong> Convenient contact options and a safe, seamless buying or selling process.
            </li>
          </ul>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section>
         <Link href={'/blog'} prefetch={true}>
            <Image src={'/rolex_book.jpg'} width={2303} height={1536} className={styles.imageBlogs} alt={'image of Sky-dweller'} quality={100} />
          </Link>
            <div className={styles.contentHighlightsContainer}>
              {/* <div className={styles.conenttitleHighlights}>Watches</div> */}
              <div className={styles.contentSubTitleHighlights}>Time Investment</div>
              <div className={styles.paragraphHighlights1}>Investing in time.... Investing in your future! The Watch world has geneated a ton of interest in recent times and for good....</div>
            </div> 
      
        <Button href="/blog" prefetch={true}>
          Read More
        </Button>
      
      </section>
            
      {/* HIGHLIGHT SECTION */}
      
       <section>
          <h1 className={styles.titleHighlights}>HIGHLIGHTS</h1>
          <Link href={'/landing/SkyDweller'} prefetch={true}>
            <Image src={'/highlight.JPG'} width={840} height={560} className={styles.imageHighlights} alt={'image of Sky-dweller'} quality={100} />
          </Link>
          <div className={styles.contentHighlightsContainer}>
            <div className={styles.contentSubTitleHighlights}>Sky Dweller</div>
            <div className={styles.paragraphHighlights1}>Introducing the Rolex Sky-Dweller! Where elegance meets precsion.... With its iconic design, dual time zones, and....</div>
          </div> 
      
        <Button href="/landing/SkyDweller" prefetch={true}>
          Read More
        </Button>
    
      </section>
    </main>
    </>
  )
}
  