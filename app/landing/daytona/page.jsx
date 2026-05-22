import { Cormorant_Garamond } from 'next/font/google'
import styles from './daytona.module.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--serif',
})

export const metadata = {
  title: 'The Daytona Edit · Luxury Times',
  description:
    'Iconic Dial. Every detail. Pure purpose. The Rolex Daytona 116520 — a study in precision and obsession.',
}

const ROLEX_COLLECTION = 'https://luxurytimesltd.co.uk/products/collections/rolex'
const DAYTONA_PDP =
  'https://luxurytimesltd.co.uk/products/rolex-daytona-pre-ceramic-panda-chronograph-ref-116520'

const SHIELD_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M11 2l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V5l7-3z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 11l2.5 2.5L15 9"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const GLOBE_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1" />
    <path
      d="M3 11h16M11 3c2.5 2.5 2.5 13.5 0 16M11 3c-2.5 2.5-2.5 13.5 0 16"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
)

const PIN_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M11 2c3.5 0 6 2.5 6 6 0 4.5-6 12-6 12S5 12.5 5 8c0-3.5 2.5-6 6-6z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <circle cx="11" cy="8" r="2" stroke="currentColor" strokeWidth="1" />
  </svg>
)

const trustItems = [
  { icon: GLOBE_ICON, k: 'Worldwide Secure Shipping', v: 'Fully insured, white-glove dispatch' },
  { icon: SHIELD_ICON, k: '100% Authenticated', v: 'Verified by in-house horologists' },
  { icon: PIN_ICON, k: 'Mayfair Showroom', v: 'Private viewings by appointment' },
]

const showcaseCards = [
  {
    num: '01',
    tag: 'Daytona',
    title: 'Engraved Steel Bezel',
    body: 'The tachymetric scale, machined into Oystersteel. The first generation to redefine what ceramic could not.',
    img: '/landing/daytona/card-01-engraved-bezel.png',
    alt: 'Engraved Steel Bezel',
  },
  {
    num: '02',
    tag: 'Other Dial',
    title: 'The White Dial',
    body: 'Clean, balanced, instantly recognisable. A composition that has never aged.',
    img: '/landing/daytona/card-02-white-dial.png',
    alt: 'The White Dial',
  },
  {
    num: '03',
    tag: 'Dial Ageing',
    title: 'Patina & Age',
    body: 'A close study of luminous indices and how time signs its work in cream and tobacco.',
    img: '/landing/daytona/card-03-patina-age.png',
    alt: 'Patina & Age',
  },
  {
    num: '04',
    tag: 'Oyster Bracelet',
    title: 'Oyster Bracelet',
    body: 'Engineered for comfort and durability. The balance of strength and refinement.',
    img: '/landing/daytona/card-04-oyster-bracelet.png',
    alt: 'Oyster Bracelet',
  },
]

const specs = [
  { k: 'Movement', v: 'Calibre 4130' },
  { k: 'Case', v: '40mm Oystersteel' },
  { k: 'Bracelet', v: 'Oyster, three-link' },
  { k: 'Production', v: '2000 – 2016' },
]

