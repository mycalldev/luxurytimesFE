import Image from 'next/image'
import { Cormorant_Garamond } from 'next/font/google'
import VideoEmbed from './VideoEmbed'
import styles from './daytona116520.module.css'
import CtaLink from './CtaLink'
import GoogleReviews from '../components/GoogleReviews'
import CallSpecialistBtn from './CallSpecialistBtn'
import SpeakToTeamBtn from './SpeakToTeamBtn'

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
    'Explore the Rolex Daytona 116520 White Dial, the final pre-ceramic steel Daytona.',
  alternates: {
    canonical: '/daytona-116520',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/daytona-116520',
    siteName: 'Luxury Times',
    title: 'Iconic Dial · Rolex Daytona 116520 · Luxury Times',
    description:
      'Explore the Rolex Daytona 116520 White Dial, the final pre-ceramic steel Daytona.',
    images: [
      {
        url: '/landing/daytona/rolex-daytona-116520-white-dial.png',
        alt: 'Rolex Daytona 116520 White Dial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iconic Dial · Rolex Daytona 116520 · Luxury Times',
    description:
      'Explore the Rolex Daytona 116520 White Dial, the final pre-ceramic steel Daytona.',
    images: ['/landing/daytona/rolex-daytona-116520-white-dial.png'],
  },
}

const BASE_URL = 'https://luxurytimesltd.co.uk'

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      '@id': `${BASE_URL}/daytona-116520#product`,
      'name': 'Rolex Daytona 116520 White Dial',
      'description': 'The Rolex Daytona 116520 White Dial is the final pre-ceramic steel Daytona. Powered by the in-house calibre 4130 chronograph movement, featuring an engraved steel tachymeter bezel, screw-down pushers, classic white dial, and Oyster bracelet with Easylink extension. Authenticated and available for private viewing at our Mayfair showroom.',
      'brand': {
        '@type': 'Brand',
        'name': 'Rolex',
      },
      'model': 'Daytona 116520',
      'mpn': '116520',
      'sku': 'ROL-116520-WD',
      'category': 'Pre-Owned Luxury Watches',
      'image': [
        `${BASE_URL}/landing/daytona/rolex-daytona-116520-white-dial.png`,
        `${BASE_URL}/landing/daytona/rolex-daytona-116520-desktop.webp`,
        `${BASE_URL}/landing/daytona/rolex-daytona-116520-wrist.webp`,
        `${BASE_URL}/landing/daytona/rolex-daytona-116520-bracelet-desktop.webp`,
        `${BASE_URL}/landing/daytona/rolex-daytona-116520-crown.webp`,
        `${BASE_URL}/landing/daytona/rolex-daytona-116520-crown-side-desktop.webp`,
      ],
      'itemCondition': 'https://schema.org/UsedCondition',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5',
        'reviewCount': '39',
        'bestRating': '5',
        'worstRating': '1',
      },
      'additionalProperty': [
        { '@type': 'PropertyValue', 'name': 'Reference Number', 'value': '116520' },
        { '@type': 'PropertyValue', 'name': 'Movement', 'value': 'Rolex Calibre 4130 Automatic Chronograph' },
        { '@type': 'PropertyValue', 'name': 'Case Material', 'value': 'Stainless Steel (Oystersteel)' },
        { '@type': 'PropertyValue', 'name': 'Case Diameter', 'value': '40mm' },
        { '@type': 'PropertyValue', 'name': 'Dial Colour', 'value': 'White' },
        { '@type': 'PropertyValue', 'name': 'Bezel', 'value': 'Engraved Steel Tachymeter' },
        { '@type': 'PropertyValue', 'name': 'Bracelet', 'value': 'Oyster with Easylink Extension' },
        { '@type': 'PropertyValue', 'name': 'Water Resistance', 'value': '100 metres / 330 feet' },
        { '@type': 'PropertyValue', 'name': 'Production Period', 'value': '2000–2016' },
        { '@type': 'PropertyValue', 'name': 'Generation', 'value': 'Pre-Ceramic (Final Generation)' },
      ],
      'offers': {
        '@type': 'Offer',
        'url': `${BASE_URL}/products/rolex-daytona-pre-ceramic-panda-chronograph-ref-116520`,
        'priceCurrency': 'GBP',
        'price': '20995',
        'description': 'Rolex Daytona 116520 White Dial — pre-owned, authenticated.',
        'availability': 'https://schema.org/InStock',
        'itemCondition': 'https://schema.org/UsedCondition',
        'seller': {
          '@type': 'Organization',
          'name': 'Luxury Times',
          'url': BASE_URL,
        },
      },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}#organization`,
      'name': 'Luxury Times',
      'url': BASE_URL,
      'logo': `${BASE_URL}/logo_it.png`,
      'description': 'Independent luxury watch dealer specialising in pre-owned Rolex, Patek Philippe, Audemars Piguet and Richard Mille. GIA accredited. Based in Mayfair and Hatton Garden, London.',
      'telephone': '+447999297359',
      'email': 'info@luxurytimesltd.co.uk',
      'address': [
        {
          '@type': 'PostalAddress',
          'name': 'Mayfair Showroom',
          'streetAddress': "15 St George's House, Hanover Square",
          'addressLocality': 'London',
          'postalCode': 'W1S 1HS',
          'addressCountry': 'GB',
        },
        {
          '@type': 'PostalAddress',
          'name': 'Hatton Garden',
          'streetAddress': '100 Hatton Garden',
          'addressLocality': 'London',
          'postalCode': 'EC1N 8NX',
          'addressCountry': 'GB',
        },
      ],
      'sameAs': ['https://www.instagram.com/luxurytimeslondon/'],
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/daytona-116520#webpage`,
      'url': `${BASE_URL}/daytona-116520`,
      'name': 'Rolex Daytona 116520 White Dial | Luxury Times',
      'description': 'Explore the Rolex Daytona 116520 White Dial — the final pre-ceramic steel Daytona. Authenticated and in stock. Available for private viewing at our Mayfair showroom.',
      'inLanguage': 'en-GB',
      'isPartOf': {
        '@type': 'WebSite',
        'url': BASE_URL,
        'name': 'Luxury Times',
      },
      'about': { '@id': `${BASE_URL}/daytona-116520#product` },
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
          { '@type': 'ListItem', 'position': 2, 'name': 'Rolex Collection', 'item': `${BASE_URL}/products/collections/rolex` },
          { '@type': 'ListItem', 'position': 3, 'name': 'Rolex Daytona 116520', 'item': `${BASE_URL}/daytona-116520` },
        ],
      },
    },
  ],
}

