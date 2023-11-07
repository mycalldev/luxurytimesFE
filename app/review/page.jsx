import Image from 'next/image'
import Link from 'next/link'
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

    const reviews = await getReviews()
    
  return (
    <main className={styles.containerReview}>
        <div>
          <h1 className={styles.titleMain}>REVIEWS</h1>
          <div className={styles.viewDetailsBTNMobile}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.viewDetailsBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07976 753 254</div>
          </div>
          
        </div>
        {reviews.map((review) => (
            
        <div key={review._id}>
            <div className={styles.containerMain}> 
                <div className={styles.containerGrid}>
                    <div className={styles.nameKey}>Name:</div>
                    <div className={styles.nameValue}>{review.name}</div>
                </div>
                <div className={styles.containerGrid}>
                    <div className={styles.dateKey}>Date:</div>
                    <div className={styles.dateValue}>{review.date}</div>
                </div>
            <div className={styles.review}>{review.comment}</div>
            <div className={styles.ratingMainContainer}>
                <div className={styles.rating}>Rating:</div>
                <div>
                {review.rating == 3 &&
                  <div className={styles.ratingGrid}>
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                  </div> 
                }
                {review.rating == 4 &&
                  <div className={styles.ratingGrid}>
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                    <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                  </div> 
                }
                {review.rating == 5 &&
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

