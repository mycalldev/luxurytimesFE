import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'

async function getMilgaus() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelMilgaus', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Milgaus() {

const watches = await getMilgaus()

  return (
    <div>
        <div>
          <Image
            src={"/categoryBanner/banner_milgaus.jpg"}
            width={2181}
            height={621}
            alt='Rolex Milgaus Hero Banner'
            className={styles.imageCatHero}
            quality={100}

          />
        </div>

        <h1 className={styles.titleMain}>Milgaus</h1>

        <Link href={'/rolex/rolex-categories'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
            {'< Rolex Collections'} 
          </div>
        </Link>


        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Rolex Milgaus is a remarkable timepiece designed for professionals in the scientific community. 
            Known for its unique anti-magnetic properties, this watch features a distinctive green sapphire crystal and a bold, 
            sporty design. 
            With its 40mm case and luminescent markers, 
            the Milgaus combines functionality with elegance, 
            making it a favorite among collectors and enthusiasts alike. 
            Its ability to withstand magnetic fields up to 1,000 gauss ensures precision and reliability, 
            solidifying its status as a true icon of innovation in the Rolex lineup.
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
                  width={1200}
                  height={1200}
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

