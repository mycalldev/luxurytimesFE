import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../utils/shopify';
import styles from './featuredProducts.module.css';

export default async function FeaturedProducts({ currentProductHandle, collections }) {
  // If no collections, return null
  if (!collections || collections.length === 0) {
    return null;
  }

  // Get the first collection
  const primaryCollection = collections[0].node;
  
  // Fetch products from the collection
  const { products } = await getProductsByCollection(primaryCollection.handle, 10);

  // Filter out the current product and limit to 4 products
  const relatedProducts = products
    .filter(({ node }) => node.handle !== currentProductHandle)
    .slice(0, 4);

  // If no related products, return null
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.featuredSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>More from {primaryCollection.title}</h2>
        {primaryCollection.handle && (
          <Link href={`/products/collections/${primaryCollection.handle}`} className={styles.viewAll}>
            View All →
          </Link>
        )}
      </div>

      <div className={styles.productsGrid}>
        {relatedProducts.map(({ node: product }) => {
          const firstImage = product.images.edges[0]?.node;
          const price = product.priceRange.minVariantPrice;

          return (
            <Link 
              key={product.id} 
              href={`/products/${product.handle}`}
              className={styles.productCard}
            >
              <div className={styles.imageWrapper}>
                {firstImage ? (
                  <Image
                    src={firstImage.url}
                    alt={firstImage.altText || product.title}
                    width={400}
                    height={400}
                    className={styles.productImage}
                    quality={85}
                  />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
              </div>
              
              <div className={styles.productInfo}>
                <div className={styles.vendor}>{product.vendor}</div>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.price}>
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: price.currencyCode,
                    minimumFractionDigits: 0
                  }).format(price.amount)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