const DAYTONA_PDP =
  'https://luxurytimesltd.co.uk/products/rolex-daytona-pre-ceramic-panda-chronograph-ref-116520'
const DAYTONA_COLLECTION = '/products/collections/rolex?model=Daytona'

const IMG = {
  hero: '/landing/daytona/rolex-daytona-116520-desktop.webp',
  heroMobile: '/landing/daytona/rolex-daytona-116520-mobile.webp',
  product: '/landing/daytona/rolex-daytona-116520-white-dial.png',
  whyCollectors: '/landing/daytona/rolex-daytona-116520-wrist.webp',
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
    imgMobile: '/landing/daytona/rolex-daytona-116520-watch-right-mobile.webp',
    imgDesktop: '/landing/daytona/rolex-daytona-116520-watch-desktop.webp',
    alt: 'Rolex Daytona 116520 with engraved steel bezel — the final pre-ceramic generation',
    title: 'PRE-CERAMIC BEZEL',
    body: 'The engraved stainless steel tachymeter bezel measures speed against elapsed time — the defining signature of the 116520 and the final generation before Rolex transitioned to ceramic.',
  },
  {
    imgMobile: '/landing/daytona/rolex-daytona-116520-watch-left-mobile.webp',
    imgDesktop: '/landing/daytona/rolex-daytona-116520-crown-side-desktop.webp',
    alt: 'Side profile of the Rolex Daytona 116520 white dial',
    title: 'WHITE DIAL',
    body: 'The white dial delivers exceptional legibility — contrasting black subsidiary registers and precisely applied indices that define the classic Panda configuration.',
  },
  {
    imgMobile: '/landing/daytona/rolex-daytona-116520-bracelet-mobile.webp',
    imgDesktop: '/landing/daytona/rolex-daytona-116520-bracelet-desktop.webp',
    alt: 'Close-up of the Rolex Daytona 116520 Oyster bracelet',
    title: 'OYSTER BRACELET',
    body: 'Engineered for comfort and durability. Traditional Oyster clasp and Easylink extension.',
  },
  {
    imgMobile: '/landing/daytona/rolex-daytona-116520-crown-mobile.webp',
    imgDesktop: '/landing/daytona/rolex-daytona-116520-crown.webp',
    alt: 'Close-up of the Rolex Daytona 116520 screw-down crown',
    title: 'TIMELESS PRESENCE',
    body: 'Screw-down pushers framed by the engraved steel bezel. A balance of strength and refinement. Engineered to last for generations.',
  },
]

const accreditations = [
  { src: IMG.accredGia, alt: 'GIA accreditation' },
  { src: IMG.accredGema, alt: 'GemA accreditation' },
  { src: IMG.accredLdb, alt: 'London Diamond Bourse accreditation' },
]

