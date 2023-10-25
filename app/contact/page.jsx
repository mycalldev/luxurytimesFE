import React from 'react'
import Link from 'next/link'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <div>
      {/* <Meta /> */}
      <div>
        <h1 className={styles.headerTitle}>LUXURY TIMES CONTACT</h1>
      </div>

      {/* BTN */}
      <div className={styles.heroBtn}>
        <Link href="tel:07976753254" className={styles.linkBTN}>CALL NOW</Link>
      </div>
      <div className={styles.heroBtn}>
        <Link
          href={"https://wa.me/447976753254?text=Welcome%20to%20RobDiamond"} 
          className={styles.linkBTN}
        >
          WHATSAPP
        </Link>
      </div>
      <div className={styles.heroBtnDesktop}>07976753254</div>
    </div>
  )
}
