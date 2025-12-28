'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './imageGallery.module.css';

export default function ImageGallery({ images, productTitle }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const selectedImage = images[selectedImageIndex]?.node;

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.thumbnailsColumn}>
        {images.map(({ node: image }, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${
              index === selectedImageIndex ? styles.thumbnailActive : ''
            }`}
            onClick={() => setSelectedImageIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.altText || `${productTitle} - Image ${index + 1}`}
              width={150}
              height={150}
              className={styles.thumbnailImage}
              quality={80}
            />
          </button>
        ))}
      </div>

      <div className={styles.mainImageWrapper}>
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || productTitle}
          width={1000}
          height={1000}
          className={styles.mainImage}
          quality={100}
          priority
        />
      </div>
    </div>
  );
}

