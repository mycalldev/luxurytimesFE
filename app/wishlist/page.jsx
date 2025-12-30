'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getWishlist, removeFromWishlist, clearWishlist } from '../utils/wishlist'
import WishlistIcon from '../components/WishlistIcon'
import Button from '../components/Button'
import styles from './wishlist.module.css'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load wishlist items
    const loadWishlist = () => {
      const items = getWishlist()
      setWishlistItems(items)
      setIsLoading(false)
    }

    loadWishlist()

    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      loadWishlist()
    }

    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
    }
  }, [])

  const handleRemove = (handle) => {
    removeFromWishlist(handle)
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist()
    }
  }

  if (isLoading) {
    return (
      <main className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href={'/'} className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>Home</span>
        </Link>
        <h1 className={styles.title}>My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <button onClick={handleClearAll} className={styles.clearAllButton}>
            Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className={styles.emptyState}>
          <svg
            className={styles.emptyIcon}
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2 className={styles.emptyTitle}>Your Wishlist is Empty</h2>
          <p className={styles.emptyDescription}>
            Start adding watches you&apos;re interested in by clicking the heart icon on any product.
          </p>
          <Button href="/products">
            Browse Watches
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.summary}>
            <p className={styles.summaryText}>
              You have {wishlistItems.length} {wishlistItems.length === 1 ? 'watch' : 'watches'} in your wishlist
            </p>
          </div>

          <div className={styles.wishlistGrid}>
            {wishlistItems.map((item) => (
              <article key={item.handle} className={styles.wishlistCard}>
                <Link href={`/products/${item.handle}`} className={styles.cardLink}>
                  {item.image && (
                    <div className={styles.imageContainer}>
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={600}
                        height={600}
                        className={styles.productImage}
                        quality={90}
                      />
                      <div className={styles.wishlistIconOverlay}>
                        <WishlistIcon 
                          product={{
                            id: item.id,
                            handle: item.handle,
                            title: item.title,
                            vendor: item.vendor,
                            priceRange: {
                              minVariantPrice: {
                                amount: item.price,
                                currencyCode: item.currencyCode
                              }
                            },
                            images: {
                              edges: [{
                                node: {
                                  url: item.image,
                                  altText: item.imageAlt
                                }
                              }]
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.cardContent}>
                    <div className={styles.vendor}>{item.vendor}</div>
                    <h2 className={styles.productTitle}>{item.title}</h2>
                    
                    {item.price && (
                      <div className={styles.price}>
                        {new Intl.NumberFormat('en-GB', {
                          style: 'currency',
                          currency: item.currencyCode,
                          minimumFractionDigits: 0
                        }).format(item.price)}
                      </div>
                    )}
                    
                    <div className={styles.cardActions}>
                      <Button href={`/products/${item.handle}`}>
                        View Details
                      </Button>
                      <Button href="/contact">
                        Contact About This
                      </Button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Interested in Multiple Watches?</h2>
            <p className={styles.ctaDescription}>
              Contact us about any watches in your wishlist. We&apos;re here to help you find the perfect timepiece.
            </p>
            <Button href="/contact">
              Contact Us
            </Button>
          </div>
        </>
      )}
    </main>
  )
}

