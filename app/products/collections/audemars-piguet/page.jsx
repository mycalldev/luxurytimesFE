import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../utils/shopify';
import styles from '../rolex/collection.module.css';

export async function generateMetadata() {
  return {
    title: 'Audemars Piguet Watches - Luxury Times',
    description: 'Browse our collection of authentic Audemars Piguet watches.',
  };
}

export default async function AudemarsPiguetCollectionPage() {
  const { collection, products } = await getProductsByCollection('audemars-piguet', 50);

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{collection?.title || 'AUDEMARS PIGUET'}</h1>
        {collection?.description && (
          <p className={styles.description}>{collection.description}</p>
        )}
      </div>

      <div className={styles.productsGrid}>
        {products.map(({ node: product }) => {
          const firstImage = product.images.edges[0]?.node;
          const price = product.priceRange.minVariantPrice;
          
          return (
            <article key={product.id} className={styles.productCard}>
              <Link href={`/products/${product.handle}`}>
                {firstImage && (
                  <div className={styles.imageContainer}>
                    <Image
                      src={firstImage.url}
                      alt={firstImage.altText || product.title}
                      width={600}
                      height={600}
                      className={styles.productImage}
                      quality={90}
                    />
                  </div>
                )}
                
                <div className={styles.productContent}>
                  <h2 className={styles.productTitle}>{product.title}</h2>
                  
                  <div className={styles.price}>
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: price.currencyCode,
                      minimumFractionDigits: 0
                    }).format(price.amount)}
                  </div>
                  
                  <div className={styles.viewBtn}>View Details</div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      
      {products.length === 0 && (
        <p className={styles.noProducts}>No products available in this collection.</p>
      )}
    </main>
  );
}