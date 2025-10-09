import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'

async function getRoyaloak() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelRoyaloak', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Royaloak() {

const watches = await getRoyaloak()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/royaloakCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Royaloak Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <Link href={'/audemars-piguet/audemars-piguet-categories'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Audemars Piguet Collections'}
          </div>
        </Link>

        <h1 className={styles.titleMain}>ROYAL OAK</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Audemars Piguet Royal Oak is a legendary luxury 
            watch that has become an icon in the world of horology. 
            Designed by the renowned Swiss watch designer Gérald Genta in 1972, 
            the Royal Oak is celebrated for its 
            distinctive and revolutionary octagonal case shape, 
            integrated bracelet, and intricate detailing.
          </p>
          
          {/* CTA  */}
          <div className={styles.contactDetailsBTNMobile}>
            <Link href="tel:07714611699" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.contactBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07714 611 699</div>
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
            
            <Link href={`/audemars-piguet/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN}> 
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
