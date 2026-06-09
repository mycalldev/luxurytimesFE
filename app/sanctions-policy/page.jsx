import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Sanctions Policy | Luxury Times',
  description: "Luxury Times' compliance with applicable sanctions laws and regulations.",
  alternates: { canonical: '/sanctions-policy' },
};

export default function SanctionsPolicy() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Sanctions Policy</h1>

        <p className={styles.intro}>
          Luxury Times is committed to conducting business responsibly and in compliance with
          applicable sanctions laws and regulations.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Compliance Measures</h2>
          <p className={styles.sectionBody}>
            Luxury Times may carry out verification procedures where appropriate to ensure compliance
            with applicable sanctions regulations. These procedures may include identity verification,
            transaction reviews and other compliance checks considered necessary in the circumstances.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Restricted Individuals and Entities</h2>
          <p className={styles.sectionBody}>
            Luxury Times reserves the right to refuse, suspend or terminate any transaction where we
            believe a client, transaction or associated party may be subject to sanctions restrictions
            or where a transaction may otherwise present a sanctions compliance risk.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>International Transactions</h2>
          <p className={styles.sectionBody}>
            As Luxury Times works with clients both within the United Kingdom and internationally,
            additional checks may be required for certain transactions depending on the jurisdictions
            involved.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Regulatory Obligations</h2>
          <p className={styles.sectionBody}>
            Luxury Times will comply with all applicable legal and regulatory obligations relating to
            sanctions compliance. Where required by law, transactions may be delayed, declined or
            reported to the appropriate authorities.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Commitment to Responsible Business</h2>
          <p className={styles.sectionBody}>
            Our sanctions compliance procedures form part of our wider commitment to responsible
            business practices, financial crime prevention and maintaining the integrity of the luxury
            watch market.
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
