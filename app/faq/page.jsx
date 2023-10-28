
import styles from './FAQs.module.css'

async function getFAQs() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/faq/', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function FAQs() {

    // const FAQs = await getFAQs()
  return (
    <div>
        <h1 className={styles.titleMain}>THIS IS THE FAQs PAGE</h1>
    </div>
  )
}
