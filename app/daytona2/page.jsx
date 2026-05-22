import { Cormorant_Garamond } from 'next/font/google'
import styles from './daytona2.module.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--serif',
})

export const metadata = {
  title: 'Daytona Cosmograph · Luxury Times',
  description:
    'The Rolex Cosmograph Daytona 116520. A study in restraint, precision and the quiet authority of a chronograph that needs no introduction.',
}

const ROLEX_COLLECTION = 'https://luxurytimesltd.co.uk/products/collections/rolex'
const DAYTONA_PDP =
  'https://luxurytimesltd.co.uk/products/rolex-daytona-pre-ceramic-panda-chronograph-ref-116520'

const IMG = {
  heroWrist: '/landing/daytona/landing%20page-2%203.jpg',
  banner: '/landing/daytona/kjhfdg-2%202.jpg',
  detailBezel: '/landing/daytona/0L1A1171-2%202.jpg',
  detailBracelet: '/landing/daytona/BRACELET-2%202.jpg',
  detailProfile: '/landing/daytona/jhkgjh%203.jpg',
}

const specs = [
  { k: 'Reference', v: '116520' },
  { k: 'Movement', v: 'Calibre 4130' },
  { k: 'Case', v: '40mm Oystersteel' },
  { k: 'Production', v: '2000 – 2016' },
]

const galleryItems = [
  {
    num: '01',
    tag: 'Bezel',
    title: 'Engraved Tachymeter',
    body: 'The pre-ceramic steel bezel — milled, engraved, and polished to a mirror finish that catches every change in light.',
    img: IMG.detailBezel,
    alt: 'Macro view of Daytona engraved steel bezel and crown',
  },
  {
    num: '02',
    tag: 'Bracelet',
    title: 'Oyster Clasp',
    body: 'The Oysterlock clasp — quiet, secure, finished to the same standard as the case. A study in understatement.',
    img: IMG.detailBracelet,
    alt: 'Soft focus view of the Daytona Oyster bracelet and clasp',
  },
  {
    num: '03',
    tag: 'Profile',
    title: 'Cosmograph Stance',
    body: 'Forty millimetres of Oystersteel, the original Daytona silhouette captured from three-quarter angle.',
    img: IMG.detailProfile,
    alt: 'Three-quarter view of the Rolex Daytona 116520',
  },
]

