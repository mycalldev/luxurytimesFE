'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import WishlistIcon from './WishlistIcon'
import Button from './Button'
import styles from './FeaturedProducts.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function FeaturedProducts({ products }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.subtitle}>Curated Selection</span>
            <h2 className={styles.title}>Featured Timepieces</h2>
          </div>
          <div className={styles.headerCta}>
            <Link href="/products" className={styles.viewAllLink}>
              View All
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.arrowIcon}>
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          {/* Custom Navigation Buttons */}
          <button ref={prevRef} className={`${styles.navButton} ${styles.navPrev}`} aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button ref={nextRef} className={`${styles.navButton} ${styles.navNext}`} aria-label="Next slide">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className={styles.swiper}
          >
            {products.map(({ node: product }) => {
              const firstImage = product.images.edges[0]?.node
              const price = product.priceRange.minVariantPrice

              return (
                <SwiperSlide key={product.id} className={styles.slide}>
                  <Link href={`/products/${product.handle}`} className={styles.productCard}>
                    <div className={styles.imageWrapper}>
                      {firstImage ? (
                        <>
                          <Image
                            src={firstImage.url}
                            alt={firstImage.altText || product.title}
                            width={400}
                            height={400}
                            className={styles.productImage}
                            quality={85}
                          />
                          <div className={styles.imageOverlay} />
                        </>
                      ) : (
                        <div className={styles.noImage}>No Image</div>
                      )}
                      <div className={styles.wishlistOverlay}>
                        <WishlistIcon product={product} />
                      </div>
                    </div>

                    <div className={styles.productInfo}>
                      <span className={styles.vendor}>{product.vendor}</span>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <span className={styles.price}>
                        {new Intl.NumberFormat('en-GB', {
                          style: 'currency',
                          currency: price.currencyCode,
                          minimumFractionDigits: 0,
                        }).format(price.amount)}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <Button href="/products" prefetch={true}>
            View More
          </Button>
        </div>
      </div>
    </section>
  )
}
