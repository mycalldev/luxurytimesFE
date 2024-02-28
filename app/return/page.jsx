import Link from 'next/link';
import styles from './Return.module.css';

export default function Return() {
  return (
    <main>
       
        <Link href={'/'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Home'}
          </div>
        </Link>
        <div className={styles.titleReturns}>
        <h1>Returns Policy</h1>
      </div>
      <div className={styles.container}>
      For Non-Faulty Items: We want you to be fully satisfied with your purchase, so we offer a 14-day return policy for non-faulty items. If you are not satisfied with your purchase, you may return the item for a full refund, excluding shipping costs. The item must be in its original condition, with all the accessories and packaging, and not worn or altered in any way. Please contact us to initiate the return process.

      For Faulty Items: If you receive a faulty item, please contact us immediately. We will assess the issue and determine the best course of action. In most cases, we will offer a full refund or a replacement item. We will also cover the cost of shipping for the return of the faulty item.
      </div>
    </main>
  )
}