export default function Daytona2Page() {
  return (
    <div className={`${styles.page} ${cormorant.variable}`}>
      <div className={styles.topbar}>
        <a className={styles.brand} href="/">
          <span className={styles.brandMark}>LUXURY TIMES</span>
          <span className={styles.brandSub}>LONDON · EST. 1998</span>
        </a>
        <div className={styles.topbarRight}>
          <a className={styles.topbarLink} href="tel:+442074931998">
            +44 20 7493 1998
          </a>
          <a className={styles.topbarLink} href="mailto:hello@luxurytimes.co.uk">
            Enquire
          </a>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={IMG.heroWrist} alt="Rolex Daytona 116520 worn with a tailored suit" />
        </div>
        <div className={styles.heroCopy}>
          <div className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Cosmograph Daytona</span>
          </div>
          <h1 className={styles.heroTitle}>
            Quiet
            <br />
            <em>authority.</em>
          </h1>
          <p className={styles.heroLede}>
            The reference 116520. A chronograph that earned its place not by speaking loudly, but
            by being right — every dimension, every finish, every movement of the second hand.
          </p>
          <div className={styles.heroCtas}>
            <a href={DAYTONA_PDP} className={`${styles.btn} ${styles.btnGold}`}>
              View this piece
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
            <a href={ROLEX_COLLECTION} className={`${styles.btn} ${styles.btnGhostLight}`}>
              Rolex Collection
            </a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaK}>Reference</span>
              <span className={styles.heroMetaV}>116520</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaK}>Era</span>
              <span className={styles.heroMetaV}>2000 – 2016</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaK}>Case</span>
              <span className={styles.heroMetaV}>40mm</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.editorial}>
        <div className={styles.editorialInner}>
          <div className={styles.editorialText}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>The Reference</span>
            </div>
            <h2 className={styles.h2}>
              A study in <em>restraint.</em>
            </h2>
            <p className={styles.editorialBody}>
              Introduced at the turn of the century, the 116520 marked the moment Rolex brought
              its own chronograph movement — the calibre 4130 — into the Daytona. It refined the
              line without rewriting it.
            </p>
            <blockquote className={styles.editorialQuote}>
              Nothing about the 116520 announces itself. That, more than anything, is what makes
              it endure.
            </blockquote>
            <a href={ROLEX_COLLECTION} className={styles.goldLink}>
              See current inventory
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>
          <div className={styles.editorialText}>
            <p className={styles.editorialBody}>
              The white dial — sometimes called the &ldquo;Panda&rdquo; configuration — sets three
              black sub-dials against a clean, satin-finished surface. The contrast is
              deliberate. Legibility was never an afterthought; it was the brief.
            </p>
            <p className={styles.editorialBody}>
              Pre-ceramic, pre-hype. The 116520 belongs to the era when the Daytona was still a
              tool — engineered for the pit lane, finished for the boardroom. Today, every
              example we list has passed through our in-house horologists for full
              authentication.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.specStrip}>
        <div className={styles.specGrid}>
          {specs.map((s) => (
            <div key={s.k} className={styles.specCell}>
              <span className={styles.specCellK}>{s.k}</span>
              <span className={styles.specCellV}>{s.v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.banner}>
        <img
          src={IMG.banner}
          alt="Rolex Daytona 116520 on a soft gradient backdrop"
          className={styles.bannerImg}
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>The Daytona Promise</span>
          </div>
          <h2 className={styles.bannerHeading}>
            Built for the track.
            <br />
            <em>Made to last.</em>
          </h2>
          <p className={styles.bannerBody}>
            Every Daytona we present is authenticated by our in-house horologists, accompanied by
            full provenance, and presented at a price that reflects the quiet market for the
            reference — not the noise around it.
          </p>
          <a href={DAYTONA_PDP} className={`${styles.btn} ${styles.btnGhost}`}>
            Read the specification
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryHead}>
          <div className={`${styles.eyebrow}`} style={{ justifyContent: 'center' }}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Detail Studies</span>
            <span className={styles.eyebrowRule} aria-hidden="true" />
          </div>
          <h2 className={styles.h2}>
            Three views, <em>one piece.</em>
          </h2>
          <p className={styles.lede}>
            Close studies of the reference — the bezel, the bracelet, the stance. Each shot
            commissioned in-house, each watch the same one you can see in person at our Mayfair
            showroom.
          </p>
        </div>
        <div className={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <article key={item.num} className={styles.galleryCard}>
              <div className={styles.galleryFigure}>
                <img src={item.img} alt={item.alt} />
                <span className={styles.galleryNum}>{item.num}</span>
              </div>
              <div className={styles.galleryCaption}>
                <div className={styles.galleryTag}>{item.tag}</div>
                <div className={styles.galleryTitle}>{item.title}</div>
                <p className={styles.galleryBody}>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>Private viewing</span>
            <span className={styles.eyebrowRule} aria-hidden="true" />
          </div>
          <h2 className={styles.ctaTitle}>
            See it in <em>person.</em>
          </h2>
          <p className={styles.ctaBody}>
            Spend an hour with one of our specialists at Mayfair or Hatton Garden. Handle the
            watch, study the provenance, ask anything.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={`${styles.btn} ${styles.btnGold}`}>
              Book a viewing
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
            <a href="tel:+442074931998" className={`${styles.btn} ${styles.btnGhost}`}>
              Call the specialist
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <div>
            Luxury Times Ltd · <a href="/">luxurytimes.co.uk</a>
          </div>
          <div>15 St George&apos;s House, Hanover Square, London W1S 1HS</div>
          <div>© 2026 Luxury Times. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
