import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Anti-Money Laundering Policy | Luxury Times',
  description: "Luxury Times' commitment to conducting business in accordance with anti-money laundering regulations.",
};

export default function AntiMoneyLaundering() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Anti-Money Laundering Policy</h1>

        <p className={styles.intro}>
          Luxury Times is committed to conducting business responsibly and in accordance with
          applicable anti-money laundering regulations. We recognise the importance of preventing
          financial crime and maintaining the integrity of the luxury watch market.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Client Verification</h2>
          <p className={styles.sectionBody}>
            Luxury Times may request identification documents, proof of address and other supporting
            information where considered appropriate. Verification requirements may vary depending on
            the value, nature and circumstances of the transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Source of Funds</h2>
          <p className={styles.sectionBody}>
            In certain circumstances, clients may be asked to provide information regarding the source
            of funds used to complete a transaction. These enquiries are made solely for compliance
            purposes and help ensure that transactions are conducted in accordance with applicable
            regulations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Monitoring Transactions</h2>
          <p className={styles.sectionBody}>
            Luxury Times reserves the right to review and monitor transactions where appropriate.
            This may include reviewing payment methods, transaction structures, delivery arrangements
            and other factors relevant to compliance obligations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Refusal of Transactions</h2>
          <p className={styles.sectionBody}>
            Luxury Times reserves the right to delay, suspend or refuse any transaction where
            satisfactory verification cannot be obtained or where concerns arise regarding the
            legitimacy of a transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Reporting Obligations</h2>
          <p className={styles.sectionBody}>
            Where required by law, Luxury Times may be obligated to report certain activities,
            transactions or concerns to the relevant authorities. Luxury Times will comply with all
            applicable legal and regulatory obligations in this regard.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Commitment to Compliance</h2>
          <p className={styles.sectionBody}>
            Our anti-money laundering procedures form part of our wider commitment to responsible
            business practices, client protection and maintaining confidence within the luxury watch
            industry.
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
