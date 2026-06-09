import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Warranty Policy | Luxury Times',
  description: 'Details of the Luxury Times warranty and manufacturer warranty coverage for luxury timepieces.',
  alternates: { canonical: '/warranty-policy' },
};

export default function WarrantyPolicy() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Warranty Policy</h1>

        <p className={styles.intro}>
          At Luxury Times, we are committed to providing confidence and peace of mind when purchasing
          a luxury timepiece. Many watches sold by Luxury Times are supplied with warranty protection,
          either through the original manufacturer or through a Luxury Times warranty where applicable.
          The specific warranty applicable to each watch will be discussed with the client prior to
          purchase.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manufacturer Warranty</h2>
          <p className={styles.sectionBody}>
            Many watches offered by Luxury Times may still benefit from the balance of the original
            manufacturer's warranty. Depending on the watch and its original date of purchase, this
            may include coverage provided by Rolex, Patek Philippe, Audemars Piguet or another
            manufacturer. Details of any remaining manufacturer warranty will be provided at the time
            of sale where applicable.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Luxury Times Warranty</h2>
          <p className={styles.sectionBody}>
            Many watches sold by Luxury Times are supplied with a 12-month Luxury Times warranty. The
            availability of a Luxury Times warranty will depend on the age, condition and nature of
            the watch being sold and will be confirmed prior to purchase.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What Is Covered</h2>
          <p className={styles.sectionBody}>
            Where a Luxury Times warranty applies, it is intended to cover mechanical defects and
            movement-related faults that arise during normal use of the watch.
          </p>
          <ul className={styles.list}>
            <li>Mechanical movement defects.</li>
            <li>Timekeeping faults resulting from movement issues.</li>
            <li>Manufacturing or assembly defects identified during the warranty period.</li>
            <li>Mechanical failures not caused by misuse, impact or unauthorised intervention.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What Is Not Covered</h2>
          <ul className={styles.list}>
            <li>Accidental damage.</li>
            <li>Impact damage.</li>
            <li>Water damage resulting from misuse or failure to follow manufacturer guidance.</li>
            <li>Loss, theft or damage caused by negligence.</li>
            <li>Cosmetic wear and tear.</li>
            <li>Scratches, dents, marks or damage to the case, bracelet, clasp, bezel, crystal or strap.</li>
            <li>Damage caused by unauthorised repairs, modifications or alterations.</li>
            <li>Routine servicing, maintenance or adjustments.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Warranty Claims</h2>
          <p className={styles.sectionBody}>
            Should a problem arise during the warranty period, clients should contact Luxury Times as
            soon as reasonably possible. Our team will review the issue and advise on the appropriate
            next steps. Where required, the watch may need to be inspected before any warranty claim
            can be assessed.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Transferability</h2>
          <p className={styles.sectionBody}>
            Unless otherwise stated, a Luxury Times warranty applies only to the original purchaser
            and is not automatically transferable.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Consumer Rights</h2>
          <p className={styles.sectionBody}>
            Nothing within this policy affects any statutory rights available to consumers under
            applicable law.
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
