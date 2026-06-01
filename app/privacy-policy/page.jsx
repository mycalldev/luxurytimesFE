import Link from 'next/link';
import styles from '../styles/LegalPage.module.css';

export const metadata = {
  title: 'Privacy Policy | Luxury Times',
  description: 'How Luxury Times collects, uses and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <main>
      <Link href="/" className={styles.backLinkBTN}>
        <div className={styles.backNav}>{'< Home'}</div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Privacy Policy</h1>

        <p className={styles.intro}>
          Luxury Times is committed to protecting and respecting your privacy. This Privacy Policy
          explains how we collect, use and protect your personal information when you visit our
          website, contact us or do business with us.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <p className={styles.sectionBody}>
            We may collect personal information including name, email address, telephone number,
            postal address, payment and transaction information, identification documents where
            required for compliance purposes, and information provided through website enquiries,
            appointments and watch sales.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
          <p className={styles.sectionBody}>
            We use personal information to respond to enquiries, process purchases and sales, arrange
            appointments, verify identity where required, comply with legal and regulatory obligations,
            improve our services and website performance, and communicate relevant information
            regarding transactions and services.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Information Sharing</h2>
          <p className={styles.sectionBody}>
            Luxury Times does not sell personal information to third parties. Information may be
            shared where necessary with professional advisers, payment providers, delivery companies,
            regulatory authorities or other parties where required to complete a transaction or comply
            with legal obligations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Security</h2>
          <p className={styles.sectionBody}>
            We take appropriate measures to protect personal information against unauthorised access,
            loss, misuse or disclosure. Whilst no system can guarantee absolute security, we are
            committed to maintaining appropriate safeguards to protect client information.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Marketing Communications</h2>
          <p className={styles.sectionBody}>
            Where appropriate, Luxury Times may contact clients regarding products, services or
            updates that may be of interest. Clients may request to stop receiving marketing
            communications at any time.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Website Analytics and Cookies</h2>
          <p className={styles.sectionBody}>
            Our website may use cookies and analytics tools to improve user experience, monitor
            website performance and better understand visitor behaviour. These tools help us improve
            the services and information provided through our website.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Rights</h2>
          <p className={styles.sectionBody}>
            Subject to applicable law, you may have the right to request access to personal
            information held about you, request correction of inaccurate information, request
            deletion of personal information where appropriate, object to certain uses of personal
            information, and withdraw consent where consent has been provided.
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
