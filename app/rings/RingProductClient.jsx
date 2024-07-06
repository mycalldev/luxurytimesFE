'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './RingProductClient.module.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import  { colourClarity } from '../utils/calculator';

export default function RingProductClient( {ringArr, ring} ) {

  const [price, setPrice] = useState(5056)
  const [cut, setCut] = useState("Excellent")
  const [size, setSize] = useState(1.0)
  const [color, setColor] = useState("h")
  const [clarity, setClarity] = useState("VS2")
  
  // const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16aERRMFExTURFeVJqSTNRa0k0TTBGRVJUZzFNekUzTWtOQ09UTXhNREZDTVVZM1JURkNNZyJ9.eyJodHRwOi8vcmFwYXBvcnQuY29tL3VzZXIiOnsiYWNjb3VudElkIjoxMjY4ODh9LCJodHRwOi8vcmFwYXBvcnQuY29tL3Njb3BlIjpbIm1hbmFnZUxpc3RpbmdzIiwicHJpY2VMaXN0V2Vla2x5Il0sImh0dHA6Ly9yYXBhcG9ydC5jb20vYXBpa2V5Ijp7Imh0dHBzOi8vbWVkaWF1cGxvYWQucmFwbmV0YXBpcy5jb20iOiJGUTFMU25naWZxNzFFbGVpRzR4UGY2bkp4Z3VDWXBhVjVhUE9jVlpKIiwiaHR0cHM6Ly9wcmljZWxpc3QucmFwbmV0YXBpcy5jb20iOiIydHdxdFhKMEdYYTZxckVrTzBrVFkxblIwbmQydk9mMzV1Q0t4eHNkIiwiaHR0cHM6Ly91cGxvYWRsb3RzLnJhcG5ldGFwaXMuY29tIjoid0JzZFR1YUFNUXo1RVN2aTlYdVY2STF5WlNQdE5Nb0R4cnEyR2hpMCJ9LCJodHRwOi8vcmFwYXBvcnQuY29tL2F1ZGllbmNlIjpbImh0dHBzOi8vdXBsb2FkbG90cy5yYXBuZXRhcGlzLmNvbSIsImh0dHBzOi8vcHJpY2VsaXN0LnJhcG5ldGFwaXMuY29tIiwiaHR0cHM6Ly9tZWRpYXVwbG9hZC5yYXBuZXRhcGlzLmNvbSIsImh0dHBzOi8vYXBpZ2F0ZXdheS5yYXBuZXRhcGlzLmNvbSJdLCJodHRwOi8vcmFwYXBvcnQuY29tL3Blcm1pc3Npb25zIjp7InJhcG5ldGFwaXMtYXBpZ2F0ZXdheSI6WyJtZW1iZXJEaXJlY3RvcnkiLCJzZWFyY2giLCJpbnN0YW50SW52ZW50b3J5U2V0dXAiLCJtYW5hZ2VMaXN0aW5nc0ZpbGUiLCJidXlSZXF1ZXN0c0FkZCIsIml0ZW1TaGFyZWQiLCJ0cmFkZUNlbnRlciIsIm15Q29udGFjdHMiLCJtZW1iZXJSYXRpbmciLCJjaGF0IiwibWFuYWdlTGlzdGluZ3MiLCJwcmljZUxpc3RXZWVrbHkiLCJwcmljZUxpc3RNb250aGx5IiwicmFwbmV0UHJpY2VMaXN0V2Vla2x5IiwiYmFzaWMiLCJyYXBuZXRQcmljZUxpc3RNb250aGx5IiwicmFwbmV0SmV3ZWxlciIsImxlYWRzIiwiYWRtaW4iLCJidXlSZXF1ZXN0cyJdfSwiaXNzIjoiaHR0cHM6Ly9yYXBhcG9ydC5hdXRoMC5jb20vIiwic3ViIjoiYVJnc2JzNmJPMWo5dkM0NzZZVG5LMGNZM2NFYmhBSUhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpZ2F0ZXdheS5yYXBuZXRhcGlzLmNvbSIsImlhdCI6MTcxOTA1MDU0NSwiZXhwIjoxNzE5MTM2OTQ1LCJzY29wZSI6ImFwaUdhdGV3YXkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJhUmdzYnM2Yk8xajl2QzQ3NllUbkswY1kzY0ViaEFJSCJ9.MnYQ9TCYNNO1JhXVCQdkch15refmwdZf6vICcIgry8B4itqE73lX6DlX3ST57MfaRA5uw0uZdr2Zxsv5rz23GPoQpgXxTSzRYoWePJ2ubIT_2VqfCgmcs5BK8owhYfbJTiMkGBD80hKUZvaKyaimHvVE71XH-_aXbZu399RuIYXFED8LBNt5zT1GDT06MoPL7uhPp4BDeHd71q9f0z5Z8tFN_8xLMsQyHZeP7fGYWGdQlFK427oqZr0lR76tJOtUmBvYSP95I8p4nmx6bFAyTA4vbAa8GMrqWbwyz7KTGuCtiMiUlXiIe20gYc8e686r8GE-ZeWxJ2XNsyy6Hz02hw" 
  // const url = `https://technet.rapnetapis.com/pricelist/api/Prices?shape=Round&size=${size}&color=${color}&clarity=${clarity}`
  // useEffect(() => {
  //     axios.get(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         "Authorization": `Bearer ${accessToken}`
  //       }
  //     }).then((res) => {
  //       const price = res.data.caratprice
  //       const truncPrice = Math.trunc(price)
  //       setPrice(truncPrice)
  //       console.log("this has ran")
  //     }).catch((err) => {
  //       console.log("this is the error" + err)
  // });
      

  // },[size, color, clarity, shape])

  useEffect(() => {
    if(ring.shape === "Round"){
      if(size == 1.00 || size < 1.50){
        setPrice(colourClarity.Round149[`${color}${clarity}`] * roundBasePrice149 * size)
        return
      } else if(size == 1.5 || size < 2){
        setPrice(colourClarity.Round199[`${color}${clarity}`] * roundBasePrice199 * size)
        return
      } else {
        setPrice(colourClarity.Round299[`${color}${clarity}`] * roundBasePrice299 * size)
      }
    } else {
      if(size == 1.00 || size < 1.50){
        setPrice(colourClarity.Pear149[`${color}${clarity}`] * pearBasePrice149 * size)
        return
      } else if(size == 1.5 || size < 2){
        setPrice(colourClarity.Pear199[`${color}${clarity}`] * pearBasePrice199 * size)
        return 
      }
        else {
          setPrice(colourClarity.Pear299[`${color}${clarity}`] * pearBasePrice299 * size)
        }
      console.log("Pear Price")
    }
   
  }, [color, size, clarity, cut])

  
  const roundBasePrice149 = 79
  const roundBasePrice199 = 55.300041
  const roundBasePrice299 = 55.3
  const pearBasePrice149 = 79
  const pearBasePrice199 = 79
  const pearBasePrice299 = 79


  const handleChangeSize = (event) => {
    setSize(event)
  }

  const handleChangeColor = (event => {
    setColor(event)
  })

  const handleChangeClarity = (event) => {
    setClarity(event)
  }

  const handleChangeCut = (event) => {
    setCut(event)
  }
  return (
    <div className={styles.imageContainer}>
      <Link href={`/rings`} className={styles.linkBTN} prefetch={true}>
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
                            height={1200} 
                            // loop 
                            playsInline 
                            autoPlay 
                            muted
                            className={styles.video}
                          >
                          <source src={`/jewellery/rings/example.mp4`} type="video/mp4" />
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
          <div className={styles.price}>Price: £{price.toFixed(0)}</div>
          <div className={styles.titleTag}>We Offer Rings of All Sizes</div>  

          <div className={styles.containerShape}>
            <div>Diamond Shape:</div>
            <div>{ring.shape}</div>
          </div>
          <div className={styles.containerSelectLabel}>
            <div>Carat Size:</div>
            <select
              name="carat size"
              className={styles.selectDropDown} 
              onChange={(e) => handleChangeSize(e.target.value)}
            >
              <option value="1.00">1.00 Carat</option>
              <option value="1.10">1.10 Carat</option>
              <option value="1.20">1.20 Carat</option>
              <option value="1.30">1.30 Carat</option>
              <option value="1.40">1.40 Carat</option>
              <option value="1.50">1.50 Carat</option>
              <option value="1.60">1.60 Carat</option>
              <option value="1.70">1.70 Carat</option>
              <option value="1.80">1.80 Carat</option>
              <option value="1.90">1.90 Carat</option>
              <option value="2.00">2.00 Carat</option>
            </select>
            
        </div>
        <div className={styles.containerSelectLabel}>
        <div>Cut:</div>
            <select
              name="cut"
              className={styles.selectDropDown}
              onChange={(e) => handleChangeCut(e.target.value)}
            >
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
            </select>
            
        </div>
        <div className={styles.containerSelectLabel}>
        <div>Clarity:</div>
            
            <select
              name="Clarity"
              className={styles.selectDropDown} 
              onChange={(e) => handleChangeClarity(e.target.value)}
            >
              <option value="VS2">Very Small Inclusions (VS2)</option>
              <option value="VS1">Very Small Inclusions (VS1)</option>
              <option value="VVS2">Very Very Small Inclusions (VVS2)</option>
              <option value="VVS1">Very Very Small Inclusions (VVS1)</option>
              <option value="IF">Internally Flawless (IF)</option>
            </select>
            
        </div>
        <div className={styles.containerSelectLabel}>
        <div>Colour:</div>  
            <select
              name="Colour"
              className={styles.selectDropDown} 
              onChange={(e) => handleChangeColor(e.target.value)}
            >
              <option value="h">H</option>
              <option value="g">G</option>
              <option value="f">F</option>
              <option value="e">E</option>
              <option value="d">D</option>
            </select>
        </div>

        <div className={styles.descriptionMobile}>
          {ring.descriptionMobile}
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
        </div>
        
      </div>
  )
}
