
import Link from 'next/link'
import Image from 'next/image'
import styles from './RolexCategories.module.css'

export default function RolexCategories() {
  return (
    <div>
      <div className={styles.titleCategory}>ROLEX COLLECTIONS</div>
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
        {/* DATEJUST */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/datejust'} > 
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
          <Link href={"/rolex/rolex-categories/datejust"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* SUBMARINER */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/submariner'} > 
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
          <Link href={"/rolex/rolex-categories/submariner"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* GMT MASTER II */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/gmt-master-ii'} > 
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
          <Link href={"/rolex/rolex-categories/gmt-master-ii"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* SKY-DWELLER */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/sky-dweller'} > 
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
          <Link href={"/rolex/rolex-categories/sky-dweller"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* DAYTONA */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/daytona'} className={styles.linkBTNCategory} > 
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
          <Link href={"/rolex/rolex-categories/daytona"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* DAYDATE */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/daydate'} > 
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
            <div className={styles.modelTitle}>Day-Date</div>
          </div>
          <Link href={"/rolex/rolex-categories/daydate"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* YACHT-MASTER */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/yachtmaster'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/yachtmaster/yachtmaster126621oysterchocolate/126621yachtmaster1.JPG`}
                      width={840}
                      height={560}
                      alt='yacht master thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.rolexTitle}>Rolex</div>
            <div className={styles.modelTitle}>Yacht-Master</div>
          </div>
          <Link href={"/rolex/rolex-categories/yachtmaster"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>
      </div>

      
    </div>
  )
}
