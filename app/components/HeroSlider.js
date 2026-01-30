'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './HeroSlider.module.css'

/**
 * HeroSlider Component
 * 
 
 * 
 * A reusable image slider component that automatically slides images to the left
 * every 3 seconds. Supports touch/swipe gestures and accepts an array of images.
 * Supports separate images for mobile and desktop views.
 * 
 * @param {Array} images - Array of image objects with properties:
 *   - src: string (mobile image path)
 *   - srcDesktop: string (desktop image path, optional)
 *   - alt: string (alt text)
 *   - width: number (mobile width, optional, default: 2000)
 *   - height: number (mobile height, optional, default: 1333)
 *   - widthDesktop: number (desktop width, optional, default: 2000)
 *   - heightDesktop: number (desktop height, optional, default: 1000)
 * @param {number} slideInterval - Time in milliseconds between slides (default: 3000)
 */
export default function HeroSlider({ 
  images = [], 
  slideInterval = 3000 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  /**
   * Moves to the next slide
   */
  const nextSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }, [images.length])

  /**
   * Moves to the previous slide
   */
  const prevSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }, [images.length])

  /**
   * Handles touch start for swipe detection
   */
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  /**
   * Handles touch move for swipe detection
   */
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  /**
   * Handles touch end and determines swipe direction
   */
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  /**
   * Auto-advance slides every slideInterval milliseconds
   */
  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      nextSlide()
    }, slideInterval)

    return () => clearInterval(timer)
  }, [currentIndex, images.length, nextSlide, slideInterval])

  /**
   * Reset transition state after animation completes
   */
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500) // Match CSS transition duration
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Don't render if no images provided
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div 
      className={styles.sliderContainer}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            {/* Mobile Image */}
            <Image
              src={image.src}
              alt={image.alt || `Hero image ${index + 1}`}
              width={image.width || 2000}
              height={image.height || 1333}
              className={styles.slideImageMobile}
              quality={100}
              priority={index === 0}
            />
            {/* Desktop Image */}
            {image.srcDesktop && (
              <Image
                src={image.srcDesktop}
                alt={image.alt || `Hero image ${index + 1}`}
                width={image.widthDesktop || 2000}
                height={image.heightDesktop || 1000}
                className={styles.slideImageDesktop}
                quality={100}
                priority={index === 0}
              />
            )}
          </div>
        ))}
      </div>

      {/* Slide indicators (dots) */}
      {images.length > 1 && (
        <div className={styles.indicators}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.indicatorActive : ''
              }`}
              onClick={() => {
                setIsTransitioning(true)
                setCurrentIndex(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

