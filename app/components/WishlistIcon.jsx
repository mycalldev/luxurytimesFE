'use client'

import { useState, useEffect } from 'react'
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist'
import styles from './WishlistIcon.module.css'

export default function WishlistIcon({ product, className = '' }) {
  const [inWishlist, setInWishlist] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check initial state
    setInWishlist(isInWishlist(product.handle))

    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      setInWishlist(isInWishlist(product.handle))
    }

    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
    }
  }, [product.handle])

  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)
    
    if (inWishlist) {
      removeFromWishlist(product.handle)
    } else {
      addToWishlist(product)
    }

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  return (
    <button
      onClick={handleToggle}
      className={`${styles.wishlistButton} ${className} ${inWishlist ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className={styles.heartIcon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}

