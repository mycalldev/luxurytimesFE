'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'

// Navigation links configuration
const navLinks = [
  { href: '/rolex/rolex-categories', label: 'Rolex', prefetch: true },
  { href: '/patek-philippe/patek-philippe-categories', label: 'Patek Philippe', prefetch: true },
  { href: '/audemars-piguet/audemars-piguet-categories', label: 'Audemars Piguet', prefetch: true },
  // { href: '/Jewellery', label: 'Jewellery', prefetch: true },
  { href: '/sell', label: 'Sell', prefetch: true },
  { href: '/guide', label: 'Guides', prefetch: false },
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
            <h1 className={styles.brandTitle}>LUXURY TIMES LTD</h1>
          </Link>

          <Link href="tel:07718269994" className={styles.logoLink}>
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
        <Link href="/" className={styles.brandLink}>
          <h1 className={styles.brandTitleDesktop}>LUXURY TIMES LTD</h1>
        </Link>
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
          </ul>
        </nav>
      </div>
    </header>
  )
}
