'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from './rings.module.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const imagesRing = [
    "jewellery/rings/Enchanting/EnchantingMP4/EnchantingWhite.mp4",
    "jewellery/rings/Celestial/CelestialMP4/CelestialYellow.mp4",
    "jewellery/rings/Divine/DivineMP4/DivineRose.mp4",
    "jewellery/rings/Infinite/InfiniteMP4/InfiniteWhite.mp4",
    "jewellery/rings/Sensation/SensationMP4/SensationWhite.mp4"
];


export default function rings() {
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

        <Link href={'/Jewellery'} className={styles.backLinkBTN} prefetch={true}>
                <div className={styles.backNav}>
                    {'< Jewellery'}
                </div>
        </Link>

      </section>
      <div>
        <h2 className={styles.titleMain}>
        Discover the Ring That Speaks to Your Love
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
                {imagesRing.map((item, index) => (
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

      <section>
        <Image
          src={"/jewellery/rings/image_filler_ring.png"}
          width={1456}
          height={816}
          quality={100}
          alt='image of rings'
          className={styles.imageHeroMobile}
        />

        <h2 className={styles.titleMain}>
         The Beauty Within
        </h2>

        <div className={styles.content}>
        True love isn&apos;t about finding someone who completes you, but finding someone who inspires you to complete yourself.
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

        <div className={styles.content}>
        Engagement rings come in a wide variety of styles, each offering a unique expression of love and commitment.
        </div>
        <h2 className={styles.titleMain}>
          The Solitaire
        </h2>
        <div className={styles.content}>
        The classic solitaire is a timeless choice, featuring a single, stunning diamond or gemstone as the centerpiece, 
        often set in a sleek band of gold, platinum, or white gold.
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
            <source src={`/jewellery/rings/Enchanting/EnchantingMP4/EnchantingYellow.mp4`} type="video/mp4" />
            </video>
        </div>

        <h2 className={styles.titleMain}>
          The Halo
        </h2>
        <div className={styles.content}>
         For those who prefer more sparkle, 
         a halo ring surrounds the central stone with a ring of smaller diamonds, amplifying its brilliance.
        </div>

        <Image
          src={"/jewellery/rings/image_filler_ring2.png"}
          width={1456}
          height={816}
          quality={100}
          alt='image of halo ring'
          className={styles.imageHeroMobile}
        />

        <h2 className={styles.titleMain}>
          3 Stone
        </h2>

        <div className={styles.content}>
        Three-stone rings are another popular option, symbolizing the past, present, and future of a relationship, with a larger central stone flanked by two smaller ones. 
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
            <source src={`/jewellery/rings/Trilogy/TrilogyMP4/TrilogyWhite.mp4`} type="video/mp4" />
            </video>
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

        {/* <div className={styles.contactBTN}>
          <Link
          href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
          >
            WHATSAPP
          </Link>
        </div> */}
      </section>

    </div>
  )
}
