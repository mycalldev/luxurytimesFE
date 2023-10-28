'use client'

import React, {useState} from 'react'
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
      <Link href={'/watches/all-watches'} className={styles.linkBTN}>
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

            {/* <div className={styles.specGrid}> */}
              <div className={styles.titleSpecMain}>
                <h2>Specification</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Reference</div>
                <div className={styles.listItemValue}>{watch.ref}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Brand</div>
                <div className={styles.listItemValue}>{watch.brand}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Model</div>
                <div className={styles.listItemValue}>{watch.model}</div>
              </div>

              <div className={styles.titleSpecMain}>
                <h2>Dial</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Style</div>
                <div className={styles.listItemValue}>{watch.dial}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Size</div>
                <div className={styles.listItemValue}>41mm</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Number Markers</div>
                <div className={styles.listItemValue}>Roman Numerals</div>
              </div>




              {/* SPECIFICATION GRID */}
              {/* <div className={styles.specGridContainer}>

                <div className={styles.itemGridKey}>
                  <ul>
                    <li className={styles.listItemKey}>Reference:</li>
                    <li className={styles.listItemKey}>Brand:</li>
                    <li className={styles.listItemKey}>Model:</li>
                    <li className={styles.listItemKey}>Movement:</li>
                  </ul>  
                </div>

                <div className={styles.itemGridValue}>
                  <ul>
                    <li className={styles.listItemValue}>{watch.ref}</li>
                    <li className={styles.listItemValue}>{watch.brand}</li>
                    <li className={styles.listItemValue}>{watch.model}</li>
                    <li className={styles.listItemValue}>{watch.movement}</li>
                  </ul>
                </div>
                
              </div> */}
            {/* </div> */}
            
            {/* <div className={styles.titleDialMain}>
                <h2>Dial</h2>
            </div>

            <div className={styles.specGridContainer}>

                <div className={styles.itemGridKey}>
                  <ul>
                    <li className={styles.listItemKey}>Style:</li>
                    <li className={styles.listItemKey}>Number Markers:</li>

                  </ul>  
                </div>

                <div className={styles.itemGridValue}>
                  <ul>
                    <li className={styles.listItemValue}>{watch.dial}</li>
                    <li className={styles.listItemValue}>Roman</li>
                  </ul>
                </div>
                
              </div> */}
          </section>

          {/* SHARE SECTION */}


        </div>
  )
}
