
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
