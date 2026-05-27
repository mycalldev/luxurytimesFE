import { Cormorant_Garamond } from 'next/font/google'
import styles from './daytona116520.module.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--serif',
})

export const metadata = {
  title: 'Iconic Dial · Rolex Daytona 116520 · Luxury Times',
  description:
    'The Rolex Daytona 116520 White Dial. Every detail. Pure purpose. Authenticated by our in-house specialists in Mayfair and Hatton Garden.',
}

const DAYTONA_PDP =
  'https://luxurytimesltd.co.uk/products/rolex-daytona-pre-ceramic-panda-chronograph-ref-116520'
const ROLEX_COLLECTION = 'https://luxurytimesltd.co.uk/products/collections/rolex'
const DAYTONA_COLLECTION = '/products/collections/rolex?model=Daytona'

const IMG = {
  hero: '/landing/daytona/landing%20page-2%203.webp',
  product: '/landing/daytona/featured-116520-white-dial.png',
  whyCollectors: '/landing/daytona/watch-wrist.webp',
  accredGia: '/landing/daytona/accred-gia.png',
  accredGema: '/landing/daytona/accred-gema.png',
  accredLdb: '/landing/daytona/accred-ldb.jpg',
}

const trustItems = [
  { title: 'AUTHENTICATED', subtitle: '100% Genuine' },
  { title: 'WORLDWIDE', subtitle: 'Secure Shipping' },
  { title: 'MAYFAIR', subtitle: 'London Showroom' },
]

const features = [
  {
    imgMobile: '/landing/daytona/mobile%20watch_right_final.webp',
    imgDesktop: '/landing/daytona/full_watch_matched.webp',
    alt: 'Rolex Daytona 116520 full watch view',
    title: 'ICONIC DIAL',
    body: 'The classic engraved steel bezel — the final generation before ceramic.',
  },
  {
    imgMobile: '/landing/daytona/mobile%20watch_left_final.webp',
    imgDesktop: '/landing/daytona/crown_side_matched.webp',
    alt: 'Side profile of the Rolex Daytona 116520 white dial',
    title: 'WHITE DIAL',
    body: 'Screw-down pushers framed by the engraved steel bezel.',
  },
  {
    imgMobile: '/landing/daytona/mobile%20BRACELET-2%202.webp',
    imgDesktop: '/landing/daytona/BRACELET%20Close%20up%20.webp',
    alt: 'Close-up of the Rolex Oyster bracelet',
    title: 'OYSTER BRACELET',
    body: 'Engineered for comfort and durability. Traditional Oyster clasp and Easylink extension.',
  },
  {
    imgMobile: '/landing/daytona/mobile%20crown%20.webp',
    imgDesktop: '/landing/daytona/Crow%20nClose%20up%20.webp',
    alt: 'Close-up of the Rolex screw-down crown',
    title: 'TIMELESS PRESENCE',
    body: 'A balance of strength and refinement. Engineered to last for generations.',
  },
]

const accreditations = [
  { src: IMG.accredGia, alt: 'GIA accreditation' },
  { src: IMG.accredGema, alt: 'GemA accreditation' },
  { src: IMG.accredLdb, alt: 'London Diamond Bourse accreditation' },
]

