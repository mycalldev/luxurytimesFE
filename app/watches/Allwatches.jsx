import Image from "next/image"
import styles from './Allwatches.module.css'

async function getWatches() {
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watches', {
        next: {
            revalidate: 30
        }
    })

    return res.json()
}

export default  async function Allwatches() {

  const watches = await getWatches()
  return (
    <>
    {watches.map((watch) => (
        <div key={watch._id}>
            <div className={styles.titleWatch}>{watch.title}</div>
            
            <div>
              <Image
                src={`/watches/${watch.model}/${watch.model}${watch.ref}${watch.strap}${watch.dial}/${watch.ref}${watch.model}1.JPG`}
                width={840}
                height={560}
                alt={watch.title}
                className={styles.imageWatch}
                quality={100}
              />
            </div>
        </div>
        
    ))}
    </>
  )
}
