
import styles from './FAQs.module.css'
import Link from 'next/link'

async function getFAQs() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/faqs', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()

    return data
}


export default async function FAQs() {

    const FAQs = await getFAQs()

  return (
    <div>
        <h1 className={styles.titleMain}>FAQs</h1>
        <div className={styles.viewDetailsBTNMobile}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
          </div>
          <div className={styles.viewDetailsBTNDesktop}>
            <h3 className={styles.contactReview}>CONTACT</h3>
            <div>07976 753 254</div>
          </div>
          <h3 className={styles.welcomeTag}>Welcome To Our Frequently Asked Questions Page</h3>
          <p className={styles.faqIntro}>
            Have questions? You're in the right place! 
            We understand that when you're exploring a new service or product, 
            you might have some inquiries. That's why we've created this comprehensive 
            Frequently Asked Questions (FAQ) page to provide you 
            with the information you need.
          </p>
        {FAQs.map((FAQ) => (
            <div key={FAQ._id}>
                <div className={styles.faqsContainer}>
                    <div className={styles.questionGrid}>
                        <div className={styles.titleQuestion}>QUESTION:</div>
                        <div className={styles.question}>{FAQ.question}</div>
                    </div>
                    <div className={styles.questionGrid}>
                        <div className={styles.titleAnswer}>ANSWER:</div>
                        <div className={styles.answer}>{FAQ.answer}</div>
                    </div>
                </div>
            </div>
            
        ))}
    </div>
  )
}
