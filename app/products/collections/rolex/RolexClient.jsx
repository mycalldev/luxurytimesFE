'use client';

import Image from 'next/image';
import CollectionClient from '../CollectionClient';
import styles from './rolex.module.css';

export default function RolexClient({ products, collection }) {
  return (
    <>
      
      {/* Collection Content */}
      <CollectionClient products={products} collection={collection} />
    </>
  );
}
