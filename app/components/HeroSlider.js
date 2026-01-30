'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './HeroSlider.module.css'

/**
 * HeroSlider Component
 * 
 * A reusable image slider component that automatically slides images to the left
 * every 3 seconds. Supports separate images for mobile and desktop views.
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

  /**
   * Moves to the next slide
   */
  const nextSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      // If we're at the last real image, move to the cloned first image
      if (prevIndex === images.length - 1) {
        return images.length // This is the cloned first image
      }
      return prevIndex + 1
    })
  }, [images.length])

  /**
   * Handle seamless loop: when we reach the cloned first image, 
   * wait for transition to complete, then instantly jump back to the real first image
   */
  useEffect(() => {
    if (currentIndex === images.length && images.length > 0) {
      // We've reached the cloned first image
      // Wait for the transition to complete (500ms), then instantly jump to real first
      const jumpTimer = setTimeout(() => {
        setIsTransitioning(false)
        // Small delay to ensure transition is disabled
        setTimeout(() => {
          setCurrentIndex(0)
        }, 10)
      }, 500) // Match CSS transition duration
      return () => clearTimeout(jumpTimer)
    }
  }, [currentIndex, images.length])

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
    if (isTransitioning && currentIndex !== images.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500) // Match CSS transition duration
      return () => clearTimeout(timer)
    }
  }, [isTransitioning, currentIndex, images.length])

  // Don't render if no images provided
  if (!images || images.length === 0) {
    return null
  }

  // Create extended images array with cloned first image at the end for seamless loop
  const extendedImages = images.length > 0 
    ? [...images, images[0]] // Clone first image at the end
    : []

  return (
    <div className={styles.sliderContainer}>
      <div 
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        }}
      >
        {extendedImages.map((image, index) => (
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
    </div>
  )
}

