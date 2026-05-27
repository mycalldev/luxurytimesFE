import Link from 'next/link';
import { getProductsByCollection } from '../../../utils/shopify';
import CollectionClient from '../CollectionClient';
import styles from './richardMille.module.css';

export async function generateMetadata() {
  return {
    title: 'Richard Mille Watches - Luxury Times',
    description: 'Browse our collection of authentic Richard Mille watches.',
  };
}

export default async function RichardMilleCollectionPage(props) {
  const searchParams = await props.searchParams;
  const { collection, products } = await getProductsByCollection('richard-mille', 50);
  const initialModel = searchParams?.model;

  if (!products || products.length === 0) {
    return (
      <main className={styles.comingSoon}>
        <p className={styles.subtitle}>Richard Mille</p>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.message}>
          Our Richard Mille collection is being curated and will be available shortly.
          In the meantime, explore our other timepieces or get in touch to discuss a
          specific reference you&apos;re looking for.
        </p>
        <Link href="/contact" className={styles.cta}>
          Enquire Now
        </Link>
      </main>
    );
  }

  return <CollectionClient products={products} collection={collection} initialModel={initialModel} />;
}
