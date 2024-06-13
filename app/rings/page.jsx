
import Link from 'next/link' 
import Image from 'next/image'
import styles from './rings.module.css'

async function getRings() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/rings', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}

export default async function Rings() {

const rings = await getRings()

    return (
        <main>
            <Link href={'/'} className={styles.backLinkBTN}>
                <div className={styles.backNav}>
                    {'< Home'}
                </div>
            </Link>

        <h1 className={styles.titleMain}>ENGAGEMENT RINGS COLLECTION</h1>

        <div className={styles.contentTopContainer}>
          <p className={styles.catDescription}>
            A Beautiful Collection of Bespoke Gold and Platinum 
            Engagement Rings for the Perfect Moment in Time
          </p>
          
          {/* CTA  */}
          <div className={styles.contactDetailsBTNMobile}>
            <Link href="tel:07718269994" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.contactBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07718 269 994</div>
          </div>
        </div>

        <div className={styles.selectSizeContainer}>
        <label htmlFor="cars">Choose Colour:
          <select
            name="Ring Colour"
            className={styles.selectSize}
            // onChange={(e) => handleSize(e.target.value)}
           
          >
            <option value="Yellow">Yellow</option>
            <option value="White">White</option>
            <option value="Rose">Rose</option>
            

            {/* {product.itemSize.split(",").map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))} */}
          </select>
          </label>
        </div>

        <div className={styles.mainContainer}>
        {rings.map((ring) => (
          <div
            className={styles.productContainer}
            key={ring._id}
          >
            {/* <h2 className={styles.titleRing}>{ring.title}</h2> */}
            <div className={styles.imageContainer}>
              <Link href={`/rings/${ring._id}`} prefetch={true}> 
                <Image
                  src={`/jewellery/rings/${ring.title}${ring.colour}1.jpg`}
                  width={3320}
                  height={2213}
                  alt={ring.title}
                  className={styles.imageRing}
                  quality={100}
                />
              </Link>
            </div>
            
            
            {/* <Link href={`/rolex/all-watches/${ring._id}`} prefetch={true} className={styles.linkBTN}>  */}
              {/* <div className={styles.viewDetailsBTNMobile}>
                  <h4>VIEW</h4>
              </div> */}
            {/* </Link> */}
          </div>
        ))}
      </div>
        </main>
    )
}