
import Link from 'next/link'
import Image from 'next/image'
import styles from './PatekPhilippeCategories.module.css'

export default function PatekPhilippeCategories() {
  return (
    <div>
      <div className={styles.titleCategory}>PATEK PHILIPPE COLLECTIONS</div>
      <div className={styles.introContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat.
      </div>

      {/* MOBILE CONTACT */}
      <div className={styles.contactBTNContainerMobile}>
        <Link href="tel:07976753254" className={styles.linkBTN} >
            <div className={styles.contactBTN}>CONTACT</div>
        </Link>
      </div>

      {/* CONTACT DESKTOP */}
      <div className={styles.contactBTNContainerDesktop}>
        <div className={styles.titleContactDesktop}>CONTACT</div>
            <div className={styles.contactBTN}>07976 753 254</div>
      </div>
      
      <div className={styles.containerGrid}>
        {/* AQUANAUT */}
        <div className={styles.containerItem}>
          <Link href={'/patek-philippe/patek-philippe-categories/aquanaut'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/patekphilippe/aquanaut/aquanaut5267Ablackrubberblack/5267Aaquanaut1.JPG`}
                      width={840}
                      height={560}
                      alt='aquanaut thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Patek Philippe</div>
            <div className={styles.modelTitle}>Aquanaut</div>
          </div>
          <Link href={"/patek-philippe/patek-philippe-categories/aquanaut"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* NAUTILUS */}
        <div className={styles.containerItem}>
          <Link href={'/patek-philippe/patek-philippe-categories/nautilus'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/patekphilippe/nautilus/nautilus71181Asteelsteelwhite/71181Anautilus1.JPG`}
                      width={840}
                      height={560}
                      alt='nautilus thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Patek Philippe</div>
            <div className={styles.modelTitle}>Nautilus</div>
          </div>
          <Link href={"/patek-philippe/patek-philippe-categories/nautilus"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* GRAND COMPLICATION */}
        <div className={styles.containerItem}>
          <Link href={'/patek-philippe/patek-philippe-categories/grand-complication'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/category/patekphilippe.JPG`}
                      width={840}
                      height={560}
                      alt='grand complication thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Patek Philippe</div>
            <div className={styles.modelTitle}>Grand Complication</div>
          </div>
          <Link href={"/patek-philippe/patek-philippe-categories/grand-complication"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        </div>
    </div>
  )
}