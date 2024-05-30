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

const skyDwellerImages = [
  "/skydweller326934jubileeblue/326934skydweller1.JPG",
  "/skydweller326934jubileeblue/326934skydweller2.JPG",
  "/skydweller326934jubileeblue/326934skydweller3.JPG",
  "/skydweller326934jubileeblue/326934skydweller4.JPG",
];

export default function SkyDweller() {
  return (
    <div>
      <section className={styles.heroSection}>
        {/* HERO SECTION MOBILE */}
        <div className={styles.heroMobileContainer}>
          <Image
            src={"/sales_hero.jpg"}
            width={1280}
            height={720}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
          />
        </div>

        {/* <Link href={'/'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Home'}
          </div>
        </Link>      */}
        <div className={styles.contentMainHeroContainer}>
        {/* <div className={styles.headlineContentMain}>
          Discover Time Mastery
        </div> */}
        {/* <div className={styles.headlineContentSub}>
          Unleashing The Extrodinary
        </div> */}
      </div>
    </section>
    <h2 className={styles.titleContent}>
        SALE OF THE MONTH
      </h2>
    <section>
      {/* <div className={styles.titleSkyDweller}>Rolex Sky-Dweller</div> */}
      <div className={styles.refSkyDweller}>Reference: 326934</div>

      {/* SWIPER SECTION */}
      <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.swiper}
          >
            <div className={styles.swiperWrapper}>
              {skyDwellerImages.map((item, index) => (
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <Image
                    src={`/landing${item}`}
                    width={1680}
                    height={1120}
                    className={styles.imageSwiper}
                    alt='image of sky dweller'
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
      <div className={styles.contactBTNDesktop}>
        <h3 className={styles.contactReview}>CONTACT</h3>
        <div>07718 269 994</div>
      </div>

    <section>
      <h2 className={styles.titleContent}>
        Sophistication of the Sky-Dweller
      </h2>
    <div className={styles.UlistContainer}>
          <ul className={styles.Ulist}>
            <li className={styles.lItem}>White 18k Gold Bezel</li>
            <li className={styles.lItem}>Jubilee Bracelet</li>
            <li className={styles.lItem}>Dual Time Zone</li>
            <li className={styles.lItem}>Annual Calendar</li>
            <li className={styles.lItem}>GMT Functionality</li> 
            <li className={styles.lItem}>Blue Dial</li>
          </ul>
    </div>

      <Image
            src={"/skydweller_flowers.jpg"}
            width={2048}
            height={1380}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
      />

      <h2 className={styles.titleContent}>
        Quality Service and Best Price of the Month
      </h2>

      <div className={styles.contactBTN}>
          <Link href="tel:07718269994" className={styles.linkBTN}>CONTACT</Link>
     </div>

      <div className={styles.content}>
        One of the many standout features of the Sky-Dweller is its dual time
        zone function, allowing travelers to easily keep track of time in
        two different time zones simultaneously.
      </div>

      <Image
            src={"/strap.jpeg"}
            width={2048}
            height={1380}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
      />

      <div className={styles.content}>
        Powered by Rolex's Caliber 9001 movement, a self-winding
        mechanical movement known for its precision and reliability.
      </div>

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
    
    </section>

    
  </div>
  )
}
