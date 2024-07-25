'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from '../Landing.module.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const pandaImages = [
  "panda1.jpg",
  "panda2.jpg",
  "panda3.jpg",
  "panda6.jpg",
  "panda7.jpg",
  "panda8.jpg",
  "panda9.jpg",
  "panda10.jpg",
];


export default function Daytona() {
  return (
    <div>
      <section className={styles.heroSection}>
        {/* HERO SECTION MOBILE */}
        <div className={styles.heroMobileContainer}>
          <Image
            src={"/panda_daytona/panda_hero.jpg"}
            width={1696}
            height={954}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
          />
        </div>

        <div className={styles.modelRefContainer}>
            <div className={styles.model}>2024 MODEL</div>
            <div className={styles.ref}>Reference: 126500LN</div>
        </div>
      </section>
    
      <section>
        <div className={styles.titleContentBackground}>
          <h2 className={styles.titleContentTop}>
              1 in Stock! 2024 Model
          </h2>
        </div>

        {/* SWIPER SECTION */}
        <Swiper
              pagination={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className={styles.swiper}
            >
              <div className={styles.swiperWrapper}>
                {pandaImages.map((item, index) => (
                  <SwiperSlide className={styles.swiperSlide} key={index}>
                    <Image
                      src={`/panda_daytona/${item}`}
                      width={1660}
                      height={1106.5}
                      className={styles.imageSwiper}
                      alt='image of panda daytona'
                      quality={100}
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
      </section>

      <h2 className={styles.inStoreTitle}>
          In Store Today
      </h2>

      <h2 className={styles.titleContent}>
        Free Expert Advice
      </h2>
      <div className={styles.contactBTN}>
            <Link href="tel:07718269994" className={styles.linkBTN}>CONTACT</Link>
      </div>
      <div className={styles.contactBTN}>
        <Link
          href={"https://wa.me/447718269994?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
        >
          WHATSAPP
        </Link>
      </div>

      <section>
        <div className={styles.UlistContainer}>
          <ul className={styles.Ulist}>
            <li className={styles.lItem}>NEW 2024 Edition</li>
            <li className={styles.lItem}>Updated Movement</li>
            <li className={styles.lItem}>Updated Dial</li>
            <li className={styles.lItem}>Updated Bezel/ Oyster Steel Ring</li>
            <li className={styles.lItem}>Chromalight Number Markers</li>
            <li className={styles.lItem}>Symetrical Lugs</li>
            <li className={styles.lItem}>Easy Link Adjustment with Thermal Expansion Half Link</li>
            <li className={styles.lItem}>72 Hours Power Reserve</li>
            <li className={styles.lItem}>Oyster Steel Bracelet</li>
          </ul>
        </div>
      </section>

      <section>
        <Image
          src={"/panda_daytona/panda_tachy.jpg"}
          width={1660}
          height={1106.5}
          quality={100}
          alt='image of daytona'
          className={styles.imageHeroMobile}
        />

        <h2 className={styles.titleContentPower}>
          The Patented Black Cerachrom Bezel with Tachymetric Scale....
        </h2>

        <div className={styles.content}>
          A key part of the Cosmograph Daytona's identity, the tachymetric scale is a graduation that allows average speeds of up to 400 kilometres or miles per hour to be determined via a central sweep seconds hand. 
          The calculation is performed over a fixed distance of 1 kilometre or 1 mile.
        </div>

        <div className={styles.contactBTNenquire}>
          <Link
            href={"https://wa.me/447718269994?text=Hi%20Luxury%20Times...."} 
            className={styles.linkBTN}
          >
            ENQUIRE TODAY
          </Link>
        </div>

        <div className={styles.content}>
          The tachymeter bezel's primary function is to measure average speeds per hour while traveling over a fixed distance. This was a feature initially developed by 
          Rolex in a bid to become the official watch of NASA, hence its original name “Cosmograph.”
        </div>

        <div className={styles.titleContentBackground}>
          <h2 className={styles.titleContentTop}>
            The World's Most Recognisable Luxury Chronograph
          </h2>
        </div>

        <Image
          src={"/panda_daytona/panda_filler.jpg"}
          width={1660}
          height={1106.5}
          quality={100}
          alt='image of daytona filler'
          className={styles.imageHeroMobile}
        />

        <h2 className={styles.titleContent}>
          Quality Service and Best Price of the Month
        </h2>

        <div className={styles.contactBTN}>
            <Link href="tel:07718269994" className={styles.linkBTN}>CONTACT</Link>
        </div>

        <div className={styles.content}>
          The Rolex Daytona 126500LN is a distinguished model in the Rolex Daytona line, 
          named after a Florida city which became popular with motor racing enthusiasts at the turn of the last century. 
        </div>

        <Image
          src={"/panda_daytona/panda_strap.jpg"}
          width={1660}
          height={1106.5}
          quality={100}
          alt='image of daytona strap'
          className={styles.imageHeroMobile}
        />

        <div className={styles.content}>
          Daytona became the world capital of speed, in the 1950s Rolex introduced their first manual winding chronograph model 6234 featuring a tachometer/telemeter scale to 
          measure time over distance considered by many as the first Daytona ever made. 
        </div>

        <Image
          src={"/panda_daytona/panda_filler2.jpg"}
          width={1660}
          height={1106.5}
          quality={100}
          alt='image of daytona dial'
          className={styles.imageHeroMobile}
        />

        <div className={styles.content}>
          Powered by Rolex's Caliber 4131 movement, a self-winding
          mechanical movement with a Chronenergy escapement offering greater efficiency and dependability....
        </div>
      </section> 

      <section>
        <h2 className={styles.titleReviews}>
          5 Star Reviews
        </h2>
      
        <div className={styles.reviewContainer}>
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
        </div>
     
        <div className={styles.expertBTN}>
            <Link href="tel:07718269994" className={styles.linkBTN}>EXPERT ADVICE</Link>
        </div>

        <h2 className={styles.titleContentPower}>
          Book Your Appointment Today....
        </h2>
        <div className={styles.contactBTNenquire}>
          <Link
          href={"https://wa.me/447718269994?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
          >
            WHATSAPP
          </Link>
        </div>
      </section>

    </div>
  )
}
