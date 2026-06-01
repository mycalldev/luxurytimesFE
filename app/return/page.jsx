import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Returns Policy | Luxury Times',
  description: 'Luxury Times returns policy for pre-owned luxury timepieces.',
};

export default function Return() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Returns Policy</h1>

        <p className={styles.intro}>
          At Luxury Times, we take great pride in accurately describing and presenting every watch
          we offer for sale. We understand that purchasing a luxury timepiece is an important
          decision, and we are committed to providing a professional, transparent and fair buying
          experience.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Pre-Owned Watches</h2>
          <p className={styles.sectionBody}>
            As many of our watches are pre-owned, each timepiece is unique and may display signs of
            wear consistent with its age and use. Detailed descriptions and photographs are provided
            to assist clients in making an informed purchasing decision. We encourage all clients to
            request any additional photographs, videos or information they may require before
            completing a purchase.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Inspection Upon Receipt</h2>
          <p className={styles.sectionBody}>
            Clients are requested to inspect their watch promptly upon delivery and contact Luxury
            Times as soon as reasonably possible if they have any concerns regarding their purchase.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Returns Eligibility</h2>
          <p className={styles.sectionBody}>
            Luxury Times may consider returns on a case-by-case basis where a watch has been
            materially misdescribed or where an error has occurred in the information provided.
            Clients wishing to discuss a return should notify Luxury Times within 48 hours of
            receiving the watch. Our team will review each request individually and work with the
            client to achieve a fair resolution where appropriate.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Condition of Returned Items</h2>
          <p className={styles.sectionBody}>
            Any watch approved for return must be returned in the same condition in which it was
            supplied, including all accompanying boxes, papers, accessories, tags and documentation.
            Luxury Times reserves the right to refuse a return or apply a deduction where a watch
            has been worn, altered, damaged or returned incomplete.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Return Timeframe</h2>
          <p className={styles.sectionBody}>
            Any approved return should be received by Luxury Times within 7 days of delivery.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Non-Returnable Items</h2>
          <ul className={styles.list}>
            <li>Watches sourced specifically at a client's request.</li>
            <li>Special order items.</li>
            <li>Watches that have been modified, altered or serviced after delivery.</li>
            <li>Items returned without prior agreement.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Refunds</h2>
          <p className={styles.sectionBody}>
            Where a return has been approved and received in satisfactory condition, any applicable
            refund will be processed using the original payment method wherever possible. Refund
            processing times may vary depending on payment provider and banking procedures.
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
