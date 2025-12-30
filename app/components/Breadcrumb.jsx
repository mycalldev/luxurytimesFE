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

  // Build breadcrumb items from path segments
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    
    // Use custom label if available, otherwise use routeLabels, otherwise format the segment
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
      } else {
        // Regular segment formatting
        label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
    }

    breadcrumbItems.push({
      href: currentPath,
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

