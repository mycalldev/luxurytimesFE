
import Link from 'next/link'
import Image from 'next/image'
import styles from './AudemarsPiguetCategories.module.css'

export default function AudemarsPiguetCategories() {
  return (
    <div>
      <div className={styles.titleCategory}>AUDEMARS PIGUET COLLECTION</div>
      
      <div className={styles.containerGrid}>
        {/* ROYAL OAK */}
        <div className={styles.containerItem}>
          <Link href={'/audemars-piguet/audemars-piguet-categories/royal-oak'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/audemarspiguet/royaloak/royaloak26240STsteelsteelblack/26240STroyaloak1.JPG`}
                      width={840}
                      height={560}
                      alt='royal oak thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Audemars Piguet</div>
            <div className={styles.modelTitle}>Royal Oak</div>
          </div>
          <Link href={"/audemars-piguet/audemars-piguet-categories/royal-oak"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        {/* ROYAL OAK OFFSHORE */}
        <div className={styles.containerItem}>
          <Link href={'/audemars-piguet/audemars-piguet-categories/royal-oak-offshore'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/coming_soon.jpg`}
                      width={840}
                      height={560}
                      alt='royal oak offshore thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Audemars Piguet</div>
            <div className={styles.modelTitle}>Royal Oak Offshore</div>
          </div>
          <Link href={"/audemars-piguet/audemars-piguet-categories/royal-oak-offshore"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        {/* ROYAL OAK CONCEPT */}
        <div className={styles.containerItem}>
          <Link href={'/audemars-piguet/audemars-piguet-categories/royal-oak-concept'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/coming_soon.jpg`}
                      width={840}
                      height={560}
                      alt='royal oak concept thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Audemars Piguet</div>
            <div className={styles.modelTitle}>Royal Oak Concept</div>
          </div>
          <Link href={"/audemars-piguet/audemars-piguet-categories/royal-oak-concept"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

         {/* CODE 1159 */}
         <div className={styles.containerItem}>
          <Link href={'/audemars-piguet/audemars-piguet-categories/code1159'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/coming_soon.jpg`}
                      width={840}
                      height={560}
                      alt='code1159 thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Audemars Piguet</div>
            <div className={styles.modelTitle}>Code 1159</div>
          </div>
          <Link href={"/audemars-piguet/audemars-piguet-categories/code-1159"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        </div>
    </div>
  )
}
