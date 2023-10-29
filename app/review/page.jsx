import Image from 'next/image'
import styles from './Reviews.module.css'

async function getReviews() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/reviews', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Reviews() {

    const FAQs = await getReviews()
    
  return (
    <main>
        <div>
            <h1 className={styles.titleMain}>REVIEWS</h1>
        </div>
        {FAQs.map((FAQ) => (
            
            <div key={FAQ._id}>
        <div className={styles.containerMain}>
                
                <div className={styles.containerGrid}>
                    <div className={styles.nameKey}>Name:</div>
                    <div className={styles.nameValue}>{FAQ.name}</div>
                </div>
                <div className={styles.containerGrid}>
                    <div className={styles.dateKey}>Date:</div>
                    <div className={styles.dateValue}>{FAQ.date}</div>
                </div>
            
            
            <div className={styles.review}>{FAQ.comment}</div>

            <div className={styles.ratingMainContainer}>
                <div className={styles.rating}>Rating:</div>

                <div>
                {FAQ.rating == 3 &&
                  <div className={styles.ratingGrid}>
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                  </div> 
                }
                {FAQ.rating == 4 &&
                  <div className={styles.ratingGrid}>
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                  </div> 
                }
                {FAQ.rating == 5 &&
                   <div className={styles.ratingGrid}>
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                   </div>
                }
                </div>
              </div>
            </div>
          </div>
        ))}
    </main>
  )
}

