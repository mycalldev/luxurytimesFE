'use client'

import { useState } from 'react'
import Link from 'next/link' 
import Image from 'next/image'
import styles from './rings.module.css'

export default function RingsCategoryClient({ rings }){

    const [filteredColour, setFilteredColour] = useState('')
    const [toggle, setToggle] = useState(true)

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

            <h1 className={styles.titleMain}>ENGAGEMENT RINGS COLLECTION</h1>

            <div className={styles.contentTopContainer}>
            <p className={styles.catDescription}>
                A Beautiful Collection of Bespoke Gold and Platinum 
                Engagement Rings for the Perfect Moment in Time
            </p>
            
            {/* CTA  */}
            <div className={styles.contactDetailsBTNMobile}>
                <Link href="tel:07718269994" className={styles.linkBTN} prefetch={true}>CONTACT</Link>
            </div>
            <div className={styles.contactBTNDesktop}>
                <h3 className={styles.contactReview}>CONTACT</h3>
                <div>07718 269 994</div>
            </div>
            </div>
            <div className={styles.selectSizeContainer}>
                <label htmlFor="Colour">Colour:
                <select
                    name="Ring Colour"
                    className={styles.selectSize}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <option value='All'>All</option>
                    <option value='Yellow'>Yellow</option>
                    <option value='Rose'>Rose</option>
                    <option value='White'>White</option>

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
                  src={`/jewellery/rings/${ring.title}${ring.colour}1.jpg`}
                  width={3320}
                  height={2213}
                  alt={ring.title}
                  className={styles.imageRing}
                  quality={100}
                />
              </Link>
            </div>
            <h2 className={styles.titleRing}>{ring.title}</h2>
            
            {/* <Link href={`/rolex/all-watches/${ring._id}`} prefetch={true} className={styles.linkBTN}>  */}
              {/* <div className={styles.viewDetailsBTNMobile}>
                  <h4>VIEW</h4>
              </div> */}
            {/* </Link> */}
          </div>
        )) : (
            rings.filter(ring => ring.colour == filteredColour).map((ring) => (
            <div 
            key={ring._id}
            >
            <div className={styles.imageContainer}>
              <Link href={`/rings/${ring._id}`} prefetch={true}> 
                <Image
                  src={`/jewellery/rings/${ring.title}${ring.colour}1.jpg`}
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
            ))
           )        
        }
      </div>
    </main>
    )
}