export default function Daytona3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    <div className={`${styles.page} ${cormorant.variable}`}>
      <header className={styles.topHeading}>
        <span className={styles.topHeadingText}>Luxury Times Mayfair</span>
      </header>

      <section className={styles.hero}>
        <Image
          src={IMG.heroMobile}
          alt="Rolex Daytona 116520 worn in a Mayfair street setting"
          fill
          priority
          className={`${styles.heroImg} ${styles.imgMobile}`}
          sizes="(min-width: 720px) 1px, 100vw"
        />
        <Image
          src={IMG.hero}
          alt="Rolex Daytona 116520 worn in a Mayfair street setting"
          fill
          priority
          className={`${styles.heroImg} ${styles.imgDesktop}`}
          sizes="(max-width: 719px) 1px, 100vw"
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>
            Iconic
            <br />
            <em>Dial.</em>
          </h1>
          <p className={styles.heroTagline}>Every detail. Pure purpose.</p>
          <p className={styles.heroSub}>Rolex Daytona 116520 White Dial.</p>
          <CtaLink
            href={DAYTONA_PDP}
            ctaLabel="view_watch"
            ctaLocation="hero"
            className={styles.heroCta}
            rel="noopener noreferrer"
            target="_blank"
          >
            View watch
            <span className={styles.arrow} aria-hidden="true">→</span>
          </CtaLink>
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
                <Image
                  src={f.imgMobile}
                  alt={f.alt}
                  fill
                  className={styles.imgMobile}
                  sizes="(min-width: 720px) 1px, 100vw"
                />
                <Image
                  src={f.imgDesktop}
                  alt={f.alt}
                  fill
                  className={styles.imgDesktop}
                  sizes="(max-width: 719px) 1px, (min-width: 1100px) 275px, calc(50vw - 64px)"
                />
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.featuresCta}>
          <CtaLink
            href={DAYTONA_PDP}
            ctaLabel="view_watch"
            ctaLocation="features"
            className={styles.textCta}
            rel="noopener noreferrer"
            target="_blank"
          >
            View watch
            <span className={styles.arrow} aria-hidden="true">→</span>
          </CtaLink>
        </div>
      </section>

      <section className={styles.accreditation}>
        <h2 className={styles.accredTitle}>Trusted &amp; Accredited</h2>
        <div className={styles.accredLogos}>
          {accreditations.map((a) => (
            <div key={a.alt} className={styles.accredItem}>
              <Image src={a.src} alt={a.alt} width={180} height={80} style={{ width: 'auto', height: 'auto' }} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reviews}>
        <div className={styles.reviewsInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>What Our Clients Say</span>
          </div>
          <h2 className={styles.h2}>
            Trusted by <em>Collectors.</em>
          </h2>
          <GoogleReviews />
          <SpeakToTeamBtn />
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
            <Image
              src={IMG.whyCollectors}
              alt="Rolex Daytona 116520 White Dial worn on the wrist"
              fill
              sizes="(min-width: 1100px) 1036px, (min-width: 720px) calc(100vw - 96px), calc(100vw - 48px)"
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
          <h2 className={styles.h2}>
            Rolex Daytona
            <br />
            <em>Pre-Ceramic 116520.</em>
          </h2>
          <p className={styles.collectionBody}>
            A modern classic. The final engraved steel bezel Daytona before the ceramic era.
            Timeless design. Enduring value.
          </p>
          <CtaLink
            href={DAYTONA_COLLECTION}
            ctaLabel="explore_collection"
            ctaLocation="collection"
            className={styles.textCta}
          >
            Explore the collection
            <span className={styles.arrow} aria-hidden="true">→</span>
          </CtaLink>

          <article className={styles.productCard}>
            <div className={styles.productFigure}>
              <Image
                src={IMG.product}
                alt="Rolex Daytona 116520 White Dial"
                fill
                sizes="(min-width: 720px) 380px, calc(100vw - 48px)"
              />
            </div>
            <div className={styles.productBody}>
              <span className={styles.productTag}>Rolex Daytona</span>
              <h3 className={styles.productTitle}>116520 White Dial</h3>
              <span className={styles.productPrice}>£20,995</span>
              <CtaLink
                href={DAYTONA_PDP}
                ctaLabel="view_details"
                ctaLocation="product_card"
                className={styles.productCta}
                rel="noopener noreferrer"
                target="_blank"
              >
                View details
                <span className={styles.arrow} aria-hidden="true">→</span>
              </CtaLink>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.videoInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Watch in Detail</span>
          </div>
          <h2 className={styles.h2}>
            The Reference <em>Up Close.</em>
          </h2>
          <div className={styles.videoWrapper}>
            <VideoEmbed videoid="a8IcI7MVY6U" playlabel="Rolex Daytona 116520 White Dial" />
          </div>
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
            <CtaLink
              href={`${DAYTONA_PDP}#enquiry`}
              ctaLabel="book_a_viewing"
              ctaLocation="private_viewing"
              className={`${styles.btn} ${styles.btnNavy}`}
            >
              Book a viewing
              <span className={styles.arrow} aria-hidden="true">→</span>
            </CtaLink>
            <CallSpecialistBtn />
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
