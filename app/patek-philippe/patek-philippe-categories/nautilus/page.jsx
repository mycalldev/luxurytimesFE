import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'

async function getNautilus() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelsNautilus', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Nautilus() {

const watches = await getNautilus()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/nautilusCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Nautilus Hero Banner'
            className={styles.imageCatHero}
            quality={100}
          />
        </div>

        <Link href={'/patek-philippe/patek-philippe-categories'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Patek Philippe Collections'}
          </div>
        </Link>

        <h1 className={styles.titleMain}>NAUTILUS</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Patek Philippe Nautilus is a revered luxury watch collection 
            that epitomizes elegance and style. 
            Introduced in 1976, it was designed by renowned Swiss watch designer 
            Gérald Genta and is celebrated for its distinctive porthole-inspired 
            case shape and integrated bracelet. 
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
                src={`/watches/${watch.brandBackend}/${watch.modelBackend}/${watch.uniqueWatchID}/${watch.modelBackend}1.JPG`}
                width={1200}
                height={1200}
                alt={watch.title}
                className={styles.imageWatch}
                quality={100}
              />
            </div>
            
            <Link href={`/patek-philippe/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN}> 
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
