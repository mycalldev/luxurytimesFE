'use client'

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
      {/* <Link href={`/audemars-piguet/audemars-piguet-categories/`} className={styles.linkBTN}>
        <div className={styles.backBTN}>{`< BACK`}</div>
      </Link> */}

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
                      watch.strapColour
                    }${watch.strap}${watch.dial}/${watch.ref}${watch.model}${
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
            <Link href='href="tel:07976753254' className={styles.BTNLink}>
              <div className={styles.contactBTN}>Contact</div>
            </Link>
            
          </section>
          
          {/* DETAILS MAIN SECTION */}
          <section className={styles.sectionDetails}>
            <div className={styles.titleDetails}>DETAILS</div>

            <div className={styles.detailsGrid}>
              <div className={styles.specGrid}>
                <div className={styles.titleSpec}>Box</div>
                <div className={styles.titleValue}>{watch.box}</div>
              </div>
              <div className={styles.specGrid}>
                <div className={styles.titleSpec}>Card</div>
                <div className={styles.titleValue}>{watch.card}</div>
              </div>
              <div className={styles.specGrid}>
                <div className={styles.titleSpec}>Condition</div>
                <div className={styles.titleValue}>{watch.condition}</div>
              </div>
            </div>

            {/* SHARE SECTION */}

            <div className={styles.titleShare}>SHARE THIS WATCH</div>
            <Link href={'/'} >
              <div className={styles.imageWhatsapp}>
                <Image src={'/whatsapp.png'} width={64} height={64} quality={100} alt='whatsapp icon' />
              </div>
            </Link>

            {/* <div className={styles.specGrid}> */}
              <div className={styles.titleSpecMain}>
                <h2>Main</h2>
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
              
              {/* DIAL */}
              <div className={styles.titleSpecMain}>
                <h2>Dial</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Style</div>
                <div className={styles.listItemValue}>{watch.dial}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Size</div>
                <div className={styles.listItemValue}>{watch.dialSize}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Number Markers</div>
                <div className={styles.listItemValue}>{watch.numberMarkers}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Hands</div>
                <div className={styles.listItemValue}>{watch.hands}</div>
              </div>

              {/* BEZEL */}
              <div className={styles.titleSpecMain}>
                <h2>Bezel</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Style</div>
                <div className={styles.listItemValue}>{watch.bezel}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Directional</div>
                <div className={styles.listItemValue}>{watch.bezelDirection}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Material</div>
                <div className={styles.listItemValue}>{watch.bezel}</div>
              </div> 
              
              {/* BRACELET */}
              <div className={styles.titleSpecMain}>
                <h2>Bracelet</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Style</div>
                <div className={styles.listItemValue}>{watch.strap}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Material</div>
                <div className={styles.listItemValue}>{watch.braceletMaterial}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Colour</div>
                <div className={styles.listItemValue}>{watch.strapColour}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Clasp</div>
                <div className={styles.listItemValue}>{watch.strapClasp}</div>
              </div>

              {/* CALIBER */}
              <div className={styles.titleSpecMain}>
                <h2>Caliber</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Movement</div>
                <div className={styles.listItemValue}>{watch.movement}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Caliber</div>
                <div className={styles.listItemValue}>{watch.caliber}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Power Reserve</div>
                <div className={styles.listItemValue}>{watch.powerReserve}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Number of Jewels</div>
                <div className={styles.listItemValue}>{watch.numberOfJewels}</div>
              </div>

              {/* SPECIFICS */}
              <div className={styles.titleSpecMain}>
                <h2>Specifics</h2>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Crystal</div>
                <div className={styles.listItemValue}>{watch.crystal}</div>
              </div>

              <div className={styles.specContainer}>
                <div className={styles.listItemKey}>Case Material</div>
                <div className={styles.listItemValue}>{watch.caseMaterial}</div>
              </div>
          </section>
        </div>
  )
}
