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

const submarinerImages = [
  "/submariner126610LN/sub1.jpg",
  "/submariner126610LN/sub3.jpg",
  "/submariner126610LN/sub2.jpg",
  "/submariner126610LN/sub4.jpg",
];

export default function Submariner() {
  return (
    <div>
      <section className={styles.heroSection}>
        {/* HERO SECTION MOBILE */}
        <div className={styles.heroMobileContainer}>
          <Image
            src={"/landing/submariner126610LN/sub_hero_image.jpg"}
            width={1400}
            height={750}
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
    <h2 className={styles.titleContentSub}>
        SALE OF THE MONTH
      </h2>
    <section>
      {/* <div className={styles.titleSkyDweller}>Rolex Sky-Dweller</div> */}
      <div className={styles.refSkyDweller}>Reference: 126610LN</div>

      {/* SWIPER SECTION */}
      <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.swiper}
          >
            <div className={styles.swiperWrapper}>
              {submarinerImages.map((item, index) => (
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
      {/* <div className={styles.contactBTNDesktop}>
        <h3 className={styles.contactReview}>CONTACT</h3>
        <div>07718 269 994</div>
      </div> */}

    <section>
      <h2 className={styles.titleContent}>
        Sophistication of the Submariner
      </h2>
    <div className={styles.UlistContainer}>
          <ul className={styles.Ulist}>
            <li className={styles.lItem}>NEW REFERENCE 41mm</li>
            <li className={styles.lItem}>Water Resistant up to 1000 feet</li>
            <li className={styles.lItem}>TripLock Winding Crown</li>
            <li className={styles.lItem}>Glide Locking Clasp</li>
            <li className={styles.lItem}>Oyster Steel Bracelet</li>
            <li className={styles.lItem}>Date Functionality</li> 
            <li className={styles.lItem}>Chromalight Number Markers</li>
          </ul>
    </div>

    <h2 className={styles.titleContentPower}>
      70 Hours Power Reserve
    </h2>
    <div className={styles.contactBTNenquire}>
    <Link
          href={"https://wa.me/447718269994?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
        >
          <div className={styles.CTAtext}>
           ENQUIRE VIA WHATSAPP
          </div>
        </Link>
    </div>

      <Image
            src={"/landing/submariner126610LN/sub_filler.jpg"}
            width={1536}
            height={1272}
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
      The Rolex Submariner 126610LN is a distinguished model in the Rolex Submariner line, 
      renowned for its robust design, advanced technology, 
      and timeless aesthetics. 
      </div>

      <Image
            src={"/landing/submariner126610LN/strap.JPG"}
            width={1459}
            height={944}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
      />

      <div className={styles.content}>
        Powered by Rolex's Caliber 3235 movement, a self-winding
        mechanical movement with a Chronenergy escapement offering greater efficiency and dependability....
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
