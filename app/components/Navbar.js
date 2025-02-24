'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
      setToggle(!toggle)
  }

  return (
    <main >
      <div className={styles.navContainer}>
        <div className={styles.containerGrid}>
          
            <div onClick={() => handleToggle()}>
              <Image
                src={'/hamburger.png'}
                width={32}
                height={32}
                className={styles.imageBurger}
                alt={'menu bar'}
                quality={100}
              />
            </div>
          
          <div>
            <Link href="/#" className={styles.undreline}>
              <div className={styles.titleMain}>LUXURY TIMES LTD</div>
            </Link>
          </div>

          <div className={styles.logoIcon}>
            <Link href="tel:07718269994">
              <Image
                src={'/logo_it.png'}
                width={125}
                height={125}
                className={styles.navbarLogo}
                alt={'contact button'}
                quality={100}
              />
            </Link>
          </div>
        </div>
      </div>
      {toggle ? 
            <nav className={styles.navOpen}>
              <ul className={styles.unorderedList}>
                <Link href={'/rolex/rolex-categories'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Rolex</li>
                  </div>
                </Link>
                <Link href={'/patek-philippe/patek-philippe-categories'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Patek Philippe</li>
                  </div>
                </Link>
                <Link href={'/audemars-piguet/audemars-piguet-categories'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Audemars Piguet</li>
                  </div>
                </Link>
                <Link href={'/Jewellery'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Jewellery</li>
                  </div>
                </Link>
                <Link href={'/sell'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Sell</li>
                  </div>
                </Link>
                <Link href={'/guide'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Guides</li>
                  </div>
                </Link>
                <Link href={'/blog'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Blogs</li>
                  </div>
                </Link>
                <Link href={'/contact'} className={styles.linkBTN} prefetch={true}>
                  <div className={styles.listItemContainer} onClick={() => handleToggle()}>
                    <li className={styles.listItem}>Contact</li>
                  </div>
                </Link>
              </ul>
            <div className={styles.closeMenu} onClick={() => handleToggle()}>Close Menu</div>
          </nav> 
            : 
          <div></div>
          }


          {/* DESKTOP NAV */}
          <Link href="/#" className={styles.undreline}>
            <div className={styles.titleMainDesktop}>LUXURY TIMES LTD</div>
          </Link>
            <nav className={styles.navContainerGrid}>
              <ul className={styles.navDesktopGrid}>
                <Link href={'/rolex/rolex-categories'} className={styles.linkBTN} prefetch={true}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Rolex</li>
                    </div>
                </Link>
                <Link href={'/patek-philippe/patek-philippe-categories'} className={styles.linkBTN}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Patek Philippe</li>
                    </div>
                  </Link>
                  <Link href={'/audemars-piguet/audemars-piguet-categories'} className={styles.linkBTN}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Audemars Piguet</li>
                    </div>
                  </Link>
                  <Link href={'/Jewellery'} className={styles.linkBTN}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Jewellery</li>
                    </div>
                  </Link>
                  <Link href={'/sell'} className={styles.linkBTN} prefetch={true}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Sell</li>
                    </div>
                  </Link>
                  <Link href={'/guide'} className={styles.linkBTN}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Guides</li>
                    </div>
                  </Link>
                  <Link href={'/blog'} className={styles.linkBTN}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Blogs</li>
                    </div>
                  </Link>
                  <Link href={'/contact'} className={styles.linkBTN}>
                    <div className={styles.listItemContainer}>
                      <li className={styles.listItem}>Contact</li>
                    </div>
                  </Link>
              </ul>
            </nav>
      
    </main>
  )
}
