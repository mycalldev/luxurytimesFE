
import Link from 'next/link'
import Image from 'next/image'
import styles from './RolexCategories.module.css'

export default function RolexCategories() {
  return (
    <div>
      <Link href={'/'} className={styles.backLinkBTN}>
      <div className={styles.backNav}>
         {'< Home'}
      </div>
      </Link>
      <div className={styles.titleCategory}>ROLEX COLLECTIONS</div>
      <div className={styles.introContent}>
        Explore the iconic Rolex collection, 
        a testament to precision and style. From the Enduring Submariner to the distinguished Day-Date, 
        each watch embodies Rolex's legacy of craftsmanship and sophistication.
      </div>

      {/* MOBILE CONTACT */}
      <div className={styles.contactBTNContainerMobile}>
        <Link href="tel:07714611699" className={styles.linkBTN} >
            <div>CONTACT</div>
        </Link>
      </div>

      {/* CONTACT DESKTOP */}
      <div className={styles.contactBTNContainerDesktop}>
        <div className={styles.titleContactDesktop}>CONTACT</div>
        <div className={styles.contactBTN}>07714 611 699</div>
      </div>
      
      <div className={styles.containerGrid}>
        {/* DATEJUST */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/datejust'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/datejust/datejust126334oysterazzurro/126334datejust1.JPG`}
                      width={1200}
                      height={1200}
                      alt='datejust thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
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
                      src={`/watches/rolex/submariner/submariner126610LNoysterblack/126610LNsubmariner1.JPG`}
                      width={1200}
                      height={1200}
                      alt='submariner thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
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
          <Link href={'/rolex/rolex-categories/gmtmasterii'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/gmtmasterii/gmtmasterii126710BLNRoysterblack/126710BLNRgmtmasterii1.JPG`}
                      width={1200}
                      height={1200}
                      alt='gmt-master ii thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.modelTitle}>GMT-Master II</div>
          </div>
          <Link href={"/rolex/rolex-categories/gmtmasterii"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* SKY-DWELLER */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/skydweller'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/skydweller/skydweller336935oysterblue/336935skydweller1.JPG`}
                      width={1200}
                      height={1200}
                      alt='skydweller thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.modelTitle}>Sky-Dweller</div>
          </div>
          <Link href={"/rolex/rolex-categories/skydweller"} prefetch={true} className={styles.linkBTN}>
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
                      src={`/watches/rolex/daytona/daytona126509oysterblack/126509daytona1.JPG`}
                      width={1200}
                      height={1200}
                      alt='daytona thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
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
                      src={`/watches/rolex/daydate/daydate228236presidentialolive/228236daydate1.JPG`}
                      width={1200}
                      height={1200}
                      alt='daydate thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
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
                      src={`/watches/rolex/yachtmaster/yachtmaster116680oysterwhite/116680yachtmaster1.JPG`}
                      width={1200}
                      height={1200}
                      alt='yacht master thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.modelTitle}>Yacht-Master</div>
          </div>
          <Link href={"/rolex/rolex-categories/yachtmaster"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

        {/* MILGAUS */}
        <div className={styles.containerItem}>
          <Link href={'/rolex/rolex-categories/milgaus/'} > 
              <div className={styles.imageContainer}>
                  <Image
                      src={`/watches/rolex/milgaus/milgaus116400oysterblack/116400milgaus1.JPG`}
                      width={1200}
                      height={1200}
                      alt='milgaus thumbnail'
                      className={styles.imageCategory}
                      quality={100}
                  />
              </div>
          </Link>
          <div className={styles.contentContainer}>
            <div className={styles.modelTitle}>Milgaus</div>
          </div>
          <Link href={"/rolex/rolex-categories/milgaus/"} prefetch={true} className={styles.linkBTN}>
            <div className={styles.viewBTN}>
              View
            </div>
          </Link>
        </div>

    
      </div>

      
    </div>
  )
}
