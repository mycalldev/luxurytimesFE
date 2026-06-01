'use client';

import Script from 'next/script';
import styles from './GoogleReviews.module.css';

export default function GoogleReviews() {
  return (
    <section className={styles.section}>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div
        className="elfsight-app-4f73375a-e589-435a-a794-4600de891411"
        data-elfsight-app-lazy
      />
    </section>
  );
}
