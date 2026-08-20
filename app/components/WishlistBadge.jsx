'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { getWishlistCount, subscribeToWishlist } from '../utils/wishlist'
import styles from './WishlistBadge.module.css'

export default function WishlistBadge() {
  const count = useSyncExternalStore(subscribeToWishlist, getWishlistCount, () => 0)

  if (count === 0) return null

  return (
    <Link href="/wishlist" className={styles.badge} aria-label={`View wishlist (${count} items)`}>
      <svg
        className={styles.heartIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className={styles.count}>{count}</span>
    </Link>
  )
}

