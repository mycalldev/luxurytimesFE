import Image from "next/image"
import Link from 'next/link'
import styles from './Allwatches.module.css'


async function getWatches() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/patek-philippe-watches', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}

export default async function Allwatches() {
  
  const watches = await getWatches()
  
  return (
    <>
    <div className={styles.titleHeader}>ALL WATCHES</div>
    {watches.map((watch) => (
        <div key={watch._id}>
          
          <Link href={`/patek-philippe/all-watches/${watch._id}`} >
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
          </Link>
          <div className={styles.titleBrand}>{watch.brand}</div>
          <div className={styles.titleWatch}>
            {watch.title}
          </div>
          <Link href={`/patek-philippe/all-watches/${watch._id}`} className={styles.viewBTNContainer}> 
            <div className={styles.viewDetailsBTN}>
                <h4>VIEW</h4>
            </div>
         </Link>
        </div>
    ))}
    </>
  )
}
