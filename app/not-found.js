import Link from 'next/link';
import styles from './page.module.css'

export default function notFound() {
    return (
       <main>
        <h2 className={styles.headerNotFound}>There was a problem</h2>
        <h1 className={styles.big404}>404</h1>
        <p className={styles.textNotFound}>We could not find the page you were looking for.</p>
        <p className={styles.textNotFound}>Return to the</p>
        <div>
        <Link href="/" className={styles.link404} >
            <div className={styles.viewDetailsBTN}>HOME PAGE</div>
        </Link>
      </div>
       </main>
    )
}