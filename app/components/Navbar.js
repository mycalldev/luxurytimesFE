'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'
import WishlistBadge from './WishlistBadge'
import SearchBar from './SearchBar'

const watchLinks = [
  { href: '/products/collections/rolex', label: 'Rolex', prefetch: true },
  { href: '/products/collections/patek-philippe', label: 'Patek Philippe', prefetch: true },
  { href: '/products/collections/audemars-piguet', label: 'Audemars Piguet', prefetch: true },
  { href: '/products/collections/richard-mille', label: 'Richard Mille', prefetch: true },
]

const navLinks = [
  { href: '/sell', label: 'Sell', prefetch: true },
  { href: '/blog', label: 'Blog', prefetch: false },
  { href: '/review', label: 'Reviews', prefetch: false },
  { href: '/contact', label: 'Contact', prefetch: false },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

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
            <SearchBar />
            <WishlistBadge />
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
            {watchLinks.map((link) => (
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
          <nav className={styles.desktopNavCenter}>
            <ul className={styles.desktopMenuList}>
              <li className={styles.dropdownWrapper} ref={dropdownRef}>
                <span
                  className={styles.desktopMenuLink}
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsDropdownOpen(!isDropdownOpen) }}}
                >
                  Watches
                  <svg
                    className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
                <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.dropdownMenuOpen : ''}`}>
                  {watchLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={styles.dropdownLink}
                        prefetch={link.prefetch}
                        onClick={closeDropdown}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
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
          <div className={styles.desktopHeaderRight}>
            <SearchBar />
            <WishlistBadge />
            <a href="tel:07714611699" className={styles.contactInfo}>
              <svg
                className={styles.contactIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className={styles.contactText}>07714 611 699</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
