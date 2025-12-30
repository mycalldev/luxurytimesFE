'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'
import WishlistBadge from './WishlistBadge'

// Navigation links configuration
const navLinks = [
  { href: '/products/collections/rolex', label: 'Rolex', prefetch: true },
  { href: '/products/collections/patek-philippe', label: 'Patek Philippe', prefetch: true },
  { href: '/sell', label: 'Sell', prefetch: true },
  { href: '/blog', label: 'Blog', prefetch: false },
  { href: '/review', label: 'Reviews', prefetch: false },
  { href: '/contact', label: 'Contact', prefetch: false },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className={styles.header}>
      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <div className={styles.mobileContainer}>
          <button 
            onClick={toggleMenu}
            className={styles.menuButton}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Image
              src={'/hamburger.png'}
              width={32}
              height={32}
              className={styles.hamburgerIcon}
              alt="Menu"
              quality={100}
            />
          </button>
          
          <Link href="/" className={styles.brandLink}>
            <h1 className={styles.brandTitle}>LUXURY TIMES</h1>
          </Link>

          <div className={styles.mobileRightSection}>
            <WishlistBadge />
            <Link href="tel:07714611699" className={styles.contactIconLink} aria-label="Call us">
              <Image
                src={'/phone_icon.png'}
                width={24}
                height={24}
                className={styles.mobileContactIcon}
                alt="Call"
                quality={100}
              />
            </Link>
            <Link href="/" className={styles.logoLink}>
              <Image
                src={'/logo_it.png'}
                width={125}
                height={125}
                className={styles.logo}
                alt="Luxury Times Logo"
                quality={100}
              />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu} />
        )}

        {/* Mobile Menu */}
        <nav className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.mobileMenuList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={styles.mobileMenuLink}
                  prefetch={link.prefetch}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/wishlist" 
                className={styles.mobileMenuLink}
                onClick={closeMenu}
              >
                Wishlist
              </Link>
            </li>
          </ul>
          <button 
            className={styles.closeMenuButton} 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            Close Menu
          </button>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.desktopNav}>
        <div className={styles.desktopHeaderContainer}>
          <div className={styles.desktopHeaderLeft}>
            <Link href="/" className={styles.desktopLogoLink}>
              <Image
                src={'/logo_it.png'}
                width={80}
                height={80}
                className={styles.desktopLogo}
                alt="Luxury Times Logo"
                quality={100}
              />
            </Link>
            <Link href="/" className={styles.brandLink}>
              <h1 className={styles.brandTitleDesktop}>LUXURY TIMES</h1>
            </Link>
          </div>
          <div className={styles.desktopHeaderRight}>
            <WishlistBadge />
            <a href="mailto:info@luxurytimesltd.co.uk" className={styles.contactInfo}>
              <svg className={styles.contactIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.contactText}>info@luxurytimesltd.co.uk</span>
            </a>
            <a href="tel:07714611699" className={styles.contactInfo}>
              <Image
                src={'/phone_icon.png'}
                width={20}
                height={20}
                className={styles.contactIcon}
                alt="Phone"
                quality={100}
              />
              <span className={styles.contactText}>07714 611 699</span>
            </a>
          </div>
        </div>
        <nav className={styles.desktopNavContainer}>
          <ul className={styles.desktopMenuList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={styles.desktopMenuLink}
                  prefetch={link.prefetch}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/wishlist" 
                className={styles.desktopMenuLink}
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
