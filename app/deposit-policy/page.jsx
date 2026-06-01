import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Deposit Policy | Luxury Times',
  description: 'Understand how deposits work at Luxury Times when reserving or sourcing a luxury timepiece.',
};

export default function DepositPolicy() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Deposit Policy</h1>

        <p className={styles.intro}>
          At Luxury Times, deposits are often used to reserve, source or secure luxury timepieces on
          behalf of our clients. Due to the nature of the luxury watch market, each transaction is
          unique and deposit arrangements may vary depending on the watch, the circumstances of the
          purchase and the services being provided.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Deposit Arrangements</h2>
          <p className={styles.sectionBody}>
            The terms of any deposit will be discussed with the client prior to payment and confirmed
            via email, WhatsApp or another agreed communication method at the time the deposit is
            accepted. This ensures that both Luxury Times and the client have a clear understanding of
            the terms applicable to the transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Reserving a Watch</h2>
          <p className={styles.sectionBody}>
            A deposit may be taken to reserve a watch currently held in stock. During the agreed
            reservation period, the watch may be removed from sale and held exclusively for the client.
            The treatment of any deposit relating to a reserved watch will depend on the circumstances
            of the transaction and the terms agreed with the client at the time the deposit is accepted.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Sourced Watches</h2>
          <p className={styles.sectionBody}>
            Where Luxury Times is requested to source, acquire or secure a watch specifically on behalf
            of a client, deposits will generally be non-refundable. This is because Luxury Times may
            incur costs, commitments or obligations in acquiring the watch on the client's behalf.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Completion of Purchase</h2>
          <p className={styles.sectionBody}>
            Clients are expected to complete their purchase within the timeframe agreed at the time the
            deposit is taken. Where a client is unable or unwilling to proceed with the transaction,
            Luxury Times reserves the right to retain some or all of the deposit depending on the
            circumstances of the transaction and the terms previously agreed.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Cancellation</h2>
          <p className={styles.sectionBody}>
            Any request to cancel a transaction will be reviewed on a case-by-case basis. Luxury Times
            will always seek to act fairly and reasonably while taking into account the commitments and
            costs incurred in relation to the transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>If Luxury Times Cannot Supply the Watch</h2>
          <p className={styles.sectionBody}>
            In the unlikely event that Luxury Times is unable to supply the agreed watch, any deposit
            paid will be refunded in full.
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
