'use client'

import Image from 'next/image'
import Link from 'next/link'
import WishlistIcon from '../../components/WishlistIcon'
import styles from './featuredProducts.module.css'

export default function FeaturedProductsClient({ products, collectionTitle, collectionHandle }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className={styles.featuredSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>More from {collectionTitle}</h2>
        {collectionHandle && (
          <Link href={`/products/collections/${collectionHandle}`} className={styles.viewAll}>
            View All →
          </Link>
        )}
      </div>

      <div className={styles.productsGrid}>
        {products.map(({ node: product }) => {
          const firstImage = product.images.edges[0]?.node
          const price = product.priceRange.minVariantPrice

          return (
            <Link 
              key={product.id} 
              href={`/products/${product.handle}`}
              className={styles.productCard}
            >
              <div className={styles.imageWrapper}>
                {firstImage ? (
                  <>
                    <Image
                      src={firstImage.url}
                      alt={firstImage.altText || product.title}
                      width={400}
                      height={400}
                      className={styles.productImage}
                      quality={85}
                    />
                    <div className={styles.wishlistIconOverlay}>
                      <WishlistIcon product={product} />
                    </div>
                  </>
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
          )
        })}
      </div>
    </section>
  )
}

