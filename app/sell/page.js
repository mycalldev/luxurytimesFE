import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './sell.module.css'

export default function Sell() {
  return (
    <main>
        <div>
            <Image src={'/sell_hero.jpeg'} 
                width={2880} 
                height={1200} 
                className={styles.imageHero}
                alt='sell hero image' 
                quality={100} 
            />
        </div>
        <div className={styles.container}>
            <div className={styles.titleMain}>
                3 Easy Steps to Selling Your Watch....
            </div>

            <div className={styles.contactBTNContainer}>
                <Image src={"/call.png"} width={25} height={25} alt={'phone icon'} quality={100} /> 
                <Link href="tel:07976753254" className={styles.linkBTN}>Contact</Link>
            </div>

            <div className={styles.contentNumberGrid}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>1</div>
                </div>
                <div className={styles.contentNumer}>Contact Luxury Times Direct By Phone</div>
            </div>

            <div className={styles.contentNumberGrid}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>2</div>
                </div>
                <div className={styles.contentNumer}>Book a FREE no Obligation Consultation at our Showroom</div>
            </div>

            <div className={styles.contentNumberGrid}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>3</div>
                </div>
                <div className={styles.contentNumer}>Setup a Video Call to Discuss and Receive a Real-Time Evaluation....</div>
            </div>
            <div className={styles.linkEvaluation}>
                <Link href={'/'}>Find out More About our Evaluations</Link>
            </div>

            <div>
            <Image src={'/world_of_watches.png'} 
                width={1456} 
                height={816} 
                className={styles.imageHero}
                alt='sell hero image' 
                quality={100} 
            />
        </div>

            

            <div className={styles.contentExtra}>Luxury Times Ltd is a Family owned watch dealership that specialises in  the world of horology.</div>
        </div>
    </main>
  )
}
