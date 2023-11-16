import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'

async function getGrandcomplication() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelGrandcomplication', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Grandcomplication() {

const watches = await getGrandcomplication()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/grandcomplicationCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Grandcomplication Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <Link href={'/patek-philippe/patek-philippe-categories'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Patek Philippe Collections'}
          </div>
        </Link>

        <h1 className={styles.titleMain}>GRAND COMPLICATION</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Patek Philippe Grand Complication is the pinnacle of watchmaking artistry 
            and technical achievement. These timepieces represent the epitome of luxury 
            and craftsmanship, featuring an array of intricate complications that go far 
            beyond basic timekeeping.
          </p>
          
          {/* CTA  */}
          <div className={styles.contactDetailsBTNMobile}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.contactBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07976 753 254</div>
          </div>
        </div>

        <main className={styles.mainContainer}>
        {watches.map((watch, index) => (
          <div
            className={styles.productContainer}
            key={index}
          >
            <h2 className={styles.titleWatch}>{watch.title}</h2>
            <div className={styles.imageContainer}>
              <Image
                src={`/watches/${watch.brandBackend}/${watch.modelBackend}/${watch.uniqueWatchID}/${watch.modelBackend}${
                  index + 1
                }.JPG`}
                width={840}
                height={560}
                alt={watch.title}
                className={styles.imageWatch}
                quality={100}
              />
            </div>
            
            <Link href={`/patek-philippe/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN}> 
            <div className={styles.viewDetailsBTN}>
                <h4>VIEW</h4>
            </div>
            </Link>
          </div>
        ))}
      </main>
      <div className={styles.arrivingSoonBTN}>
        <h4>ARRIVING SOON</h4>
      </div>
    </div>
  )
}
