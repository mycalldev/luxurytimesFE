// Wishlist utility functions using localStorage

const WISHLIST_KEY = 'luxury-times-wishlist'

// Get all wishlist items
export function getWishlist() {
  if (typeof window === 'undefined') return []
  
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY)
    if (wishlist) {
      return JSON.parse(wishlist)
    }
  } catch (error) {
    console.error('Error reading wishlist:', error)
  }
  return []
}

// Add product to wishlist
export function addToWishlist(product) {
  if (typeof window === 'undefined') return false
  
  try {
    const wishlist = getWishlist()
    
    // Check if product already exists
    const exists = wishlist.some(item => item.handle === product.handle)
    if (exists) {
      return false // Already in wishlist
    }
    
    // Add product with essential info
    const wishlistItem = {
      id: product.id,
      handle: product.handle,
      title: product.title,
      vendor: product.vendor,
      price: product.priceRange?.minVariantPrice?.amount || null,
      currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'GBP',
      image: product.images?.edges?.[0]?.node?.url || null,
      imageAlt: product.images?.edges?.[0]?.node?.altText || product.title,
      addedAt: new Date().toISOString(),
    }
    
    wishlist.push(wishlistItem)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
    
    // Trigger custom event for UI updates
    window.dispatchEvent(new CustomEvent('wishlistUpdated'))
    
    return true
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return false
  }
}

// Remove product from wishlist
export function removeFromWishlist(productHandle) {
  if (typeof window === 'undefined') return false
  
  try {
    const wishlist = getWishlist()
    const filtered = wishlist.filter(item => item.handle !== productHandle)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered))
    
    // Trigger custom event for UI updates
    window.dispatchEvent(new CustomEvent('wishlistUpdated'))
    
    return true
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return false
  }
}

// Check if product is in wishlist
export function isInWishlist(productHandle) {
  if (typeof window === 'undefined') return false
  
  const wishlist = getWishlist()
  return wishlist.some(item => item.handle === productHandle)
}

// Get wishlist count
export function getWishlistCount() {
  if (typeof window === 'undefined') return 0
  
  return getWishlist().length
}

// Clear entire wishlist
export function clearWishlist() {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(WISHLIST_KEY)
    window.dispatchEvent(new CustomEvent('wishlistUpdated'))
    return true
  } catch (error) {
    console.error('Error clearing wishlist:', error)
    return false
  }
}