export default function Daytona3Page() {
  return (
    <div className={`${styles.page} ${cormorant.variable}`}>
      <header className={styles.topHeading}>
        <span className={styles.topHeadingText}>Luxury Times Mayfair</span>
      </header>

      <section className={styles.hero}>
        <img
          src={IMG.hero}
          alt="Rolex Daytona 116520 worn in a Mayfair street setting"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>
            Iconic
            <br />
            <em>Dial.</em>
          </h1>
          <p className={styles.heroTagline}>Every detail. Pure purpose.</p>
          <p className={styles.heroSub}>Rolex Daytona 116520 White Dial.</p>
          <a
            href={DAYTONA_PDP}
            className={styles.heroCta}
            rel="noopener noreferrer"
            target="_blank"
          >
            View watch
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Trust indicators">
        {trustItems.map((item) => (
          <div key={item.title} className={styles.trustItem}>
            <span className={styles.trustTitle}>{item.title}</span>
            <span className={styles.trustSub}>{item.subtitle}</span>
          </div>
        ))}
      </section>

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Crafted for Connoisseurs</span>
          </div>
          <h2 className={styles.h2}>
            Every Detail. <em>Pure Purpose.</em>
          </h2>
          <p className={styles.lede}>
            The Daytona 116520 is a study in precision and balance. Engineered to perform.
            Designed to last for generations.
          </p>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <article key={f.title} className={styles.featureCard}>
              <div className={styles.featureFigure}>
                <picture>
                  <source media="(min-width: 720px)" srcSet={f.imgDesktop} />
                  <img src={f.imgMobile} alt={f.alt} />
                </picture>
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.featuresCta}>
          <a
            href={DAYTONA_PDP}
            className={styles.textCta}
            rel="noopener noreferrer"
            target="_blank"
          >
            View watch
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className={styles.accreditation}>
        <h2 className={styles.accredTitle}>Trusted &amp; Accredited</h2>
        <div className={styles.accredLogos}>
          {accreditations.map((a) => (
            <div key={a.alt} className={styles.accredItem}>
              <img src={a.src} alt={a.alt} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.whyCollectors}>
        <div className={styles.whyInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Why Collectors Choose the 116520</span>
          </div>
          <h2 className={styles.h2}>
            Iconic in <em>Every Detail.</em>
          </h2>
          <div className={styles.whyFigure}>
            <img
              src={IMG.whyCollectors}
              alt="Lifestyle image of the Rolex Daytona on wrist"
            />
          </div>
          <div className={styles.whyCopy}>
            <span className={styles.whyTag}>The Movement</span>
            <p className={styles.whyBody}>
              Powered by the in-house calibre 4130 — renowned for precision, reliability, and the
              fewest components of any chronograph movement of its era.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.collection}>
        <div className={styles.collectionInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Our Iconic Collection</span>
          </div>
          <h2 className={styles.h2}>
            Rolex Daytona
            <br />
            <em>Pre-Ceramic 116520.</em>
          </h2>
          <p className={styles.collectionBody}>
            A modern classic. The final engraved steel bezel Daytona before the ceramic era.
            Timeless design. Enduring value.
          </p>
          <a href={DAYTONA_COLLECTION} className={styles.textCta}>
            Explore the collection
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>

          <article className={styles.productCard}>
            <div className={styles.productFigure}>
              <img
                src={IMG.product}
                alt="Rolex Daytona 116520 White Dial product image"
              />
            </div>
            <div className={styles.productBody}>
              <span className={styles.productTag}>Rolex Daytona</span>
              <h3 className={styles.productTitle}>116520 White Dial</h3>
              <a
                href={DAYTONA_PDP}
                className={styles.productCta}
                rel="noopener noreferrer"
                target="_blank"
              >
                View details
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.privateViewing}>
        <div className={styles.pvInner}>
          <div className={styles.pvLabel}>
            <span className={styles.pvRule} aria-hidden="true" />
            <span>Private Viewing</span>
            <span className={styles.pvRule} aria-hidden="true" />
          </div>
          <h2 className={styles.pvTitle}>See it in person.</h2>
          <p className={styles.pvBody}>
            Spend an hour with one of our specialists at Mayfair or Hatton Garden. Handle the
            watch, study the provenance, and experience the reference in person.
          </p>
          <div className={styles.pvButtons}>
            <a href={`${DAYTONA_PDP}#enquiry`} className={`${styles.btn} ${styles.btnGold}`}>
              Book a viewing
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
            <a href="tel:+447999297359" className={`${styles.btn} ${styles.btnGhost}`}>
              Call the specialist
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
