
import Link from 'next/link'
import Image from 'next/image'
import styles from './PatekPhilippeCategories.module.css'

export default function PatekPhilippeCategories() {
  return (
    <div>
      <Link href={'/'} className={styles.backLinkBTN}>
      <div className={styles.backNav}>
         {'< Home'}
      </div>
      </Link>
      
      <div className={styles.titleCategory}>PATEK PHILIPPE COLLECTIONS</div>
      <div className={styles.introContent}>
        Discover the world of Patek Philippe watches, where Aqaunaut, 
        Nautilus, Grand Complication and Complication collections converge in a symphony of luxury,
        innovation, precision and timeless elegance. 
      </div>

      {/* MOBILE CONTACT */}
      <div className={styles.contactBTNContainerMobile}>
        <Link href="tel:07714611699" className={styles.linkBTN} >
            <div className={styles.contactBTN}>CONTACT</div>
        </Link>
      </div>

      {/* CONTACT DESKTOP */}
      <div className={styles.contactBTNContainerDesktop}>
        <div className={styles.titleContactDesktop}>CONTACT</div>
            <div className={styles.contactBTN}>07714 611 699</div>
      </div>
      
      <div className={styles.containerGrid}>
        {/* AQUANAUT */}
        <div className={styles.containerItem}>
          <Link href={'/patek-philippe/patek-philippe-categories/aquanaut'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/patekphilippe/aquanaut/5269200R001/aquanaut1.JPG`}
                      width={840}
                      height={560}
                      alt='aquanaut thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
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
                      src={`/watches/patekphilippe/nautilus/57261A/nautilus1.JPG`}
                      width={1200}
                      height={1200}
                      alt='nautilus thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
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
            <div className={styles.modelTitle}>Grand Complication</div>
          </div>
          <Link href={"/patek-philippe/patek-philippe-categories/grand-complication"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              Coming Soon
            </div>
          </Link>
        </div>

        {/* COMPLICATION */}
        <div className={styles.containerItem}>
          <Link href={'/patek-philippe/patek-philippe-categories/grand-complication'} prefetch={true} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/complication_test.JPG`}
                      width={840}
                      height={560}
                      alt='complication thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.modelTitle}>Complication</div>
          </div>
          <Link href={"/patek-philippe/patek-philippe-categories/complication"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              Coming Soon
            </div>
          </Link>
        </div>


        </div>
    </div>
  )
}
