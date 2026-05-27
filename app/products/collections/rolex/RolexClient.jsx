'use client';

import Image from 'next/image';
import CollectionClient from '../CollectionClient';
import styles from './rolex.module.css';

export default function RolexClient({ products, collection, initialModel }) {
  return (
    <>

      {/* Collection Content */}
      <CollectionClient products={products} collection={collection} initialModel={initialModel} />
    </>
  );
}
