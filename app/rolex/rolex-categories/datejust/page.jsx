import Image from "next/image"
import Link from 'next/link'
import styles from '../../../styles/SubCategory.module.css'

async function getDatejust() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watchesModelDateJust', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function DateJust() {

const watches = await getDatejust()

  return (
    
    <div>
        <div>
          <Image
            src={"/categoryBanner/datejustCatBanner.JPG"}
            width={2181}
            height={591}
            alt='Rolex DateJust Hero Banner'
            className={styles.imageCatHero}
            quality={100}
          />
        </div>

      <Link href={'/rolex/rolex-categories'} className={styles.backLinkBTN} prefetch={true}>
        <div className={styles.backNav}>
            {'< Rolex Collections'}
        </div>
      </Link>

        <h1 className={styles.titleMain}>DATEJUST</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            The Rolex Datejust 41mm, a timeless classic that blends elegance with
            functionality. An exceptional watch that never goes out of style.
            Available with both Oyster and Jubilee bracelets and renowned for its
            popularity among watch enthusiasts and collectors.
          </p>
          
          {/* CTA  */}
          <div className={styles.contactDetailsBTNMobile}>
            <Link href="tel:07714611699" className={styles.linkBTN} prefetch={true}>CONTACT</Link>
          </div>
          <div className={styles.contactBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07714 611 699</div>
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
            
            
            <Link href={`/rolex/all-watches/${watch._id}`} prefetch={true} className={styles.linkBTN}> 
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
