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

export default function RingProductClient( {ringArr, ring} ) {

  const [price, setPrice] = useState(1896)
  const [shape, setShape] = useState("Round")
  const [size, setSize] = useState(0.6)
  const [color, setColor] = useState("h")
  const [clarity, setClarity] = useState("vs2")
  
  const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16aERRMFExTURFeVJqSTNRa0k0TTBGRVJUZzFNekUzTWtOQ09UTXhNREZDTVVZM1JURkNNZyJ9.eyJodHRwOi8vcmFwYXBvcnQuY29tL3VzZXIiOnsiYWNjb3VudElkIjoxMjY4ODh9LCJodHRwOi8vcmFwYXBvcnQuY29tL3Njb3BlIjpbIm1hbmFnZUxpc3RpbmdzIiwicHJpY2VMaXN0V2Vla2x5Il0sImh0dHA6Ly9yYXBhcG9ydC5jb20vYXBpa2V5Ijp7Imh0dHBzOi8vbWVkaWF1cGxvYWQucmFwbmV0YXBpcy5jb20iOiJGUTFMU25naWZxNzFFbGVpRzR4UGY2bkp4Z3VDWXBhVjVhUE9jVlpKIiwiaHR0cHM6Ly9wcmljZWxpc3QucmFwbmV0YXBpcy5jb20iOiIydHdxdFhKMEdYYTZxckVrTzBrVFkxblIwbmQydk9mMzV1Q0t4eHNkIiwiaHR0cHM6Ly91cGxvYWRsb3RzLnJhcG5ldGFwaXMuY29tIjoid0JzZFR1YUFNUXo1RVN2aTlYdVY2STF5WlNQdE5Nb0R4cnEyR2hpMCJ9LCJodHRwOi8vcmFwYXBvcnQuY29tL2F1ZGllbmNlIjpbImh0dHBzOi8vdXBsb2FkbG90cy5yYXBuZXRhcGlzLmNvbSIsImh0dHBzOi8vcHJpY2VsaXN0LnJhcG5ldGFwaXMuY29tIiwiaHR0cHM6Ly9tZWRpYXVwbG9hZC5yYXBuZXRhcGlzLmNvbSIsImh0dHBzOi8vYXBpZ2F0ZXdheS5yYXBuZXRhcGlzLmNvbSJdLCJodHRwOi8vcmFwYXBvcnQuY29tL3Blcm1pc3Npb25zIjp7InJhcG5ldGFwaXMtYXBpZ2F0ZXdheSI6WyJtZW1iZXJEaXJlY3RvcnkiLCJzZWFyY2giLCJpbnN0YW50SW52ZW50b3J5U2V0dXAiLCJtYW5hZ2VMaXN0aW5nc0ZpbGUiLCJidXlSZXF1ZXN0c0FkZCIsIml0ZW1TaGFyZWQiLCJ0cmFkZUNlbnRlciIsIm15Q29udGFjdHMiLCJtZW1iZXJSYXRpbmciLCJjaGF0IiwibWFuYWdlTGlzdGluZ3MiLCJwcmljZUxpc3RXZWVrbHkiLCJwcmljZUxpc3RNb250aGx5IiwicmFwbmV0UHJpY2VMaXN0V2Vla2x5IiwiYmFzaWMiLCJyYXBuZXRQcmljZUxpc3RNb250aGx5IiwicmFwbmV0SmV3ZWxlciIsImxlYWRzIiwiYWRtaW4iLCJidXlSZXF1ZXN0cyJdfSwiaXNzIjoiaHR0cHM6Ly9yYXBhcG9ydC5hdXRoMC5jb20vIiwic3ViIjoiYVJnc2JzNmJPMWo5dkM0NzZZVG5LMGNZM2NFYmhBSUhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpZ2F0ZXdheS5yYXBuZXRhcGlzLmNvbSIsImlhdCI6MTcxOTA1MDU0NSwiZXhwIjoxNzE5MTM2OTQ1LCJzY29wZSI6ImFwaUdhdGV3YXkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJhUmdzYnM2Yk8xajl2QzQ3NllUbkswY1kzY0ViaEFJSCJ9.MnYQ9TCYNNO1JhXVCQdkch15refmwdZf6vICcIgry8B4itqE73lX6DlX3ST57MfaRA5uw0uZdr2Zxsv5rz23GPoQpgXxTSzRYoWePJ2ubIT_2VqfCgmcs5BK8owhYfbJTiMkGBD80hKUZvaKyaimHvVE71XH-_aXbZu399RuIYXFED8LBNt5zT1GDT06MoPL7uhPp4BDeHd71q9f0z5Z8tFN_8xLMsQyHZeP7fGYWGdQlFK427oqZr0lR76tJOtUmBvYSP95I8p4nmx6bFAyTA4vbAa8GMrqWbwyz7KTGuCtiMiUlXiIe20gYc8e686r8GE-ZeWxJ2XNsyy6Hz02hw" 
  const url = `https://technet.rapnetapis.com/pricelist/api/Prices?shape=${shape}&size=${size}&color=${color}&clarity=${clarity}`
  useEffect(() => {
      axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }).then((res) => {
        const price = res.data.caratprice
        const truncPrice = Math.trunc(price)
        setPrice(truncPrice)
        console.log("this has ran")
      }).catch((err) => {
        console.log("this is the error" + err)
  });
      

  },[size, color, clarity, shape])

  const handleChangeSize = (event) => {
    setSize(event)
  }

  const handleChangeColor = (event => {
    setColor(event)
  })

  const handleChangeClarity = (event) => {
    setClarity(event)
  }

  const handleChangeShape = (event) => {
    setShape(event)
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
          <div className={styles.price}>Price: £{price * 0.79}</div>
          <div className={styles.ringSize}>We Offer Rings of All Sizes</div>

          <div className={styles.descriptionMobile}> 
                {ring.descriptionMobile}
          </div>  
          <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="carat">CARAT SIZE:
            <select
              name="carat size"
              className={styles.selectSize} 
              onChange={(e) => handleChangeSize(e.target.value)}
            >
              <option value="0.6">0.6</option>
              <option value="0.7">0.7</option>
              <option value="0.8">0.8</option>
              <option value="0.9">0.9</option>
              <option value="1.00">1.00</option>
              <option value="1.10">1.10</option>
              <option value="1.20">1.20</option>
              <option value="1.30">1.30</option>
              <option value="1.40">1.40</option>
              <option value="1.50">1.50</option>
              <option value="1.60">1.60</option>
              <option value="1.70">1.70</option>
              <option value="1.80">1.80</option>
              <option value="1.90">1.90</option>
              <option value="2.00">2.00</option>
            </select>
            </label>
        </div>
        <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="cut">CUT:
            <select
              name="cut"
              className={styles.selectSize}
              onChange={(e) => handleChangeShape(e.target.value)}
            >
              <option value={ring.shape}>{ring.shape}</option>
              
            </select>
            </label>
        </div>
        <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="Clarity">CLARITY:
            <select
              name="Clarity"
              className={styles.selectSize} 
              onChange={(e) => handleChangeClarity(e.target.value)}
            >
              <option value="vs2">Very Small Inclusions (VS2)</option>
              <option value="vs1">Very Small Inclusions (VS1)</option>
              <option value="vvs2">Very Very Small Inclusions (VVS2)</option>
              <option value="vvs1">Very Very Small Inclusions (VVS1)</option>
              <option value="if">Internally Flawless (IF)</option>
            </select>
            </label>
        </div>
        <div className={styles.selectSizeContainer}>
            <label className={styles.label} htmlFor="Colour">COLOUR:
            <select
              name="Colour"
              className={styles.selectSize} 
              onChange={(e) => handleChangeColor(e.target.value)}
            >
              <option value="h">H</option>
              <option value="g">G</option>
              <option value="f">F</option>
              <option value="e">E</option>
              <option value="d">D</option>
            </select>
            </label>
        </div>
      </div>
  )
}
