'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WishlistIcon from '../../components/WishlistIcon';
import styles from './rolex/collection.module.css';

export default function CollectionClient({ products, collection }) {
  const [selectedModels, setSelectedModels] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sort products with 'feature' tag first
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aFeatured = a.node.tags?.includes('feature') ? 1 : 0;
      const bFeatured = b.node.tags?.includes('feature') ? 1 : 0;
      return bFeatured - aFeatured;
    });
  }, [products]);

  // Extract unique watch models from product tags (exclude internal tags)
  const availableModels = useMemo(() => {
    const modelTags = new Set();
    
    sortedProducts.forEach(({ node: product }) => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => {
          if (tag && tag.trim() && tag.trim().toLowerCase() !== 'feature') {
            modelTags.add(tag.trim());
          }
        });
      }
    });
    
    return Array.from(modelTags).sort();
  }, [sortedProducts]);

  // Filter products based on selected models
  const filteredProducts = useMemo(() => {
    if (selectedModels.length === 0) {
      return sortedProducts;
    }
    
    return sortedProducts.filter(({ node: product }) => {
      if (!product.tags || !Array.isArray(product.tags)) {
        return false;
      }
      
      // Check if product has any of the selected models
      return selectedModels.some(model => 
        product.tags.includes(model)
      );
    });
  }, [sortedProducts, selectedModels]);

  // Toggle model selection
  const toggleModel = (model) => {
    setSelectedModels(prev => {
      if (prev.includes(model)) {
        return prev.filter(m => m !== model);
      } else {
        return [...prev, model];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedModels([]);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{collection?.title || 'LUXURY WATCHES'}</h1>
        {collection?.description && (
          <p className={styles.description}>{collection.description}</p>
        )}
      </div>

      {/* Filter Section - Dropdown */}
      {availableModels.length > 0 && (
        <div className={styles.filterSection} ref={dropdownRef}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => setDropdownOpen(prev => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            <div className={styles.dropdownTriggerContent}>
              <svg className={styles.filterIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1.5 3.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4.5 9H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 14.25H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>
                {selectedModels.length === 0
                  ? 'Filter by Watch Model'
                  : `${selectedModels.length} Model${selectedModels.length > 1 ? 's' : ''} Selected`}
              </span>
            </div>
            <svg
              className={`${styles.chevronIcon} ${dropdownOpen ? styles.chevronOpen : ''}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu} role="listbox" aria-multiselectable="true">
              {selectedModels.length > 0 && (
                <button
                  onClick={clearFilters}
                  className={styles.clearButton}
                >
                  Clear All ({selectedModels.length})
                </button>
              )}
              <div className={styles.dropdownOptions}>
                {availableModels.map(model => (
                  <button
                    key={model}
                    role="option"
                    aria-selected={selectedModels.includes(model)}
                    onClick={() => toggleModel(model)}
                    className={`${styles.dropdownOption} ${
                      selectedModels.includes(model) ? styles.dropdownOptionActive : ''
                    }`}
                  >
                    <span className={styles.optionCheckbox}>
                      {selectedModels.includes(model) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>{model}</span>
                  </button>
                ))}
              </div>
              <button
                className={styles.applyButton}
                onClick={() => setDropdownOpen(false)}
              >
                {selectedModels.length === 0
                  ? 'Close'
                  : `Show Results (${selectedModels.length})`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <div className={styles.resultsInfo}>
        Showing {filteredProducts.length} of {sortedProducts.length} watches
        {selectedModels.length > 0 && (
          <span className={styles.activeFilters}>
            {' '}• Filtered by: {selectedModels.join(', ')}
          </span>
        )}
      </div>

      {/* Products Grid */}
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
                    <div className={styles.wishlistIconOverlay}>
                      <WishlistIcon product={product} />
                    </div>
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
      
      {filteredProducts.length === 0 && (
        <p className={styles.noProducts}>
          {selectedModels.length > 0 
            ? 'No products match the selected filters.' 
            : 'No products available in this collection.'}
        </p>
      )}
    </main>
  );
}

