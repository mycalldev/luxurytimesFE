import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'


async function getYachtMaster() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelYachtMaster', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}

export default async function YachtMaster() {

const watches = await getYachtMaster()

  return (

    <div>
        <div>
          <Image
            src={"/categoryBanner/yachtmasterCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Rolex Yacht Master Hero Banner'
            className={styles.imageCatHero}
            quality={100}
          />
        </div>

        <h1 className={styles.titleMain}>YACHT-MASTER</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
          The Rolex Yacht-Master is a prestigious and highly regarded 
          luxury wristwatch collection designed for those with a passion 
          for sailing and maritime pursuits. Known for its elegant and sporty design, 
          the Yacht-Master series offersexceptional craftsmanship 
          and precision that Rolex is renowned for.
          </p>
          
          {/* CTA  */}
          <div className={styles.viewDetailsBTN}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.contactBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07976 753 254</div>
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
        
        <Link href={`/rolex/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN}> 
        <div className={styles.viewDetailsBTNMobile}>
            <h4>VIEW</h4>
        </div>
        </Link>
      </div>
    ))}
  </main></div>
  )
}
