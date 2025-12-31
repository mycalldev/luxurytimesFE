'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Breadcrumb.module.css'

// Map route segments to display names
const routeLabels = {
  'products': 'Products',
  'collections': 'Collections',
  'rolex': 'Rolex',
  'patek-philippe': 'Patek Philippe',
  'audemars-piguet': 'Audemars Piguet',
  'sell': 'Sell Your Watch',
  'blog': 'Blog',
  'contact': 'Contact',
  'review': 'Reviews',
  'guide': 'Buying Guides',
  'FAQs': 'FAQs',
  'return': 'Returns',
  'terms-and-conditions': 'Terms & Conditions',
}

// Custom labels for specific routes
const customLabels = {
  '/products': 'All Watches',
  '/products/collections/rolex': 'Rolex Collection',
  '/products/collections/patek-philippe': 'Patek Philippe Collection',
  '/products/collections/audemars-piguet': 'Audemars Piguet Collection',
}

export default function Breadcrumb({ items, showHome = true }) {
  const pathname = usePathname()
  
  // If custom items are provided, use them
  if (items && items.length > 0) {
    return (
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className={styles.breadcrumbItem}>
                {isLast ? (
                  <span className={styles.breadcrumbCurrent} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className={styles.breadcrumbLink}>
                      {item.label}
                    </Link>
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  // Auto-generate breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Don't show breadcrumb on home page
  if (pathname === '/' || pathSegments.length === 0) {
    return null
  }

  const breadcrumbItems = []

  // Add Home if showHome is true
  if (showHome) {
    breadcrumbItems.push({ href: '/', label: 'Home' })
  }

  // Check if this is a product detail page (not a collection page)
  // Product detail pages are: /products/[handle] where handle is not "collections"
  const isProductDetailPage = pathSegments.length === 2 && 
    pathSegments[0] === 'products' && 
    pathSegments[1] !== 'collections'

  // Check if this is a collection page: /products/collections/[modelname]
  const isCollectionPage = pathSegments.length === 3 && 
    pathSegments[0] === 'products' && 
    pathSegments[1] === 'collections'

  // Build breadcrumb items from path segments
  let currentPath = ''
  let displayPath = '' // Path for display (skips collections segment)
  pathSegments.forEach((segment, index) => {
    const isLast = index === pathSegments.length - 1
    
    // Build the actual path (for href)
    currentPath += `/${segment}`
    
    // Skip the "products" segment for product detail pages in display
    if (isProductDetailPage && segment === 'products') {
      return
    }

    // Skip the "collections" segment for collection pages in display
    if (isCollectionPage && segment === 'collections') {
      return
    }

    // Build display path (for label lookup, but we'll use actual path for href)
    if (!(isProductDetailPage && segment === 'products') && 
        !(isCollectionPage && segment === 'collections')) {
      displayPath += `/${segment}`
    }
    
    // Use custom label from full path if available, otherwise use routeLabels, otherwise format the segment
    let label = customLabels[currentPath] || routeLabels[segment]
    
    // If no custom label, format the segment
    if (!label) {
      // For product handles (usually long with hyphens), format more nicely
      if (index > 0 && pathSegments[index - 1] === 'products') {
        // This is likely a product handle - format it better
        label = segment
          .split('-')
          .map(word => {
            // Capitalize first letter, handle numbers
            if (word.match(/^\d/)) {
              return word.toUpperCase()
            }
            return word.charAt(0).toUpperCase() + word.slice(1)
          })
          .join(' ')
      } else if (isCollectionPage && index === 2) {
        // For collection names, format nicely
        label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      } else {
        // Regular segment formatting
        label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
    }

    // For collection pages, use /products as href for the "Products" breadcrumb
    let href = currentPath
    if (isCollectionPage && segment === 'products') {
      href = '/products'
    }

    breadcrumbItems.push({
      href: href,
      label: label,
      isLast: isLast
    })
  })

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          return (
            <li key={index} className={styles.breadcrumbItem}>
              {isLast ? (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

