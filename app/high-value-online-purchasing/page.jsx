import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'High Value Online Purchasing Policy | Luxury Times',
  description: 'How Luxury Times ensures a secure and professional experience when purchasing high-value luxury watches online.',
  alternates: { canonical: '/high-value-online-purchasing' },
};

export default function HighValueOnlinePurchasing() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>High Value Online Purchasing Policy</h1>

        <p className={styles.intro}>
          At Luxury Times, we understand that purchasing a luxury watch online requires confidence,
          trust and complete transparency. Many of the timepieces we offer represent a significant
          investment, and we are committed to providing a secure and professional purchasing
          experience from enquiry through to delivery.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Authenticity</h2>
          <p className={styles.sectionBody}>
            Every watch offered for sale by Luxury Times is carefully inspected and authenticated
            before being listed for sale. We stand behind the authenticity of every timepiece we
            offer and are committed to maintaining the highest standards of integrity within the
            luxury watch market.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Product Information</h2>
          <p className={styles.sectionBody}>
            We make every effort to ensure that all descriptions, specifications, photographs and
            condition reports are accurate and representative of the watch being offered. As many of
            our watches are pre-owned, minor signs of wear may be present. Any significant
            imperfections will be disclosed wherever possible.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Secure Payments</h2>
          <p className={styles.sectionBody}>
            For the protection of both our clients and our business, all payments must be made
            through approved payment methods. We reserve the right to request proof of identity,
            proof of address and supporting documentation where appropriate.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Verification Procedures</h2>
          <p className={styles.sectionBody}>
            Luxury Times operates strict fraud prevention procedures. High-value transactions may be
            subject to additional verification checks prior to dispatch.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Availability</h2>
          <p className={styles.sectionBody}>
            Whilst every effort is made to keep our inventory current, watches may occasionally be
            sold through our showroom, trade network or other sales channels before website
            availability has been updated.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Delivery</h2>
          <p className={styles.sectionBody}>
            Once payment and verification procedures have been completed, your watch will be
            prepared for dispatch using secure and fully insured delivery services.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Right to Refuse a Transaction</h2>
          <p className={styles.sectionBody}>
            Luxury Times reserves the right to refuse, cancel or refund any transaction where we
            believe there may be a risk of fraud, money laundering, sanctions breaches or any other
            activity that may expose our clients or business to risk.
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
