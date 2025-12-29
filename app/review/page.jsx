import Image from 'next/image'
import Link from 'next/link'
import styles from './Reviews.module.css'
import Button from '../components/Button'

const reviews = [
  {
    id: 1,
    name: 'James Mitchell',
    date: 'March 15, 2025',
    rating: 5,
    comment: 'Exceptional service from start to finish. I purchased a Rolex Submariner and the team at Luxury Times made the entire process seamless. Their expertise and attention to detail is unmatched. Highly recommend!'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    date: 'February 8, 2025',
    rating: 5,
    comment: 'I sold my Patek Philippe through Luxury Times and received a fair, transparent valuation. The transaction was smooth and professional. They truly understand the value of luxury timepieces.'
  },
  {
    id: 3,
    name: 'Robert Thompson',
    date: 'January 22, 2025',
    rating: 5,
    comment: 'Outstanding experience buying my first luxury watch. The staff took time to explain everything and helped me find the perfect piece. The authentication process gave me complete confidence in my purchase.'
  },
  {
    id: 4,
    name: 'Emma Williams',
    date: 'December 10, 2024',
    rating: 5,
    comment: 'Family-run business with genuine care for their customers. I bought an engagement ring and the personal attention I received was incredible. They went above and beyond to ensure I was happy with my choice.'
  },
  {
    id: 5,
    name: 'Michael Anderson',
    date: 'November 3, 2024',
    rating: 5,
    comment: '25 years of experience really shows. I\'ve bought multiple watches from Luxury Times and each time the service is impeccable. Competitive pricing and honest advice every single time.'
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    date: 'September 18, 2024',
    rating: 5,
    comment: 'Sold my vintage Rolex Daytona and was pleasantly surprised by the fair offer. No pressure, no hidden fees - just honest, professional service. Will definitely return for future purchases.'
  },
  {
    id: 7,
    name: 'David Brown',
    date: 'August 5, 2024',
    rating: 5,
    comment: 'The team\'s knowledge of luxury watches is impressive. They helped me understand the provenance and history of the piece I was interested in. A truly educational and enjoyable experience.'
  },
  {
    id: 8,
    name: 'Sophie Taylor',
    date: 'June 20, 2024',
    rating: 5,
    comment: 'Fast, secure transaction when I purchased my Audemars Piguet. The watch was exactly as described and the authentication process was thorough. Peace of mind when spending this amount of money.'
  },
  {
    id: 9,
    name: 'Christopher Lee',
    date: 'April 12, 2024',
    rating: 5,
    comment: 'Excellent communication throughout the entire process. I had many questions and they answered each one patiently. The quality assurance is top-notch - every watch is meticulously inspected.'
  },
  {
    id: 10,
    name: 'Isabella Garcia',
    date: 'February 28, 2024',
    rating: 5,
    comment: 'Bought a beautiful diamond ring for my anniversary. The quality is exceptional and the price was very competitive. The family-run aspect really shows in the personal service you receive.'
  },
  {
    id: 11,
    name: 'Thomas Wilson',
    date: 'December 15, 2023',
    rating: 5,
    comment: 'Outstanding collection of luxury timepieces. Found a rare Patek Philippe that I\'d been searching for. The expertise and guidance made this a memorable purchase. Highly professional team.'
  },
  {
    id: 12,
    name: 'Charlotte Davis',
    date: 'October 7, 2023',
    rating: 5,
    comment: 'Sold my collection of watches and received excellent valuations. The process was transparent and straightforward. Luxury Times is now my go-to for all luxury watch transactions.'
  },
  {
    id: 13,
    name: 'Daniel Moore',
    date: 'July 22, 2023',
    rating: 5,
    comment: 'The best luxury watch dealer I\'ve worked with. Their knowledge of the market is extensive and their prices are fair. The authentication process gives you complete confidence in your purchase.'
  },
  {
    id: 14,
    name: 'Amelia White',
    date: 'May 10, 2023',
    rating: 5,
    comment: 'Incredible service when buying my Rolex Sky-Dweller. The team explained all the features and helped me understand the watch\'s complications. No question was too small - truly exceptional customer care.'
  },
  {
    id: 15,
    name: 'Alexander Harris',
    date: 'March 3, 2023',
    rating: 5,
    comment: 'Family-run business with genuine expertise. I\'ve been a customer for years and the service never disappoints. They understand the value of building long-term relationships with their clients.'
  },
  {
    id: 16,
    name: 'Grace Johnson',
    date: 'January 18, 2023',
    rating: 5,
    comment: 'Bought a stunning engagement ring and the attention to detail was remarkable. They took time to understand what I was looking for and found the perfect piece. Highly recommend for jewellery purchases.'
  },
  {
    id: 17,
    name: 'Benjamin Clark',
    date: 'November 25, 2022',
    rating: 5,
    comment: 'Excellent experience selling my vintage watch collection. Received fair, competitive offers and the transaction was completed quickly and securely. Professional service from start to finish.'
  },
  {
    id: 18,
    name: 'Victoria Lewis',
    date: 'September 12, 2022',
    rating: 5,
    comment: 'The quality assurance process is thorough - every piece is carefully inspected. I purchased a pre-owned Rolex and it was in perfect condition. The transparency and honesty is refreshing.'
  }
]

function renderStars(rating) {
  return (
    <div className={styles.starsContainer}>
      {[...Array(5)].map((_, index) => (
        <Image 
          key={index}
          src={'/star.png'} 
          width={20} 
          height={20} 
          className={`${styles.star} ${index < rating ? styles.starFilled : styles.starEmpty}`}
          alt='star rating' 
          quality={100} 
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <main className={styles.containerReview}>
      <div className={styles.headerSection}>
        <Link href={'/'} className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>Home</span>
        </Link>
        <h1 className={styles.titleMain}>Customer Reviews</h1>
        <div className={styles.contactSection}>
          <div className={styles.contactMobile}>
            <Button href="tel:07714611699" desktopText="07714611699">
              CONTACT
            </Button>
          </div>
          <div className={styles.contactDesktop}>
            <h3 className={styles.contactTitle}>Contact Us</h3>
            <a href="tel:07714611699" className={styles.phoneNumber}>07714 611 699</a>
          </div>
        </div>
      </div>

      <div className={styles.reviewsGrid}>
        {reviews.map((review) => (
          <article key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerInfo}>
                <h3 className={styles.reviewerName}>{review.name}</h3>
                <time className={styles.reviewDate} dateTime={review.date}>
                  {review.date}
                </time>
              </div>
              <div className={styles.ratingSection}>
                {renderStars(review.rating)}
              </div>
            </div>
            <p className={styles.reviewText}>{review.comment}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

