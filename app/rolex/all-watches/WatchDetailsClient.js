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
      <Link href={`/rolex/rolex-categories/${watch.model}`} className={styles.linkBTN}>
        <div className={styles.backBTN}>{`< Previous`}</div>
      </Link>

      <div className={styles.titleMain}>{watch.title}</div> 
          
          <div className={styles.containerTopGrid}>
              <div className={styles.gridItemSwiper}>
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
            </div>

            {/* AVAILABLE AND CONTACT */}
            <section className={styles.gridItemContent}>
              <div className={styles.contentContianerFlex}>
                  {/* ITEM 1 */}
                  <div className={styles.availableContainerItem}>
                    <div className={styles.dotAvailableFlex}>
                      <p className={styles.dotFlexItem}> </p>
                      <div className={styles.availableFlexItem}>Available <span>Now</span> With Warranty</div>
                    </div>
                  </div>

                  {/* ITEM 2 */}
                  
              </div>


              <div className={styles.bgGREYDetails}>

                <div className={styles.detailsGrid}>
                <div className={styles.specGrid}>
                  <div className={styles.titleBox}>Box</div>
                  <div className={styles.titleBoxValue}>{watch.box}</div>
                </div>
                <div className={styles.specGrid}>
                  <div className={styles.titleCard}>Card</div>
                  <div className={styles.titleCardValue}>{watch.card}</div>
                </div>
                <div className={styles.specGrid}>
                  <div className={styles.titleCondition}>Condition</div>
                  <div className={styles.titleConditionValue}>{watch.condition}</div>
                </div>
                
              </div>
              
            </div>
            <div className={styles.descriptionMobile}>
                {watch.descriptionMobile}
            </div>

            <div className={styles.descriptionDesktop}>
              {watch.descriptionDesktop}
            </div>

            <div className={styles.contactContainerItem}> 
              <div className={styles.contactDetailsBTNMobile}>
                <Link href="tel:07976753254" className={styles.linkBTNContact}>
                  CONTACT
                </Link>
              </div>
              <div className={styles.contactBTNDesktop}>
                <h3 className={styles.contactReview}>CONTACT</h3>
                <div className={styles.number}>07976 753 254</div>
              </div>
            </div>

            </section>
          </div>
          
          
          {/* DETAILS MAIN SECTION */}
          <section className={styles.sectionDetails}>
           <h1 className={styles.titleDetails}>DETAILS</h1>

            <div className={styles.detailsGridMain}>
              {/* 1 MAIN */}
              <div>                 
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
              </div>
              
              {/* 2 DIAL */}
              <div>
                <div className={styles.titleSpecMain}>
                  <h2>Dial</h2>
                </div>

                <div className={watch.dial ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Style</div>
                  <div className={styles.listItemValue}>{watch.dial}</div>
                </div>

                <div className={watch.dialSize ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Size</div>
                  <div className={styles.listItemValue}>{watch.dialSize}</div>
                </div>

                <div className={watch.numberMarkers ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Number Markers</div>
                  <div className={styles.listItemValue}>{watch.numberMarkers}</div>
                </div>

                <div className={watch.hands ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Hands</div>
                  <div className={styles.listItemValue}>{watch.hands}</div>
                </div>

              </div>

              {/* 3 CASE */}
              <div>
                <div className={styles.titleSpecMain}>
                  <h2>Case</h2>
                </div>

                <div className={watch.case ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Case</div>
                  <div className={styles.listItemValue}>{watch.case}</div>
                </div>

                <div className={watch.caseBack ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Case Back</div>
                  <div className={styles.listItemValue}>{watch.caseBack}</div>
                </div>

                <div className={watch.caseMaterial ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Case Material</div>
                  <div className={styles.listItemValue}>{watch.caseMaterial}</div>
                </div>

                <div className={watch.caseSize ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Case Size</div>
                  <div className={styles.listItemValue}>{watch.caseSize}</div>
                </div>

                <div className={watch.caseThickness ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Case Thickness</div>
                  <div className={styles.listItemValue}>{watch.caseThickness}</div>
                </div>

                <div className={watch.waterResistant ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Water Resistant</div>
                  <div className={styles.listItemValue}>{watch.waterResistant}</div>
                </div>
              </div>
             

              {/* 4 BEZEL */}
              <div>
                <div className={styles.titleSpecMain}>
                  <h2>Bezel</h2>
                </div>

                <div className={watch.bezel ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Bezel</div>
                  <div className={styles.listItemValue}>{watch.bezel}</div>
                </div>

                <div className={watch.bezelMaterial ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Material</div>
                  <div className={styles.listItemValue}>{watch.bezelMaterial}</div>
                </div>
                
                <div className={watch.bezelStyle ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Style</div>
                  <div className={styles.listItemValue}>{watch.bezelStyle}</div>
                </div> 

              </div>
              
              {/* 5 BRACELET */}
              <div>
                <div className={styles.titleSpecMain}>
                  <h2>Bracelet</h2>
                </div>

                <div className={watch.strap ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Style</div>
                  <div className={styles.listItemValue}>{watch.strap}</div>
                </div>

                <div className={watch.strapMaterial ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Material</div>
                  <div className={styles.listItemValue}>{watch.strapMaterial}</div>
                </div>

                <div className={watch.strapColour ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Colour</div>
                  <div className={styles.listItemValue}>{watch.strapColour}</div>
                </div>

                <div className={watch.strapClasp ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Clasp</div>
                  <div className={styles.listItemValue}>{watch.strapClasp}</div>
                </div>
              </div>
              

              {/* 6 CALIBER */}
              <div>
                <div className={styles.titleSpecMain}>
                  <h2>Caliber</h2>
                </div>

                <div className={watch.movement ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Movement</div>
                  <div className={styles.listItemValue}>{watch.movement}</div>
                </div>

                <div className={watch.caliber ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Caliber</div>
                  <div className={styles.listItemValue}>{watch.caliber}</div>
                </div>

                <div className={watch.powerReserve ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Power Reserve</div>
                  <div className={styles.listItemValue}>{watch.powerReserve}</div>
                </div>

                <div className={watch.numberOfJewels ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Number of Jewels</div>
                  <div className={styles.listItemValue}>{watch.numberOfJewels}</div>
                </div>

                <div className={watch.windingRotor ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Winding Rotor</div>
                  <div className={styles.listItemValue}>{watch.windingRotor}</div>
                </div>

                <div className={watch.balanceSpring ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Balance Spring</div>
                  <div className={styles.listItemValue}>{watch.balanceSpring}</div>
                </div>

                <div className={watch.bridges ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Bridges</div>
                  <div className={styles.listItemValue}>{watch.bridges}</div>
                </div>

                <div className={watch.SemiOscillationHour ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Semi Ocsillation/Hour</div>
                  <div className={styles.listItemValue}>{watch.SemiOscillationHour}</div>
                </div>
              </div>
              

              {/* 7 SPECIFICS */}
              <div>
                <div className={styles.titleSpecMain}>
                  <h2>Specifics</h2>
                </div>

                <div className={watch.crystal ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Crystal</div>
                  <div className={styles.listItemValue}>{watch.crystal}</div>
                </div>

                <div className={watch.functions ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Funtions</div>
                  <div className={styles.listItemValue}>{watch.functions}</div>
                </div>

                <div className={watch.mechanism ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Mechanism</div>
                  <div className={styles.listItemValue}>{watch.mechanism}</div>
                </div>

                <div className={watch.totalDiameter ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Total Diameter</div>
                  <div className={styles.listItemValue}>{watch.totalDiameter}</div>
                </div>

                <div className={watch.frequency ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Frequency</div>
                  <div className={styles.listItemValue}>{watch.frequency}</div>
                </div>

                <div className={watch.numberOfParts ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Number of Parts</div>
                  <div className={styles.listItemValue}>{watch.numberOfParts}</div>
                </div>

                <div className={watch.thickness ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Thickness</div>
                  <div className={styles.listItemValue}>{watch.thickness}</div>
                </div>

                <div className={watch.patent ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Patent</div>
                  <div className={styles.listItemValue}>{watch.patent}</div>
                </div>

                <div className={watch.hallMark ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Hallmark</div>
                  <div className={styles.listItemValue}>{watch.hallMark}</div>
                </div>

                <div className={watch.setting ? styles.specContainer : styles.displayNone}>
                  <div className={styles.listItemKey}>Setting</div>
                  <div className={styles.listItemValue}>{watch.setting}</div>
                </div>
                
              </div>
              
            </div>
          </section>
      </div>
  )
}
