
import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/SubCategory.module.css'

async function getDayDate() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelDayDate', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function DayDate() {

const watches = await getDayDate()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/daydateCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Rolex DayDate Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <h1 className={styles.titleMain}>DAYDATE</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Rolex Day-Date, the ultimate luxury watch. 
            Available with Oyster and Jubilee bracelets, 
            this watch exudes sophistication and prestige. 
            Highly sought-after by watch enthusiasts and collectors, 
            the Day-Date is a true icon of the Rolex brand.
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
            
            <Link href={`/watches/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN}> 
              <div className={styles.viewDetailsBTN}>
                  <h4>View</h4>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}