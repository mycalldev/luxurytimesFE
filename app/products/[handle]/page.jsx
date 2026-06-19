import Link from 'next/link';
import { getProduct, getAllProductHandles, isPOA } from '../../utils/shopify';
import ImageGallery from './ImageGallery';
import ProductReviews from './ProductReviews';
import FeaturedProducts from './FeaturedProducts';
import WishlistIcon from '../../components/WishlistIcon';
import Breadcrumb from '../../components/Breadcrumb';
import EnquiryForm from '../../components/EnquiryForm';
import ShareButton from './ShareButton';
import ScrollReset from './ScrollReset';
import BackButton from './BackButton';
import ProductSpecifications from './ProductSpecifications';
import SpeakToTeamBtn from './SpeakToTeamBtn';
import CredibilityBar from '../../components/CredibilityBar';
import styles from './product.module.css';

const BRAND_COLLECTIONS = {
  'rolex':           { label: 'Rolex Collection',           href: '/products?collection=rolex' },
  'patek-philippe':  { label: 'Patek Philippe Collection',  href: '/products?collection=patek-philippe' },
  'audemars-piguet': { label: 'Audemars Piguet Collection', href: '/products?collection=audemars-piguet' },
  'richard-mille':   { label: 'Richard Mille Collection',   href: '/products?collection=richard-mille' },
}

// Pre-render every product page at build time, then refresh in the background.
export const revalidate = 3600;

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata(props) {
  const params = await props.params;
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
    alternates: { canonical: `/products/${params.handle}` },
    openGraph: {
      title: product.title,
      description: product.description,
      images: firstImage ? [firstImage.url] : [],
      type: 'website',
    },
  };
}

export default async function ProductPage(props) {
  const params = await props.params;
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
  const productIsPOA = isPOA(product);

  const formattedPrice = productIsPOA
    ? 'POA'
    : new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: price.currencyCode,
        minimumFractionDigits: 0,
      }).format(price.amount);

  // Determine which brand collection this product belongs to
  const brandCollection = product.collections.edges
    .map(({ node }) => BRAND_COLLECTIONS[node.handle])
    .find(Boolean)

  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All Watches' },
    ...(brandCollection ? [brandCollection] : []),
  ]

  return (
    <>
      <ScrollReset />
      <Breadcrumb items={breadcrumbItems} />
      <main className={styles.container}>
        <BackButton />

        <div className={styles.productLayout}>
          <div className={styles.imageGallery}>
            <ImageGallery images={images} productTitle={product.title} />
            <div className={styles.desktopOnly}>
              <CredibilityBar bordered={false} />
            </div>
            <ProductReviews className={`${styles.reviewsWidget} ${styles.desktopOnly}`} />
          </div>

          <div className={styles.productInfo}>
            <div className={styles.vendor}>{product.vendor}</div>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{product.title}</h1>
              <WishlistIcon product={product} className={styles.wishlistIcon} />
              <ShareButton handle={product.handle} title={product.title} />
            </div>
            
            <div className={styles.price}>
              {formattedPrice}
            </div>

            <SpeakToTeamBtn productTitle={product.title} />

            {(product.year?.value || product.condition?.value) && (
              <div className={styles.detailsCard}>
                {product.year?.value && (
                  <div className={styles.detailItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span className={styles.detailLabel}>Year</span>
                    <span className={styles.detailValue}>{product.year.value}</span>
                  </div>
                )}
                {product.condition?.value && (
                  <div className={styles.detailItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span className={styles.detailLabel}>Condition</span>
                    <span className={styles.detailValue}>
                      {product.condition.value.replace(/[\[\]"]/g, '')}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <ProductReviews className={`${styles.reviewsWidget} ${styles.mobileOnly}`} />

            <div className={styles.mobileOnly}>
              <CredibilityBar bordered={false} />
            </div>

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

            <div className={styles.whatsIncluded}>
              <ul className={styles.includesList}>
                {product.greenSwingTag?.value === 'true' && (
                  <li className={styles.includesItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span>Green Swing Tag</span>
                  </li>
                )}
                {product.whiteSwingTag?.value === 'true' && (
                  <li className={styles.includesItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span>White Swing Tag</span>
                  </li>
                )}
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

            <ProductSpecifications product={product} />

            <EnquiryForm
              productTitle={product.title}
              productPrice={formattedPrice}
            />
          </div>
        </div>

        <FeaturedProducts
          currentProductHandle={product.handle}
          collections={product.collections.edges}
        />
      </main>
    </>
  );
}