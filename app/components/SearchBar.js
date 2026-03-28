'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)
  const router = useRouter()

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Debounced search — fires 300ms after the user stops typing
  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setActiveIndex(-1)

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)
        const data = await res.json()
        setResults(data)
        setHasSearched(true)
      } catch {
        setResults([])
        setHasSearched(true)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && results[activeIndex]) {
        router.push(`/products/${results[activeIndex].node.handle}`)
        close()
      }
    } else if (e.key === 'Escape') {
      close()
    }
  }

  const close = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setActiveIndex(-1)
    setHasSearched(false)
  }

  const showResults = query.trim().length >= 2

  return (
    <>
      <button
        className={styles.searchIconButton}
        onClick={() => setIsOpen(true)}
        aria-label="Search products"
      >
        <SearchIcon />
      </button>

      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Search">
          <div className={styles.overlayBackdrop} onClick={close} />

          <div className={styles.searchPanel}>
            {/* Input row */}
            <div className={styles.searchInputRow}>
              <SearchIcon className={styles.inputSearchIcon} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by brand, model, reference..."
                className={styles.searchInput}
                aria-label="Search products"
                aria-expanded={results.length > 0}
                aria-autocomplete="list"
                autoComplete="off"
              />
              {isLoading && <div className={styles.spinner} aria-label="Searching" />}
              <button className={styles.closeButton} onClick={close} aria-label="Close search">
                <CloseIcon />
              </button>
            </div>

            {/* Results area */}
            {showResults && (
              <div className={styles.resultsContainer}>
                {isLoading ? (
                  <p className={styles.statusText}>Searching...</p>
                ) : results.length > 0 ? (
                  <>
                    <p className={styles.resultsCount}>
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    <div className={styles.resultsList} role="listbox">
                      {results.map(({ node: product }, i) => {
                        const image = product.images.edges[0]?.node
                        const price = product.priceRange.minVariantPrice
                        const isActive = i === activeIndex

                        return (
                          <Link
                            key={product.id}
                            href={`/products/${product.handle}`}
                            className={`${styles.resultItem} ${isActive ? styles.resultItemActive : ''}`}
                            role="option"
                            aria-selected={isActive}
                            onClick={close}
                          >
                            <div className={styles.resultImageWrapper}>
                              {image ? (
                                <Image
                                  src={image.url}
                                  alt={image.altText || product.title}
                                  width={64}
                                  height={64}
                                  className={styles.resultImage}
                                />
                              ) : (
                                <div className={styles.resultImagePlaceholder} />
                              )}
                            </div>

                            <div className={styles.resultInfo}>
                              <span className={styles.resultVendor}>{product.vendor}</span>
                              <span className={styles.resultTitle}>{product.title}</span>
                              <span className={styles.resultPrice}>
                                {new Intl.NumberFormat('en-GB', {
                                  style: 'currency',
                                  currency: price.currencyCode,
                                  minimumFractionDigits: 0,
                                }).format(price.amount)}
                              </span>
                            </div>

                            <ArrowIcon className={`${styles.resultArrow} ${isActive ? styles.resultArrowActive : ''}`} />
                          </Link>
                        )
                      })}
                    </div>
                  </>
                ) : hasSearched ? (
                  <div className={styles.noResults}>
                    <p className={styles.noResultsText}>
                      No watches found for &ldquo;<strong>{query}</strong>&rdquo;
                    </p>
                    <p className={styles.noResultsHint}>
                      Try searching by brand name, model, or reference number
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