export default function DaytonaLandingPage() {
  return (
    <div className={`${styles.page} ${cormorant.variable}`}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a className={styles.logo} href="/">
            <span className={styles.logoMark}>LUXURY TIMES</span>
            <span className={styles.logoRule} aria-hidden="true" />
            <span className={styles.logoSub}>LONDON · EST. 1998</span>
          </a>
          <div className={styles.navRight}>
            <a className={styles.navPhone} href="tel:+442074931998">
              +44 (0)20 7493 1998
            </a>
            <span className={styles.navSep} aria-hidden="true" />
            <a
              className={`${styles.navPhone} ${styles.navPhoneGold}`}
              href="mailto:hello@luxurytimes.co.uk"
            >
              hello@luxurytimes.co.uk
            </a>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img
            src="/landing/daytona/hero-daytona-wrist.png"
            alt="Rolex Daytona on wrist"
            className={styles.heroPhoto}
          />
          <div className={styles.heroVignette} aria-hidden="true" />
        </div>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>The Daytona Edit · 04</span>
            </div>
            <h1 className={styles.heroTitle}>
              Iconic
              <br />
              <em>Dial.</em>
            </h1>
            <div className={styles.heroSub}>Every detail. Pure purpose.</div>
            <p className={styles.heroBody}>
              The Daytona 116520 is a study in precision and obsession. Engineered to perform.
              Designed to last generations.
            </p>
            <div className={styles.heroCtas}>
              <a href={ROLEX_COLLECTION} className={`${styles.btn} ${styles.btnGold}`}>
                Explore the Collection
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
              <a href={DAYTONA_PDP} className={`${styles.btn} ${styles.btnGhost}`}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trust} aria-label="Service guarantees">
        {trustItems.map((item) => (
          <div key={item.k} className={styles.trustItem}>
            <div className={styles.trustIcon}>{item.icon}</div>
            <div>
              <div className={styles.trustK}>{item.k}</div>
              <div className={styles.trustV}>{item.v}</div>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.ruleSection} aria-hidden="true" />

      <section className={styles.showcase}>
        <div className={styles.showcaseHead}>
          <div className={styles.showcaseHeadLeft}>
            <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>The Daytona Legacy</span>
            </div>
            <h2 className={styles.h2}>
              Born on the track.
              <br />
              <em>Made for eternity.</em>
            </h2>
          </div>
          <p className={styles.h2Lede}>
            Four details, decades of obsession. The 116520 is a chronograph in conversation with
            its own history — each surface answering the one before.
          </p>
        </div>

        <div className={styles.grid}>
          {showcaseCards.map((card) => (
            <article key={card.num} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={card.img} alt={card.alt} className={styles.cardPhoto} />
                <div className={styles.cardNum}>{card.num}</div>
                <div className={styles.cardHover}>
                  <span>View detail</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </div>
              </div>
              <div className={styles.cardFoot}>
                <div className={styles.cardTag}>{card.tag}</div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardBody}>{card.body}</div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.showcaseCta}>
          <a href="https://luxurytimesltd.co.uk/blog" className={styles.goldLink}>
            Discover the story
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className={styles.ruleSection} aria-hidden="true" />

      <section className={styles.accred}>
        <div className={`${styles.eyebrow} ${styles.eyebrowDark} ${styles.eyebrowCenter}`}>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <span>Trusted &amp; Accredited</span>
          <span className={styles.eyebrowRule} aria-hidden="true" />
        </div>
        <div className={styles.accredRow}>
          <div className={styles.accredMark}>
            <img
              src="/landing/daytona/accred-ldb.jpg"
              alt="London Diamond Bourse"
              className={styles.accredLogo}
            />
          </div>
          <span className={styles.accredSep} aria-hidden="true" />
          <div className={styles.accredMark}>
            <img
              src="/landing/daytona/accred-gema.png"
              alt="Gem-A — The Gemmological Association of Great Britain"
              className={styles.accredLogo}
            />
          </div>
          <span className={styles.accredSep} aria-hidden="true" />
          <div className={styles.accredMark}>
            <img
              src="/landing/daytona/accred-gia.png"
              alt="GIA — Gemological Institute of America"
              className={styles.accredLogo}
            />
          </div>
        </div>
      </section>

      <div className={styles.ruleSection} aria-hidden="true" />

      <section className={styles.featured}>
        <div className={styles.featuredText}>
          <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Rolex Daytona</span>
          </div>
          <h2 className={styles.h2}>
            Iconic in every
            <br />
            <em>detail.</em>
          </h2>
          <p className={styles.featuredBody}>
            A modern classic. The reference 116520 represents the finest era of the legendary
            Zenith-powered Daytona before the ceramic bezel. Timeless design, mechanical excellence
            and enduring value — held in private hands and quietly reappearing for those who
            recognise it.
          </p>
          <dl className={styles.specGrid}>
            {specs.map((spec) => (
              <div key={spec.k} className={styles.specCell}>
                <dt>{spec.k}</dt>
                <dd>{spec.v}</dd>
              </div>
            ))}
          </dl>
          <a href={ROLEX_COLLECTION} className={styles.goldLink}>
            Explore the collection
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.featuredCard}>
          <div className={styles.featuredImgWrap}>
            <img
              src="/landing/daytona/featured-116520-white-dial.png"
              alt="Rolex Daytona 116520 White Dial"
              className={styles.featuredImg}
            />
          </div>
          <div className={styles.featuredCaption}>
            <div className={styles.featuredEyebrow}>Rolex Daytona</div>
            <div className={styles.featuredTitle}>116520 White Dial</div>
            <span className={styles.featuredCaptionRule} aria-hidden="true" />
            <a href={DAYTONA_PDP} className={styles.featuredView}>
              View Details
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.showroom}>
        <div className={styles.showroomInner}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>Private viewings</span>
            </div>
            <h2 className={`${styles.h2} ${styles.h2Light}`}>
              See the piece
              <br />
              <em>in person.</em>
            </h2>
          </div>
          <div className={styles.showroomRight}>
            <p className={styles.showroomBody}>
              Spend an hour with one of our specialists at our Mayfair or Hatton Garden showrooms.
              Handle the watch, study the provenance, ask anything.
            </p>
            <a href="/contact" className={`${styles.btn} ${styles.btnGold}`}>
              Visit the showroom
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerCol}>
            <h3 className={styles.footerH}>Visit Us</h3>
            <span className={styles.footerHRule} aria-hidden="true" />
            <div className={styles.addr}>
              <div className={styles.addrPlace}>Mayfair</div>
              <div>15 St George&apos;s House</div>
              <div>Hanover Square London, W1S 1HS</div>
            </div>
            <div className={styles.addr}>
              <div className={styles.addrPlace}>Hatton Garden</div>
              <div>100 Hatton Garden</div>
              <div>London, EC1N 8NX</div>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h3 className={styles.footerH}>Quick Links</h3>
            <span className={styles.footerHRule} aria-hidden="true" />
            <a className={styles.footerLink} href="/products">
              Shop Watches
            </a>
            <a className={styles.footerLink} href="/sell">
              Sell Your Watch
            </a>
            <a className={styles.footerLink} href="/blog">
              Blog
            </a>
            <a className={styles.footerLink} href="/contact">
              Contact Us
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div>© 2026 Luxury Times. All rights reserved.</div>
          <div>
            We are independent dealers. All watches are genuine and authenticated via our in-house
            experts.
          </div>
          <div>VAT No: 457606667 | Company No: 15300276</div>
        </div>
      </footer>
    </div>
  )
}
