import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Shipping Policy | Luxury Times',
  description: 'How Luxury Times securely packages and ships luxury watches to clients worldwide.',
};

export default function ShippingPolicy() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Shipping Policy</h1>

        <p className={styles.intro}>
          At Luxury Times, we understand the importance of secure and reliable delivery when
          purchasing a luxury timepiece. We are committed to ensuring that every watch is carefully
          prepared, packaged and dispatched using appropriate delivery methods designed to provide
          peace of mind throughout the shipping process.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Secure Delivery</h2>
          <p className={styles.sectionBody}>
            All watches are carefully packaged prior to dispatch and shipped using secure and insured
            delivery services where available. Delivery methods may vary depending on the value of the
            watch, destination country and specific requirements of the transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Processing Time</h2>
          <p className={styles.sectionBody}>
            Orders will typically be dispatched once payment has been received, cleared and any
            necessary verification procedures have been completed. Whilst every effort is made to
            dispatch watches promptly, delivery times may vary depending on the destination, security
            requirements and courier availability.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Insurance</h2>
          <p className={styles.sectionBody}>
            Where applicable, shipments will be insured during transit. Any limitations on insurance
            coverage due to destination, courier restrictions or local regulations will be discussed
            with the client prior to dispatch.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>International Deliveries</h2>
          <p className={styles.sectionBody}>
            Luxury Times regularly works with clients both within the United Kingdom and
            internationally. Clients are responsible for ensuring that the importation of a watch into
            their destination country complies with local laws and regulations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Customs Duties and Taxes</h2>
          <p className={styles.sectionBody}>
            International shipments may be subject to customs duties, import taxes, VAT or other
            charges imposed by the destination country. Unless otherwise agreed, these charges are the
            responsibility of the purchaser.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Delivery Address</h2>
          <p className={styles.sectionBody}>
            For security reasons, Luxury Times reserves the right to ship only to verified delivery
            addresses. Additional identification or address verification may be required prior to
            dispatch.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Delivery Delays</h2>
          <p className={styles.sectionBody}>
            Whilst every effort is made to meet estimated delivery times, Luxury Times cannot be held
            responsible for delays caused by customs authorities, courier services, weather conditions,
            security checks or circumstances beyond our reasonable control.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Collection in Person</h2>
          <p className={styles.sectionBody}>
            Clients may also choose to collect their watch in person by prior arrangement from one of
            our locations. Suitable identification may be requested at the time of collection.
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
