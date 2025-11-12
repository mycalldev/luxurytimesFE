import Image from 'next/image'
import Link from 'next/link'
import styles from './BrandCard.module.css'

export default function BrandCard({ 
  image, 
  title, 
  href, 
  width = 3272.5, 
  height = 2181.5,
  altText 
}) {
  return (
    <div className={styles.cardContainer}>
      <Link href={href} prefetch={true} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <Image 
            src={image} 
            className={styles.cardImage} 
            width={width} 
            height={height} 
            alt={altText || `${title} watches`} 
            quality={100}  
          />
          <div className={styles.overlay}>
            <h2 className={styles.brandTitle}>{title}</h2>
          </div>
        </div>
        {/* <div className={styles.ctaButton}>
          <span>View Collection</span>
        </div> */}
      </Link>
    </div>
  )
}

