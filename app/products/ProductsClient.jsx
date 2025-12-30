'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/Button'
import styles from './products.module.css'

export default function ProductsClient({ products, collection: collectionFilter }) {
  const [selectedModels, setSelectedModels] = useState([])

  // Filter by collection if specified
  const filteredByCollection = useMemo(() => {
    if (!collectionFilter) {
      return products
    }
    
    return products.filter(({ node: product }) => 
      product.collections.edges.some(({ node: col }) => 
        col.handle === collectionFilter
      )
    )
  }, [products, collectionFilter])

  // Extract unique watch models from product tags
  const availableModels = useMemo(() => {
    const modelTags = new Set()
    
    filteredByCollection.forEach(({ node: product }) => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => {
          if (tag && tag.trim()) {
            modelTags.add(tag.trim())
          }
        })
      }
    })
    
    return Array.from(modelTags).sort()
  }, [filteredByCollection])

  // Filter products based on selected models
  const filteredProducts = useMemo(() => {
    if (selectedModels.length === 0) {
      return filteredByCollection
    }
    
    return filteredByCollection.filter(({ node: product }) => {
      if (!product.tags || !Array.isArray(product.tags)) {
        return false
      }
      
      // Check if product has any of the selected models
      return selectedModels.some(model => 
        product.tags.includes(model)
      )
    })
  }, [filteredByCollection, selectedModels])

  // Toggle model selection
  const toggleModel = (model) => {
    setSelectedModels(prev => {
      if (prev.includes(model)) {
        return prev.filter(m => m !== model)
      } else {
        return [...prev, model]
      }
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedModels([])
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>LUXURY WATCHES</h1>
        
        <div className={styles.filterButtons}>
          <Button 
            href="/products" 
            variant={!collectionFilter ? 'active' : 'primary'}
          >
            All Watches
          </Button>
          <Button 
            href="/products?collection=rolex" 
            variant={collectionFilter === 'rolex' ? 'active' : 'primary'}
          >
            Rolex
          </Button>
          <Button 
            href="/products?collection=patek-philippe" 
            variant={collectionFilter === 'patek-philippe' ? 'active' : 'primary'}
          >
            Patek Philippe
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      {availableModels.length > 0 && (
        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>Filter by Watch Model</h2>
            {selectedModels.length > 0 && (
              <button 
                onClick={clearFilters}
                className={styles.clearButton}
              >
                Clear All ({selectedModels.length})
              </button>
            )}
          </div>
          
          <div className={styles.filterOptions}>
            {availableModels.map(model => (
              <button
                key={model}
                onClick={() => toggleModel(model)}
                className={`${styles.filterButton} ${
                  selectedModels.includes(model) ? styles.filterButtonActive : ''
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className={styles.resultsInfo}>
        Showing {filteredProducts.length} of {filteredByCollection.length} watches
        {selectedModels.length > 0 && (
          <span className={styles.activeFilters}>
            {' '}• Filtered by: {selectedModels.join(', ')}
          </span>
        )}
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {filteredProducts.map(({ node: product }) => {
          const firstImage = product.images.edges[0]?.node
          const price = product.priceRange.minVariantPrice
          
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
          )
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className={styles.noProducts}>
          {selectedModels.length > 0 
            ? 'No products match the selected filters.' 
            : 'No products available.'}
        </p>
      )}
    </main>
  )
}

