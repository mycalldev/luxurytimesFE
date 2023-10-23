'use client'

import React from 'react'
import Image from 'next/image';
import styles from './WatchDetailsClient.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function WatchDetailsClient( {watchArr, watch} ) {
  return (
    <div className={styles.imageContainer}>
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
                    src={`/watches/${watch.model}/${watch.model}${watch.ref}${
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
        </div>
  )
}
