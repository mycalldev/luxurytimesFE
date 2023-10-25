import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './RolexCategories.module.css'

export default function RolexCategories() {
  return (
    <div>
      <div className={styles.titleCategory}>ROLEX CATEGORIES</div>
      
      <div className={styles.containerGrid}>
        {/* DATEJUST */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
                      width={840}
                      height={560}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DateJust</div>
          </div>
          <div className={styles.heroBtn}>
            <Link href="tel:07976753254" className={styles.linkBTN}>View</Link>
          </div>
        </div>

        {/* SUBMARINER */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
                      width={840}
                      height={560}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DateJust</div>
          </div>
          <div className={styles.heroBtn}>
            <Link href="tel:07976753254" className={styles.linkBTN}>View</Link>
          </div>
        </div>

        {/* GMT MASTER II */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
                      width={840}
                      height={560}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DateJust</div>
          </div>
          <div className={styles.heroBtn}>
            <Link href="tel:07976753254" className={styles.linkBTN}>View</Link>
          </div>
        </div>

        {/* SKY-DWELLER */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
                      width={840}
                      height={560}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DateJust</div>
          </div>
          <div className={styles.heroBtn}>
            <Link href="tel:07976753254" className={styles.linkBTN}>View</Link>
          </div>
        </div>

        {/* DAYTONA */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
                      width={840}
                      height={560}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DateJust</div>
          </div>
          <div className={styles.heroBtn}>
            <Link href="tel:07976753254" className={styles.linkBTN}>View</Link>
          </div>
        </div>

        {/* DAYDATE */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
                      width={840}
                      height={560}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DateJust</div>
          </div>
          <div className={styles.heroBtn}>
            <Link href="tel:07976753254" className={styles.linkBTN}>View</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
