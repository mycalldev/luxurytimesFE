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
    <main>
      <div className={styles.navContainer}>
        <div className={styles.containerFlex}>
          
          <div>
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
              <div className={styles.titleMain} onClick={() => handleToggle()}>LUXURY TIMES</div>
            </Link>
          </div>

          <div className={styles.contactIcon}>
            <Link href="tel:07976753254">
              <Image
                src={'/phone_icon.png'}
                width={32}
                height={32}
                alt={'contact button'}
                quality={100}
              />
            </Link>
          </div>
        </div>
    </div>
    {toggle ? <nav className={styles.navOpen}>
      <ul className={styles.unorderedList}>
        <Link href={'/rolex/rolex-categories'} className={styles.linkBTN}>
          <div className={styles.listItemContainer} onClick={() => handleToggle()}>
            <li className={styles.listItem}>Rolex</li>
          </div>
        </Link>
        <Link href={'/patek-philippe-categories'} className={styles.linkBTN}>
          <div className={styles.listItemContainer} onClick={() => handleToggle()}>
            <li className={styles.listItem}>Patek Philippe</li>
          </div>
        </Link>
        <Link href={'/audemars-piguet-categories'} className={styles.linkBTN}>
          <div className={styles.listItemContainer} onClick={() => handleToggle()}>
            <li className={styles.listItem}>Audemars Piguet</li>
          </div>
        </Link>
        <Link href={'/guide'} className={styles.linkBTN}>
          <div className={styles.listItemContainer} onClick={() => handleToggle()}>
            <li className={styles.listItem}>Guides</li>
          </div>
        </Link>
        <Link href={'/blog'} className={styles.linkBTN}>
          <div className={styles.listItemContainer} onClick={() => handleToggle()}>
            <li className={styles.listItem}>Blogs</li>
          </div>
        </Link>
        <Link href={'/contact'} className={styles.linkBTN}>
          <div className={styles.listItemContainer} onClick={() => handleToggle()}>
            <li className={styles.listItem}>Contact</li>
          </div>
        </Link>
      </ul>
      <div className={styles.closeMenu} onClick={() => handleToggle()}>Close Menu</div>
    </nav> : 
    <div></div>
    }
    
    </main>
  )
}
