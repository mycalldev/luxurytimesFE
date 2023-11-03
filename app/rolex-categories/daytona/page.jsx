import Image from "next/image"
import Link from 'next/link'
import styles from '../../styles/SubCategory.module.css'

async function getDaytona() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelDaytona', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Daytona() {

const watches = await getDaytona()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/daytonaCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Rolex Daytona Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <h1 className={styles.titleMain}>DAYTONA</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            Rolex Daytona is a line of luxury watches produced by Rolex, 
            a Swiss watch manufacturer. It was first introduced in 1963 
            and was designed specifically for professional racing drivers. 
            The watch is named after the Daytona International Speedway, 
            a renowned race track in Florida, USA.
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
            
            <Link href={`/watches/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN} >
                <div className={styles.viewDetailsBTN}>
                    <h4>VIEW</h4>
                </div>
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}

