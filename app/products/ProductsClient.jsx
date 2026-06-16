'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/Button'
import WishlistIcon from '../components/WishlistIcon'
import { isPOA } from '../utils/shopify'
import styles from './products.module.css'

const BRANDS = [
  { handle: 'rolex',           label: 'Rolex' },
  { handle: 'patek-philippe',  label: 'Patek Philippe' },
  { handle: 'audemars-piguet', label: 'Audemars Piguet' },
  { handle: 'richard-mille',   label: 'Richard Mille' },
]

const BRAND_PRIORITY = { 'rolex': 1, 'patek-philippe': 2, 'audemars-piguet': 3, 'richard-mille': 4 }
const BRAND_NAMES    = { 'rolex': 'Rolex', 'patek-philippe': 'Patek Philippe', 'audemars-piguet': 'Audemars Piguet', 'richard-mille': 'Richard Mille' }

export default function ProductsClient({ products, initialCollections = [], initialModels = [] }) {
  const [selectedCollections, setSelectedCollections] = useState(initialCollections)
  const [selectedModels, setSelectedModels]           = useState(initialModels)
  const [brandDropdownOpen, setBrandDropdownOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen]               = useState(false)
  const [canScrollDown, setCanScrollDown]             = useState(false)

  const brandDropdownRef  = useRef(null)
  const dropdownRef       = useRef(null)
  const modelOptionsRef   = useRef(null)
  const productsGridRef   = useRef(null)
  const isFirstBrandSync  = useRef(true)
  const isFirstModelSync  = useRef(true)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(e.target)) {
        setBrandDropdownOpen(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sync selected brands to URL
  useEffect(() => {
    if (isFirstBrandSync.current) { isFirstBrandSync.current = false; return }
    const params = new URLSearchParams(window.location.search)
    if (selectedCollections.length > 0) {
      params.set('collection', selectedCollections.join(','))
    } else {
      params.delete('collection')
    }
    // Clear model param too if models were also reset
    if (selectedModels.length === 0) params.delete('models')
    window.history.replaceState(null, '', `?${params.toString()}`)
  }, [selectedCollections])

  // Sync selected models to URL
  useEffect(() => {
    if (isFirstModelSync.current) { isFirstModelSync.current = false; return }
    const params = new URLSearchParams(window.location.search)
    if (selectedModels.length > 0) {
      params.set('models', selectedModels.join(','))
    } else {
      params.delete('models')
    }
    window.history.replaceState(null, '', `?${params.toString()}`)
  }, [selectedModels])

  // Restore scroll position when returning from a product page
  useEffect(() => {
    const savedY = sessionStorage.getItem('productsScrollY')
    if (!savedY) return
    sessionStorage.removeItem('productsScrollY')
    requestAnimationFrame(() => {
      window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' })
    })
  }, [])

  // Check whether the model options list can scroll further down.
  // Reads the DOM after paint so the list height is settled.
  useEffect(() => {
    if (!dropdownOpen) return
    requestAnimationFrame(() => {
      const el = modelOptionsRef.current
      if (!el) return
      setCanScrollDown(el.scrollHeight > el.clientHeight)
    })
  }, [dropdownOpen])

  const handleModelOptionsScroll = () => {
    const el = modelOptionsRef.current
    if (!el) return
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4)
  }

  const getBrandPriority = (product) => {
    const handles = product.collections?.edges?.map(({ node }) => node.handle) ?? []
    for (const handle of handles) {
      if (BRAND_PRIORITY[handle] != null) return BRAND_PRIORITY[handle]
    }
    return 99
  }

  // Filter by selected brands (OR logic), then sort
  const filteredByCollection = useMemo(() => {
    let filtered = products

    if (selectedCollections.length > 0) {
      filtered = filtered.filter(({ node: product }) =>
        product.collections.edges.some(({ node: col }) =>
          selectedCollections.includes(col.handle)
        )
      )
    }

    return [...filtered].sort((a, b) => {
      const aBrand = getBrandPriority(a.node)
      const bBrand = getBrandPriority(b.node)
      if (aBrand !== bBrand) return aBrand - bBrand

      const aOrder = a.node.sortOrder?.value != null ? parseInt(a.node.sortOrder.value, 10) : Infinity
      const bOrder = b.node.sortOrder?.value != null ? parseInt(b.node.sortOrder.value, 10) : Infinity
      if (aOrder !== bOrder) return aOrder - bOrder

      const aFeat = a.node.tags?.includes('feature') ? 0 : 1
      const bFeat = b.node.tags?.includes('feature') ? 0 : 1
      if (aFeat !== bFeat) return aFeat - bFeat

      return a.node.title.localeCompare(b.node.title)
    })
  }, [products, selectedCollections])

  const MODEL_PREFIX = 'model:'

  const availableModels = useMemo(() => {
    const modelCounts = new Map()
    filteredByCollection.forEach(({ node: product }) => {
      product.tags?.forEach(tag => {
        if (tag.startsWith(MODEL_PREFIX)) {
          const model = tag.slice(MODEL_PREFIX.length).trim()
          modelCounts.set(model, (modelCounts.get(model) || 0) + 1)
        }
      })
    })
    return Array.from(modelCounts.entries())
      .filter(([, count]) => count > 0)
      .map(([model]) => model)
      .sort()
  }, [filteredByCollection])

  const filteredProducts = useMemo(() => {
    if (selectedModels.length === 0) return filteredByCollection
    return filteredByCollection.filter(({ node: product }) => {
      if (!product.tags || !Array.isArray(product.tags)) return false
      return selectedModels.some(model => product.tags.includes(`${MODEL_PREFIX}${model}`))
    })
  }, [filteredByCollection, selectedModels])

  const toggleCollection = (handle) => {
    setSelectedCollections(prev =>
      prev.includes(handle) ? prev.filter(h => h !== handle) : [...prev, handle]
    )
    setSelectedModels([])
  }

  const clearCollections = () => {
    setSelectedCollections([])
    setSelectedModels([])
  }

  const toggleModel = (model) => {
    setSelectedModels(prev =>
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    )
  }

  const clearModels = () => setSelectedModels([])

  const saveBackUrl = () => {
    const params = new URLSearchParams()
    if (selectedCollections.length > 0) params.set('collection', selectedCollections.join(','))
    if (selectedModels.length > 0) params.set('models', selectedModels.join(','))
    const qs = params.toString()
    sessionStorage.setItem('productsBackUrl', `/products${qs ? `?${qs}` : ''}`)
    sessionStorage.setItem('productsScrollY', String(window.scrollY))
  }

  const brandTriggerLabel = selectedCollections.length === 0
    ? 'All Watches'
    : selectedCollections.length === 1
      ? BRAND_NAMES[selectedCollections[0]]
      : `${selectedCollections.length} Brands Selected`

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>LUXURY WATCHES</h1>

        {/* Mobile brand multi-select dropdown */}
        <div className={styles.mobileBrandFilter} ref={brandDropdownRef}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => setBrandDropdownOpen(prev => !prev)}
            aria-expanded={brandDropdownOpen}
            aria-haspopup="listbox"
          >
            <div className={styles.dropdownTriggerContent}>
              <svg className={styles.filterIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1.5 3.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4.5 9H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 14.25H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>{brandTriggerLabel}</span>
            </div>
            <svg
              className={`${styles.chevronIcon} ${brandDropdownOpen ? styles.chevronOpen : ''}`}
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {brandDropdownOpen && (
            <div className={styles.dropdownMenu} role="listbox" aria-multiselectable="true">
              <div className={styles.dropdownOptions}>
                <button
                  role="option"
                  aria-selected={selectedCollections.length === 0}
                  onClick={clearCollections}
                  className={`${styles.dropdownOption} ${selectedCollections.length === 0 ? styles.dropdownOptionActive : ''}`}
                >
                  <span className={styles.optionCheckbox}>
                    {selectedCollections.length === 0 && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span>All Watches</span>
                </button>
                {BRANDS.map(({ handle, label }) => (
                  <button
                    key={handle}
                    role="option"
                    aria-selected={selectedCollections.includes(handle)}
                    onClick={() => toggleCollection(handle)}
                    className={`${styles.dropdownOption} ${selectedCollections.includes(handle) ? styles.dropdownOptionActive : ''}`}
                  >
                    <span className={styles.optionCheckbox}>
                      {selectedCollections.includes(handle) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <button
                className={styles.applyButton}
                onClick={() => setBrandDropdownOpen(false)}
              >
                {selectedCollections.length === 0 ? 'Close' : `Show Results (${filteredByCollection.length})`}
              </button>
            </div>
          )}
        </div>

        {/* Desktop brand toggle buttons */}
        <div className={styles.filterButtons}>
          <Button
            variant={selectedCollections.length === 0 ? 'active' : 'primary'}
            onClick={clearCollections}
          >
            All Watches
          </Button>
          {BRANDS.map(({ handle, label }) => (
            <Button
              key={handle}
              variant={selectedCollections.includes(handle) ? 'active' : 'primary'}
              onClick={() => toggleCollection(handle)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Model filter dropdown */}
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
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu} role="listbox" aria-multiselectable="true">
              {selectedModels.length > 0 && (
                <button onClick={clearModels} className={styles.clearButton}>
                  Clear All ({selectedModels.length})
                </button>
              )}
              <div className={styles.dropdownOptionsWrapper}>
                <div
                  className={styles.dropdownOptions}
                  ref={modelOptionsRef}
                  onScroll={handleModelOptionsScroll}
                >
                  {availableModels.map(model => (
                    <button
                      key={model}
                      role="option"
                      aria-selected={selectedModels.includes(model)}
                      onClick={() => toggleModel(model)}
                      className={`${styles.dropdownOption} ${selectedModels.includes(model) ? styles.dropdownOptionActive : ''}`}
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
                {canScrollDown && (
                  <div className={styles.scrollIndicator} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <button
                className={styles.applyButton}
                onClick={() => setDropdownOpen(false)}
              >
                {selectedModels.length === 0 ? 'Close' : `Show Results (${filteredProducts.length})`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results count — hidden when exactly one brand is selected with no stock */}
      {!(selectedCollections.length === 1 && filteredByCollection.length === 0) && (
        <div className={styles.resultsInfo}>
          Showing {filteredProducts.length} of {filteredByCollection.length} watches
          {selectedModels.length > 0 && (
            <span className={styles.activeFilters}>
              {' '}• Filtered by: {selectedModels.join(', ')}
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div ref={productsGridRef} className={styles.productsGrid}>
        {filteredProducts.map(({ node: product }) => {
          const firstImage = product.images.edges[0]?.node
          const price = product.priceRange.minVariantPrice

          return (
            <article key={product.id} className={styles.productCard}>
              <Link href={`/products/${product.handle}`} onClick={saveBackUrl}>
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
                  <div className={styles.vendor}>{product.vendor}</div>
                  <h2 className={styles.productTitle}>{product.title}</h2>
                  <div className={styles.price}>
                    {isPOA(product)
                      ? 'POA'
                      : new Intl.NumberFormat('en-GB', {
                          style: 'currency',
                          currency: price.currencyCode,
                          minimumFractionDigits: 0,
                        }).format(price.amount)}
                  </div>
                  <div className={styles.viewBtn}>View Details</div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {selectedCollections.length === 1 && filteredByCollection.length === 0 ? (
        <div className={styles.comingSoon}>
          <p className={styles.comingSoonLabel}>Coming Soon</p>
          <h2 className={styles.comingSoonBrand}>{BRAND_NAMES[selectedCollections[0]] || selectedCollections[0]}</h2>
          <p className={styles.comingSoonText}>
            Our {BRAND_NAMES[selectedCollections[0]] || selectedCollections[0]} collection is currently being curated.
            Please check back soon, or explore our other brands above.
          </p>
        </div>
      ) : filteredProducts.length === 0 && (
        <p className={styles.noProducts}>
          {selectedModels.length > 0
            ? 'No products match the selected filters.'
            : 'No products available.'}
        </p>
      )}
    </main>
  )
}
