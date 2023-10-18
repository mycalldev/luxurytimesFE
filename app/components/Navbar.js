import React from 'react'
import styles from '../_styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className={styles.containerFlex}>
        <div>
            <Image src={'/hamburger.png'} width={32} height={32} alt={'menu bar'} quality={100} />
        </div>

        <div>
            <Link href='/#'className={styles.undreline}>
              <div className={styles.titleMain}> LUXURY TIMES</div> 
            </Link>
        </div>
        
        <div className={styles.contactIcon}>
            <Link href="tel:07976753254">
                <Image src={'/phone_icon.png'} width={32} height={32} alt={'contact button'} quality={100} />
            </Link> 
        </div>
         
    </div>
  )
}
