import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './sell.module.css'
import Button from '../components/Button'

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

        <Link href={'/'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Home'}
          </div>
        </Link>
        <div className={styles.container}>
            <div className={styles.titleMain}>
               The 3 Easy Steps to Selling Your Watch....
            </div>

            <Button href="tel:07714611699" desktopText="07714611699">
              CONTACT US
            </Button>


            <div className={styles.whatsappBtn}>
                <Button href="https://wa.me/447714611699?text=Hi%20Luxury%20Times....">
                  WHATSAPP
                </Button>
            </div>

            <div className={styles.contentNumberGrid}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>1</div>
                </div>
                <div className={styles.contentNumer}>Contact Luxury Times Ltd direct, letting us know the details of your watch for an instant quote.</div>
            </div>

            <div className={styles.contentNumberGrid}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>2</div>
                </div>
                <div className={styles.contentNumer}>Book an appointment for a free consultation at our showroom.</div>
            </div>

            <div className={styles.contentNumberGrid}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>3</div>
                </div>
                <div className={styles.contentNumer}>Setup a video call to discuss and receive a real-time evaluation....</div>
            </div>

            <div className={styles.titleSub}>The Process:</div>

            <div className={styles.contentExtra}>
                At Luxury Times Ltd, we streamline the process of selling your watch to ensure 
                convenience 
                and efficiency. When you decide to sell your watch, 
                simply inform us of the details about your timepiece, including its make, 
                model, and condition. 
            </div>

            <div className={styles.containerImage}>
                <Image src={'/world_of_watches.png'} 
                    width={1456} 
                    height={816} 
                    className={styles.imageHero}
                    alt='sell hero image' 
                    quality={100} 
                />
            </div>

            <div className={styles.contentExtra}>
                Once we receive your information, our team of experts will promptly assess your watch&apos;s 
                value based on current market trends and its condition.
            </div>
            <div className={styles.contentExtra}>
                We will then provide you with a competitive offer. 
                If you accept, you can either ship your watch to us or visit or office for an in-person appraisal. 
            </div>
            <div className={styles.contentExtra}>
                Upon verification of the watch's authenticity and condition, 
                we'll promptly issue payment, ensuring a smooth transaction for you.
            </div>

           <div className={styles.containerImage}>
                <Image src={'/sell_filler_image.jpg'} 
                    width={1456} 
                    height={816} 
                    className={styles.imageHero}
                    alt='sell hero image' 
                    quality={100} 
                />
            </div>

            <div className={styles.contentExtraThick}>Luxury Times Ltd is a Family owned watch dealership that specialises in  the world of horology.</div>
        </div>
    </main>
  )
}
