import Link from 'next/link';
import { getProduct } from '../../utils/shopify';
import ImageGallery from './ImageGallery';
import FeaturedProducts from './FeaturedProducts';
import WishlistIcon from '../../components/WishlistIcon';
import styles from './product.module.css';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.handle);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const firstImage = product.images.edges[0]?.node;

  return {
    title: product.seo?.title || `${product.title} - Luxury Times`,
    description: product.seo?.description || product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: firstImage ? [firstImage.url] : [],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle);

  if (!product) {
    return (
      <main className={styles.container}>
        <h1>Product Not Found</h1>
        <Link href="/products">← Back to Products</Link>
      </main>
    );
  }

  const price = product.priceRange.minVariantPrice;
  const images = product.images.edges;

  return (
    <main className={styles.container}>

      <div className={styles.productLayout}>
        <div className={styles.imageGallery}>
          <ImageGallery images={images} productTitle={product.title} />
        </div>

        <div className={styles.productInfo}>
          <div className={styles.vendor}>{product.vendor}</div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{product.title}</h1>
            <WishlistIcon product={product} className={styles.wishlistIcon} />
          </div>
          
          <div className={styles.price}>
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: price.currencyCode,
              minimumFractionDigits: 0
            }).format(price.amount)}
          </div>

          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {product.variants.edges.length > 1 && (
            <div className={styles.variants}>
              <h3>Available Options:</h3>
              {product.variants.edges.map(({ node: variant }) => (
                <div key={variant.id} className={styles.variant}>
                  <span>{variant.title}</span>
                  <span className={variant.availableForSale ? styles.available : styles.unavailable}>
                    {variant.availableForSale ? 'Available' : 'Sold Out'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {product.tags.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className={styles.whatsIncluded}>
            <ul className={styles.includesList}>
              <li className={styles.includesItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Full Set & Swing Tags</span>
              </li>
              <li className={styles.includesItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Original Box & Papers</span>
              </li>
              <li className={styles.includesItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Warranty Card</span>
              </li>
              <li className={styles.includesItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Manufacturer's Booklet & Manual</span>
              </li>
              <li className={styles.includesItem}>
                <span className={styles.checkmark}>✓</span>
                <span>12 Month Warranty</span>
              </li>
            </ul>
          </div>

          <div className={styles.contactSection}>
            <h3>Interested in this watch?</h3>
            <Link href="/contact" className={styles.contactBtn}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <FeaturedProducts 
        currentProductHandle={product.handle}
        collections={product.collections.edges}
      />
    </main>
  );
}