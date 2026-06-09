import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Authenticity Guarantee | Luxury Times',
  description: 'Learn how Luxury Times guarantees the authenticity of every luxury timepiece we sell.',
  alternates: { canonical: '/authenticity-guarantee' },
};

export default function AuthenticityGuarantee() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Authenticity Guarantee</h1>

        <p className={styles.intro}>
          At Luxury Times, authenticity is at the heart of everything we do. We understand that
          confidence and trust are essential when purchasing a luxury timepiece, particularly within
          the pre-owned market. Every watch offered for sale by Luxury Times is subject to careful
          inspection and authentication before being presented to our clients.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Commitment</h2>
          <p className={styles.sectionBody}>
            We are committed to offering only genuine luxury timepieces from the world's leading watch
            manufacturers, including Rolex, Patek Philippe, Audemars Piguet and other respected
            brands. We do not knowingly buy, sell or consign counterfeit, altered or misrepresented
            watches.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Inspection Process</h2>
          <p className={styles.sectionBody}>
            Each watch is carefully examined prior to sale. This process may include verification of
            reference numbers, serial numbers, movement characteristics, case and dial details,
            bracelet components and overall authenticity indicators. Where applicable, accompanying
            documentation, service records and provenance information may also be reviewed.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Pre-Owned Watches</h2>
          <p className={styles.sectionBody}>
            Many of the watches offered by Luxury Times are pre-owned. As such, signs of wear,
            previous servicing or replacement components may be present. Where we are aware of any
            replacement parts, service components or noteworthy alterations, these will be disclosed
            wherever reasonably possible.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manufacturer Independence</h2>
          <p className={styles.sectionBody}>
            Luxury Times is an independent dealer specialising in luxury watches and is not affiliated
            with, authorised by or acting on behalf of any watch manufacturer unless expressly stated.
            All trademarks, brand names and references remain the property of their respective owners.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Questions Before Purchase</h2>
          <p className={styles.sectionBody}>
            We encourage clients to ask questions and request additional photographs, videos or
            information before completing a purchase. Our team will always be pleased to discuss a
            watch in detail and provide further information wherever possible.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Confidence in Every Purchase</h2>
          <p className={styles.sectionBody}>
            Our reputation is built upon long-term relationships, transparency and trust. We stand
            behind the authenticity of every watch we sell and are committed to providing our clients
            with confidence throughout the purchasing process. Many of the watches offered by Luxury
            Times are accompanied by original manufacturer documentation, service history and warranty
            information where available. These details will be provided and discussed with clients
            wherever applicable.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.contactBlock}>
            <strong>Luxury Times</strong>
            <p>15 St George's House, Hanover Square, Mayfair, London W1S 1HS</p>
            <p>London Diamond Bourse, 100 Hatton Garden, London EC1N 8NX</p>
            <p>Email: <a href="mailto:info@luxurytimesltd.co.uk">info@luxurytimesltd.co.uk</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
