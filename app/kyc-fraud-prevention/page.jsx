import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'KYC & Fraud Prevention Policy | Luxury Times',
  description: 'How Luxury Times verifies client identity and prevents fraud to protect clients and the business.',
};

export default function KycFraudPrevention() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>KYC & Fraud Prevention Policy</h1>

        <p className={styles.intro}>
          Luxury Times is committed to maintaining a secure and trustworthy environment for our
          clients. As part of our commitment to responsible business practices, we operate Know Your
          Customer (KYC) and fraud prevention procedures designed to protect both our clients and our
          business.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Identity Verification</h2>
          <p className={styles.sectionBody}>
            In certain circumstances, Luxury Times may request documentation to verify a client's
            identity. This may include photographic identification, proof of address, verification of
            payment details and additional information reasonably required to complete a transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Verification Is Required</h2>
          <p className={styles.sectionBody}>
            Identity verification helps to:
          </p>
          <ul className={styles.list}>
            <li>Protect clients against fraud and identity theft.</li>
            <li>Reduce the risk of unauthorised transactions.</li>
            <li>Comply with legal and regulatory obligations.</li>
            <li>Maintain the integrity of the luxury watch market.</li>
            <li>Protect Luxury Times and its clients from financial crime.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Source of Funds</h2>
          <p className={styles.sectionBody}>
            For certain transactions, Luxury Times may request information relating to the source of
            funds used to complete a purchase. Such requests are made only where considered necessary
            to comply with applicable legal and regulatory requirements.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fraud Prevention Measures</h2>
          <p className={styles.sectionBody}>
            Luxury Times reserves the right to carry out additional verification checks where
            appropriate. These checks may include reviewing payment information, confirming delivery
            details and verifying client identity prior to completing a transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Refusal of Transactions</h2>
          <p className={styles.sectionBody}>
            Luxury Times reserves the right to delay, suspend or refuse any transaction where
            satisfactory verification cannot be obtained or where we believe there may be a risk of
            fraud, financial crime or other unlawful activity.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Protection of Information</h2>
          <p className={styles.sectionBody}>
            Any information collected as part of our verification procedures will be handled in
            accordance with our Privacy Policy and applicable data protection laws.
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
