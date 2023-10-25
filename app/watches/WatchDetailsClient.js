'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './WatchDetailsClient.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function WatchDetailsClient( {watchArr, watch} ) {
  return (
    <div className={styles.imageContainer}>
      <Link href={'/watches'} className={styles.linkBTN}>
        <div className={styles.backBTN}>{`< BACK`}</div>
      </Link>

      <div className={styles.titleMain}>{watch.title}</div> 

          <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.swiper}
          >
            <div className={styles.swiperWrapper}>
              {watchArr.map((item, index) => (
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <Image
                    src={`/watches/${watch.brand}/${watch.model}/${watch.model}${watch.ref}${
                      watch.strap
                    }${watch.dial}/${watch.ref}${watch.model}${
                      index + 1
                    }.JPG`}
                    width={1680}
                    height={1120}
                    alt={`${watch.model}${watch.ref}`}
                    quality={100}
                    className={styles.imageWatch}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          {/* DESCRIPTION CONTENT */}
          <section>
            <div className={styles.availableContainer}>
              <p className={styles.dot}> </p>
              <div className={styles.available}>Available Now</div>
            </div>
            <div className={styles.description}>{watch.description}</div>
            <Link href={'/'} className={styles.BTNLink}>
            <div className={styles.contactBTN}>Contact</div>
            </Link>
          </section>
          
          {/* DETAILS MAIN SECTION */}
          <section className={styles.sectionDetails}>
            <div className={styles.titleDetails}>DETAILS</div>

            <div className={styles.detailsGrid}>
              <div className={styles.specGrid}>
                <div className={styles.titleSpec}>Box</div>
                <div className={styles.titleValue}>Yes</div>
              </div>
              <div className={styles.specGrid}>
                <div className={styles.titleSpec}>Card</div>
                <div className={styles.titleValue}>{watch.box}</div>
              </div>
              <div className={styles.specGrid}>
                <div className={styles.titleSpec}>Condition</div>
                <div className={styles.titleValue}>{watch.condition}</div>
              </div>
            </div>
            <div className={styles.titleShare}>SHARE THIS WATCH</div>
            <Link href={'/'} >
              <div className={styles.imageWhatsapp}>
                <Image src={'/whatsapp.png'} width={64} height={64} quality={100} alt='whatsapp icon' />
              </div>
            </Link>
          </section>

          {/* SHARE SECTION */}


        </div>
  )
}
