'use client';

import Image from 'next/image';
import CollectionClient from '../CollectionClient';
import styles from './rolex.module.css';

export default function RolexClient({ products, collection }) {
  return (
    <>
      {/* Hero Banner Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/categoryBanner/rolex_banner.JPEG"
            alt="Rolex Collection Banner"
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
        </div>
      </div>
      
      {/* Collection Content */}
      <CollectionClient products={products} collection={collection} />
    </>
  );
}
