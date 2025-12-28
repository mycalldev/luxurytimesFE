'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from '../review/Reviews.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function reviewSwiper( {review} ) {
  return (
    <div className={styles.imageContainer}>

          <h1 className={styles.titleReviews}>REVIEWS</h1>

          <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.swiper}
          >
            <div className={styles.swiperWrapper}>
              {review.map((item, index) => (
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <div className={styles.containerMain}> 
                    <div className={styles.containerGrid}>
                        <div className={styles.nameKey}>Name:</div>
                        <div className={styles.nameValue}>{item.name}</div>
                    </div>

                    <div className={styles.containerGrid}>
                        <div className={styles.dateKey}>Date:</div>
                        <div className={styles.dateValue}>{item.date}</div>
                    </div>

                    <div className={styles.review}>{item.comment}</div>

                    <div className={styles.ratingMainContainer}>
                      <div className={styles.rating}>Rating:</div>
                    <div>

                    {item.rating == 3 &&
                      <div className={styles.ratingGrid}>
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                      </div> 
                    }
                    {item.rating == 4 &&
                      <div className={styles.ratingGrid}>
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                      </div> 
                    }
                    {item.rating == 5 &&
                      <div className={styles.ratingGrid}>
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                        <Image src={'/star.png'} width={16} height={16} className={styles.imageStar} alt='image of star' quality={100} />
                      </div>
                    }
                    </div>
                   </div>
                 </div> 
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          <div className={styles.viewDetailsBTN}>
             <Link href={'/review'} prefetch={true} className={styles.linkBTN}>See All</Link>
            </div>
        </div>
  )
}
