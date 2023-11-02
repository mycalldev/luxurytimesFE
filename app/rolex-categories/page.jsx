
import Link from 'next/link'
import Image from 'next/image'
import styles from './RolexCategories.module.css'

export default function RolexCategories() {
  return (
    <div>
      <div className={styles.titleCategory}>ROLEX COLLLECTIONS</div>
      
      <div className={styles.containerGrid}>
        {/* DATEJUST */}
        <div className={styles.containerItem}>
          <Link href={'/rolex-categories/datejust'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/datejust/datejust126331jubileewimbledon/126331datejust1.JPG`}
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
          <Link href={"/rolex-categories/datejust"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>

          
        </div>

        {/* SUBMARINER */}
        <div className={styles.containerItem}>
          <Link href={'/rolex-categories/submariner'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/submariner/submariner116610LVoystergreen/116610LVsubmariner1.JPG`}
                      width={840}
                      height={560}
                      alt='submariner thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>Submariner</div>
          </div>
          <Link href={"/rolex-categories/submariner"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        {/* GMT MASTER II */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/gmtmasterii/gmtmasterii126710BLNRoysterblack/126710BLNRgmtmasterii1.JPG`}
                      width={840}
                      height={560}
                      alt='gmt-master ii thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>GMT Master II</div>
          </div>
          <Link href={"/rolex-categories/gmt-master-ii"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        {/* SKY-DWELLER */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/skydweller/skydweller326933oysterchampagne/326933skydweller1.JPG`}
                      width={840}
                      height={560}
                      alt='skydweller thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>Sky-Dweller</div>
          </div>
          <Link href={"/rolex-categories/sky-dweller"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        {/* DAYTONA */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/daytona/daytona116500LNoysterpanda/116500LNdaytona1.JPG`}
                      width={840}
                      height={560}
                      alt='daytona thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>Daytona</div>
          </div>
          <Link href={"/rolex-categories/daytona"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>

        {/* DAYDATE */}
        <div className={styles.containerItem}>
          <Link href={'/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/daydate/daydate228349RBRpresidentialolive/228349RBRdaydate1.JPG`}
                      width={840}
                      height={560}
                      alt='daydate thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>DayDate</div>
          </div>
          <Link href={"/rolex-categories/daydate"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.heroBtn}>
              View
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
