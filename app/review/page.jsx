import styles from './Reviews.module.css'

async function getReviews() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/reviews/', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}


export default async function Reviews() {

    // const FAQs = await getReviews()
  return (
    <div>
        <h1 className={styles.titleMain}>THIS IS THE REVIEWS PAGE</h1>
    </div>
  )
}

