import Image from "next/image"
import Link from 'next/link'
import styles from '../SubCategory.module.css'


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
    <div><main className={styles.mainContainer}>
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
        
        <Link href={`/watches/all-watches/${watch._id}`} className={styles.viewBTNContainer}> 
        <div className={styles.viewDetailsBTN}>
            <h4>VIEW</h4>
        </div>
        </Link>
      </div>
    ))}
  </main></div>
  )
}
