'use client'

import { useState } from 'react'
import Link from 'next/link' 
import Image from 'next/image'
import styles from './rings.module.css'

export default function RingsCategoryClient({ rings }){

    const [filteredColour, setFilteredColour] = useState('White')
    const [toggle, setToggle] = useState(false)

    const handleChange = (event) => {
        setFilteredColour(event)
        setToggle(false)
        if (event === 'All') {
            setToggle(true)
        }
    }

    return (
        <main>
            <Link href={'/'} className={styles.backLinkBTN} prefetch={true}>
                <div className={styles.backNav}>
                    {'< Home'}
                </div>
            </Link>

            <Image
              src={`/jewellery/engagement.jpg`}
              width={3320}
              height={2213}
              alt={'hero image of rings'}
              className={styles.imageRingHero}
              quality={100}
            />

            <div className={styles.contentTopContainer}>
            
            <div className={styles.contactBTNDesktop}>
                <h3 className={styles.contactReview}>CONTACT</h3>
                <div>07976 753 254</div>
            </div>
            </div>
            <div className={styles.selectSizeContainer}>
                <label htmlFor="Colour">Select Colour:
                <select
                    name="Ring Colour"
                    className={styles.selectSize}
                    onChange={(e) => handleChange(e.target.value)}
                >
          
                    <option value='White'>White</option>
                    <option value='Yellow'>Yellow</option>
                    <option value='Rose'>Rose</option>

                </select>
                </label>
            </div> 
            <div className={styles.mainContainer}>
        {toggle ? rings.map((ring) => (
          <div
            className={styles.productContainer}
            key={ring._id}
          >
            <div className={styles.imageContainer}>
              <Link href={`/rings/${ring._id}`} prefetch={true}> 
                <Image
                  src={`/jewellery/rings/${ring.title}/${ring.title}${ring.colour}1.jpg`}
                  width={3320}
                  height={2213}
                  alt={ring.title}
                  className={styles.imageRing}
                  quality={100}
                />
              </Link>
            </div>
            <h2 className={styles.titleRing}>{ring.title}</h2>
            
          </div>
        )) : (
            rings.filter(ring => ring.colour == filteredColour).map((ring) => (
            <div 
            key={ring._id}
            >
            <div className={styles.imageContainer}>
            <h2 className={styles.titleRing}>{ring.title}</h2>

              <Link href={`/rings/${ring._id}`} prefetch={true}> 
                <Image
                  src={`/jewellery/rings/${ring.title}/${ring.title}${ring.colour}1.jpg`}
                  width={3320}
                  height={2213}
                  alt={ring.title}
                  className={styles.imageRing}
                  quality={100}
                />
              </Link>
            </div>
            
            </div>
            ))
           )        
        }
      </div>

      {/* CTA  */}
      <div className={styles.contactDetailsBTNMobile}>
        <Link href="tel:07976753254" className={styles.linkBTN} prefetch={true}>CONTACT</Link>
      </div>

      <div className={styles.contactDetailsBTNMobile}>
        <Link
          href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
        >
          WHATSAPP
        </Link>
      </div>
      
    </main>
    )
}