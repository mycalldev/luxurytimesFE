'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from './jewellery.module.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const imagesRings = [
    "jewellery/rings/Enchanting/EnchantingMP4/EnchantingWhite.mp4",
    "jewellery/rings/Celestial/CelestialMP4/CelestialYellow.mp4",
    "jewellery/rings/Divine/DivineMP4/DivineRose.mp4",
    "jewellery/rings/Infinite/InfiniteMP4/InfiniteWhite.mp4",
    "jewellery/rings/Sensation/SensationMP4/SensationWhite.mp4",
    "jewellery/rings/Enchanting/EnchantingMP4/EnchantingYellow.mp4"
];


export default function Jewellery() {
  return (
    <div>
      <section className={styles.heroSection}>
        {/* HERO SECTION MOBILE */}
        <div className={styles.heroMobileContainer}>
          <Image
            src={"/jewellery/rings/image_hero_rings.png"}
            width={1456}
            height={816}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
          />
        </div>

      </section>
      <div>
        <h2 className={styles.titleMain}>
        Luxury Times Jewllery Collection
        </h2>
      </div>
      <section>
        {/* SWIPER SECTION */}
        <Swiper
              pagination={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className={styles.swiper}
            >
              <div className={styles.swiperWrapper}>
                {imagesRings.map((item, index) => (
                  <SwiperSlide className={styles.swiperSlide} key={index}>
                    <div>
                        <video 
                        width={1600} 
                        height={1200}
                        loop 
                        playsInline 
                        autoPlay 
                        muted
                        className={styles.video}
                        >
                        <source src={`/${item}`} type="video/mp4" />
                        </video>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
      </section>

      <h4 className={styles.titleContent}>
        GIA Certified Natural Diamond Engagement Rings set in 18k White, Yellow or Rose Gold....
      </h4>

      <div className={styles.contactBTN}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
      </div>
      <div className={styles.contactBTN}>
        <Link
          href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
        >
          WHATSAPP
        </Link>
      </div>

      <h2 className={styles.titleMain}>
         The Tennis Bracelet
      </h2>

      <section>
        <Image
          src={"/jewellery/rings/tennis_bracelet.png"}
          width={1456}
          height={816}
          quality={100}
          alt='image of rings'
          className={styles.imageHeroMobile}
        />

        <div className={styles.content}>
        The Tennis Bracelet is a delicate and elegant piece of jewelry featuring a 
        symmetrical line of diamonds or gemstones set in a flexible, lightweight chain. 
        Traditionally worn around the wrist, it became famously known as a Tennis Bracelet 
        after professional tennis player Chris Evert lost her diamond bracelet during a match in the 1987 U.S. Open, 
        prompting a pause in the game while she retrieved it. 
        </div>

        <div className={styles.content}>
        The bracelet&apos;s design combines both luxury and practicality, 
        making it a popular choice for both everyday wear and special occasions.
        </div>


        <div className={styles.content}>
        Speak to our head consultant, FGA Approved Gemologist - Robert Campbell - to find out more. 
        </div>

        <div className={styles.contactBTNenquire}>
          <Link
            href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
            className={styles.linkBTN}
          >
            ENQUIRE TODAY
          </Link>
        </div>
        
        <h2 className={styles.titleMain}>
          Vintage
        </h2>
        <div className={styles.content}>
        Vintage-inspired rings often feature intricate details like milgrain, filigree, or pavé settings, adding a touch of antique charm. For those who desire something truly unique, custom-designed rings offer endless possibilities, 
        from colored gemstones to unconventional settings, ensuring the ring is as special as the love it represents.
        </div>

        <div>
            <video 
            width={1600} 
            height={1200}
            loop 
            playsInline 
            autoPlay 
            muted
            className={styles.video}
            >
            <source src={`/jewellery/rings/Infinite/InfiniteMP4/InfiniteWhite.mp4`} type="video/mp4" />
            </video>
        </div>

        <div className={styles.contactBTN}>
            <Link href="tel:07976753254" className={styles.linkBTN}>CONTACT</Link>
        </div>

        <Image
          src={"/jewellery/rings/ring_in_box.png"}
          width={1456}
          height={816}
          quality={100}
          alt='ring in a box'
          className={styles.imageHeroMobile}
        />
      </section> 

      <section>
        <h2 className={styles.titleReviews}>
          5 Star Reviews
        </h2>
      
        <div className={styles.containerReview}>
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
          <Image src={'/star.png'} width={32} height={32} className={styles.imageStar} alt='image of star' quality={100} />
        </div>

        <div className={styles.containerGIA}>
        <Image
          src={`/GIA_Logo.png`}
          width={500}
          height={164.5}
          alt={`GIA Logo`}
          quality={100}
          className={styles.imageGIA}
        />
        <div className={styles.content}>
          The Gemological Institute of America (GIA) certification is the gold standard in the diamond industry, 
          renowned for its meticulous and unbiased evaluation of diamonds.
        </div>
        </div>

        <div className={styles.containerGIA}>
        <Image
          src={`/fga.png`}
          width={454}
          height={223}
          alt={`GIA Logo`}
          quality={100}
          className={styles.imageGIA}
        />
        <div className={styles.content}>
          FGA, or Fellowship of the Gemmological Association, is a prestigious designation awarded by the 
          Gemmological Association of Great Britain (Gem-A). This title is granted to individuals who have 
          successfully completed rigorous studies and examinations in gemology, 
          demonstrating a deep understanding of gemstones, their properties, identification, and evaluation.
        </div>
        </div>

        <div className={styles.containerGIA}>
        <Image
          src={`/bourse_logo.jpg`}
          width={320}
          height={140}
          alt={`Diamond Bourse Logo`}
          quality={100}
          className={styles.imageBourse}
        />
        <div className={styles.content}>
          The London Diamond Bourse is a prestigious trade organization and marketplace at the heart of London&apos;s diamond industry. 
          Established to support the trade of diamonds, gemstones, and jewellery, it provides a secure and professional environment for members to conduct business.
        </div>
        </div>

        <div className={styles.contactBTN}>
          <Link
          href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
          >
            WHATSAPP
          </Link>
        </div>
      </section>

    </div>
  )
}
