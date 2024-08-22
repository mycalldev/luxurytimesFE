import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'

async function getGmtMasterII() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelGMT-MasterII', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function GMTMasterII() {

const watches = await getGmtMasterII()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/gmtMasterIICatBanner.JPG"}
            width={2181}
            height={591}
            alt='Rolex GMT-Master II Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <h1 className={styles.titleMain}>GMT-MASTER II</h1>

        <Link href={'/rolex/rolex-categories'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
            {'< Rolex Collections'} 
          </div>
        </Link>


        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Rolex GMT-Master II 42mm. With Oyster and Jubilee bracelets available, 
            this watch is a perfect blend of luxury and functionality. 
            Highly sought-after by watch enthusiasts and collectors, 
            the GMT-Master II 45mm is a true icon of the Rolex brand.
          </p>
          
          {/* CTA  */}
          <div className={styles.contactDetailsBTNMobile}>
            <Link href="tel:07718 269 994" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.contactBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07718 269 994</div>
          </div>
        </div>

        <main className={styles.mainContainer}>
        {watches.map((watch) => (
          <div
            className={styles.productContainer}
            key={watch._id}
          >
            <h2 className={styles.titleWatch}>{watch.title}</h2>
            <div className={styles.imageContainer}>
              <Link href={`/rolex/all-watches/${watch._id}`} prefetch={true}>
                <Image
                  src={`/watches/${watch.brand}/${watch.model}/${watch.model}${watch.ref}${watch.strap}${watch.dial}/${watch.ref}${watch.model}1.JPG`}
                  width={840}
                  height={560}
                  alt={watch.title}
                  className={styles.imageWatch}
                  quality={100}
                />
              </Link>
            </div>
            
            <Link href={`/rolex/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN} >
                <div className={styles.viewDetailsBTNMobile}>
                    <h4>VIEW</h4>
                </div>
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}

