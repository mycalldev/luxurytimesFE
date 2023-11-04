'use client'

import React, {useState} from 'react'
import Image from 'next/image'
import styles from './BurgerMenu.module.css'


export default function BurgerMenu() {

const [toggle, setToggle] = useState(false)

const handleToggle = () => {
    setToggle(!toggle)
}
  return (
    <div>
      <div className={styles.imageBurger} onClick={() => handleToggle()}>
        <Image
        src={'/hamburger.png'}
        width={32}
        height={32}
        alt={'menu bar'}
        quality={100}
        />
      </div>
      
      <nav className={toggle ? styles.navOpen : styles.none}>

      </nav>
    </div>
  )
}
