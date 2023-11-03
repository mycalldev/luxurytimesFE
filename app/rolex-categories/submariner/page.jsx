import Image from "next/image"
import Link from 'next/link'
import styles from '../../styles/SubCategory.module.css'


async function getSubmariner() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelSubmariner', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}

export default async function Submariner() {

const watches = await getSubmariner()

  return (

    <div>

        <div>
          <Image
            src={"/categoryBanner/submarinerCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Rolex Submariner Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <h1 className={styles.titleMain}>SUBMARINER</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            Discover the iconic Rolex Submariner, the quintessential dive watch
            designed for adventurers. Available only in Oyster Steel bracelet,
            this watch is a timeless masterpiece. Highly popular among watch
            enthusiasts and collectors, the Submariner is a symbol of style and
            precision.
          </p>
          
          {/* CTA  */}
          <div className={styles.viewDetailsBTN}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
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
          <Image
            src={`/watches/${watch.brand}/${watch.model}/${watch.model}${watch.ref}${watch.strap}${watch.dial}/${watch.ref}${watch.model}1.JPG`}
            width={840}
            height={560}
            alt={watch.title}
            className={styles.imageWatch}
            quality={100}
          />
        </div>
        
        <Link href={`/watches/all-watches/${watch._id}`} prefetch={true} className={styles.viewBTNContainer}> 
        <div className={styles.viewDetailsBTN}>
            <h4>VIEW</h4>
        </div>
        </Link>
      </div>
    ))}
  </main></div>
  )
}
