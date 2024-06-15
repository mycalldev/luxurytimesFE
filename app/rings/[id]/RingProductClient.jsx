'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from './RingProductClient.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RingProductClient( {ringArr, ring} ) {
  return (
    <div className={styles.imageContainer}>
      <Link href={`/rings`} className={styles.linkBTN}>
        <div className={styles.backBTN}>{`< Previous`}</div>
      </Link>

      <div className={styles.titleMain}>{ring.title}</div> 
          
          <div className={styles.containerTopGrid}>
              <div className={styles.gridItemSwiper}>
              <Swiper
                pagination={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={styles.swiper}
              >
                <div className={styles.swiperWrapper}>
                  {ringArr.map((item, index) => (
                    <SwiperSlide className={styles.swiperSlide} key={index}>
                      {index === 0 ? (
                        <div>
                          <video 
                            width={1600} 
                            height={1100} 
                            loop 
                            playsInline 
                            autoPlay 
                            muted
                            className={styles.video}
                          >
                          <source src={`/video1.mp4`} type="video/mp4" />
                          </video>
                        </div>
                      ) : (
                        <Image
                          src={`/jewellery/rings/${ring.title}${ring.colour}${index}.jpg`}
                          width={1680}
                          height={1120}
                          alt={`${ring.title}`}
                          quality={100}
                          className={styles.imageWatch}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div> 
          <div className={styles.ringSize}>We Offer Rings of All Sizes</div>

          <div className={styles.descriptionMobile}> 
                {ring.descriptionMobile}
          </div>  
          <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="carat">CARAT:
            <select
              name="carat size"
              className={styles.selectSize} 
            >
              <option value="0.8">0.8</option>
              <option value="0.9">0.9</option>
              <option value="1.00">1.00</option>
            </select>
            </label>
        </div>
        <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="cut">CUT:
            <select
              name="cut"
              className={styles.selectSize} 
            >
              <option value="0.8">Princess</option>
              <option value="0.9">Oval</option>
              <option value="1.00">Emerald</option>
              <option value="1.00">Round Brilliant</option>
            </select>
            </label>
        </div>
        <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="Clarity">CLARITY:
            <select
              name="Clarity"
              className={styles.selectSize} 
            >
              <option value="D">Small Inclusions (SI2)</option>
              <option value="E">Small Inclusions (SI1)</option>
              <option value="F">Very Small Inclusions (VS2)</option>
              <option value="G">Very Small Inclusions (VS1)</option>
              <option value="H">Internally Flawless (IF)</option>
            </select>
            </label>
        </div>
        <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="Colour">COLOUR:
            <select
              name="Colour"
              className={styles.selectSize} 
            >
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
            </label>
        </div>
      </div>
  )
}
