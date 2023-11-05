'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from './Landing.module.css'

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
            src={"/hero_image_template.jpg"}
            width={1200}
            height={602}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
          />
        </div>

        {/* HERO SECTION DESKTOP */}
        {/* <div className={styles.heroDesktopContainer}>
          <Image
            src={"/sky_dweller_highlights_landing_trimmed.JPG"}
            width={3330}
            height={1089}
            quality={100}
            alt='hero image desktop'
            className={styles.imageHeroDesktop}
          />
        </div> */}

        <div className={styles.contentMainHeroContainer}>
        <div className={styles.headlineContentMain}>
          Discover Time Mastery
        </div>
        <div className={styles.headlineContentSub}>
          Unleashing The Extrodinary
        </div>
      </div>
    </section>

    <section>
      <div className={styles.titleSkyDweller}>The Rolex SkyDweller</div>
      <div className={styles.refSkyDweller}>Reference: 326934</div>

      <div className={styles.contactBTNContainer}>
        <Image src={"/call.png"} width={25} height={25} alt={'phone icon'} quality={100} /> 
        <Link href="tel:07976753254" className={styles.linkBTN}>Contact</Link>
      </div>

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

    <section>
      <div className={styles.titleContent}>
        Elevating Horological Excellence
      </div>

      <div className={styles.content}>
        One of the standout features of the Sky-Dweller is its dual time
        zone function, allowing travelers to easily keep track of time in
        two different time zones simultaneously.
      </div>
      <div className={styles.content}>
        The watch incorporates an annual calendar complication, which
        automatically adjusts for months with 30 and 31 days, requiring
        adjustment only once a year.
      </div>
      <div className={styles.content}>
        It is powered by Rolex's Caliber 9001 movement, a self-winding
        mechanical movement known for its precision and reliability.
      </div>
    </section>

    <section>
    <div className={styles.contentLuxury}>
          <span>Luxury Times</span> is a renowned authority in the realm of horology,
          with an exceptional focus on Rolex watches. Recognized as one of the
          leading experts in the field, their expertise and knowledge extend
          particularly to the iconic Rolex Sky-Dweller collection. With an
          unwavering passion for horology and an insatiable curiosity, the team at
          has dedicated countless hours to studying and dissecting every
          intricate detail of the Rolex Sky-Dweller.
        </div>
    </section>
  </div>
  )
}
