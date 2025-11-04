import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '../utils/shopify';
import styles from './products.module.css';

export async function generateMetadata() {
  return {
    title: 'Luxury Watches - Rolex, Audemars Piguet, Patek Philippe',
    description: 'Browse our collection of luxury watches from the world\'s finest watchmakers.',
  };
}

export default async function ProductsPage({ searchParams }) {
  const products = await getAllProducts(50);
  
  // Filter by collection if specified
  const collection = searchParams.collection;
  const filteredProducts = collection 
    ? products.filter(({ node: product }) => 
        product.collections.edges.some(({ node: col }) => 
          col.handle === collection
        )
      )
    : products;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>LUXURY WATCHES</h1>
        
        <div className={styles.filterButtons}>
          <Link 
            href="/products" 
            className={!collection ? styles.activeFilter : styles.filterBtn}
          >
            All Watches
          </Link>
          <Link 
            href="/products?collection=rolex" 
            className={collection === 'rolex' ? styles.activeFilter : styles.filterBtn}
          >
            Rolex
          </Link>
          <Link 
            href="/products?collection=audemars-piguet" 
            className={collection === 'audemars-piguet' ? styles.activeFilter : styles.filterBtn}
          >
            Audemars Piguet
          </Link>
          <Link 
            href="/products?collection=patek-philippe" 
            className={collection === 'patek-philippe' ? styles.activeFilter : styles.filterBtn}
          >
            Patek Philippe
          </Link>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.map(({ node: product }) => {
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
                  <div className={styles.vendor}>{product.vendor}</div>
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
      
      {filteredProducts.length === 0 && (
        <p className={styles.noProducts}>No products available.</p>
      )}
    </main>
  );
}