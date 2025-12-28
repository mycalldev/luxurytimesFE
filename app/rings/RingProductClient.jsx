'use client'
// import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './RingProductClient.module.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import  { colourClarity } from '../utils/calculator';

export default function RingProductClient({ ring }) {

  // const [price, setPrice] = useState(0)
  // const [cut, setCut] = useState("0.75")
  // const [size, setSize] = useState(.30)
  // const [color, setColor] = useState("h")
  // const [clarity, setClarity] = useState("SI2")
  // const [toggleCarat, setToggleCarat] = useState(false)
  // const [toggleCut, setToggleCut] = useState(false)
  // const [toggleClarity, setToggleClarity] = useState(false)
  // const [toggleColour, setToggleColour] = useState(false)
  // const [toggleMetal, setToggleMetal] = useState(false)

  // const mount = 1000

  // Split the middle on VAT
  // const SplitTheMiddle = 1.1

  // Rap of -45%
  // const rap = 0.55

//   useEffect(() => {
//     if(ring.shape == 'Round'){
//       if(size == 0.30 || size < 0.40){
//         setPrice(colourClarity.Round39[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return
//       } else if(size == 0.40 || size < 0.50){
//         setPrice(colourClarity.Round49[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return
//       } else if(size == 0.50 || size < 0.70){
//         setPrice(colourClarity.Round69[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return 
//       } else if(size == 0.70 || size < 0.90){
//         setPrice(colourClarity.Round89[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return 
//       } else if(size == 0.90 || size < 1.00){
//         setPrice(colourClarity.Round99[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return 
//       } else if(size == 1.00 || size < 1.49){
//           setPrice(colourClarity.Round149[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//           return
//       } else if(size == 1.50 || size < 2.00){
//         setPrice(colourClarity.Round199[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return
//       } else if (size == 2.00 || size < 3.00) {
//         setPrice(colourClarity.Round299[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//       } else {
//         setPrice(colourClarity.Round399[`${color}${clarity}`] * exchangeRate * size * SplitTheMiddle * cut + mount)
//       }
//     } else {
//       if(size == 0.30 || size < 0.40){
//         setPrice(colourClarity.Pear39[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return
//       } else if(size == 0.40 || size < 0.50){
//         setPrice(colourClarity.Pear49[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return
//       } else if(size == 0.50 || size < 0.70){
//         setPrice(colourClarity.Pear69[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return 
//       } else if(size == 0.70 || size < 0.90){
//         setPrice(colourClarity.Pear89[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return 
//       } else if(size == 0.90 || size < 1.00){
//         setPrice(colourClarity.Pear99[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return 
//       } else if(size == 1.00 || size < 1.49){
//           setPrice(colourClarity.Pear149[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//           return
//       } else if(size == 1.50 || size < 2.00){
//         setPrice(colourClarity.Pear199[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//         return
//       } else if (size == 2.00 || size < 3.00) {
//         setPrice(colourClarity.Pear299[`${color}${clarity}`] * exchangeRate * size * rap * SplitTheMiddle * cut + mount)
//       } else {
//         setPrice(colourClarity.Pear399[`${color}${clarity}`] * exchangeRate * size * SplitTheMiddle * cut + mount)
//       }
//     }
    
// }, [color, size, clarity, cut])


// THIS COULD/SHOULD BE DYNAMIC FROM AN API
  // let exchangeRate = 76
 

  // const handleChangeSize = (event) => {
  //   setSize(event)
  // }

  // const handleChangeColor = (event => {
  //   setColor(event)
  // })

  // const handleChangeClarity = (event) => {
  //   setClarity(event)
  // }

  // const handleChangeCut = (event) => {
  //   setCut(event)
  // }


  return (
    <div className={styles.imageContainer}>
      <Link href={`/rings`} className={styles.linkBTN} prefetch={true}>
        <div className={styles.backNav}>{`< Previous`}</div>
      </Link>
          <div className={styles.titleMain}>{ring.title}</div> 
          <div className={styles.titleSubMain}>Natural Diamond</div>
      <div className={styles.containerDesktopGrid}>
        <div className={styles.videoGrid}>  
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
            <source src={`/jewellery/rings/${ring.title}/${ring.title}MP4/${ring.title}${ring.colour}.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
        {/* <div className={styles.videoGrid}> */}
          
        {/* <div className={styles.price}>TOTAL PRICE: <span>£{price.toFixed(0)}</span></div> */}
        
        {/* <div className={styles.textDropdown}>Select from the drop-down menu to update the price:</div> */}
        

        {/* DIAMOND CARAT */}
        {/* <div className={styles.textLabel}>CARAT SIZE</div>
        <div className={styles.containerGridDropdown}>
          <div className={styles.selectionContainer} align={'center'}>
            <select
              name="carat size"
              className={styles.dropdown} 
              onChange={(e) => handleChangeSize(e.target.value)}
            >
              <option value="0.30">0.30 Carat</option>
              <option value="0.40">0.40 Carat</option>
              <option value="0.50">0.50 Carat</option>
              <option value="0.60">0.60 Carat</option>
              <option value="0.70">0.70 Carat</option>
              <option value="0.80">0.80 Carat</option>
              <option value="0.90">0.90 Carat</option>
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
              <option value="2.10">2.10 Carat</option>
              <option value="2.20">2.20 Carat</option>
              <option value="2.30">2.30 Carat</option>
              <option value="2.40">2.40 Carat</option>
              <option value="2.50">2.50 Carat</option>
              <option value="2.60">2.60 Carat</option>
              <option value="2.70">2.70 Carat</option>
              <option value="2.80">2.80 Carat</option>
              <option value="2.90">2.90 Carat</option>
              <option value="3.00">3.00 Carat</option>
            </select> 
            <Image
              src={`/down-arrow.png`}
              width={32}
              height={32}
              alt={`GIA Logo`}
              quality={100}
              className={styles.arrow}
            />
          </div>
          <div className={styles.containerLetterI} onClick={(e) => setToggleCarat(!toggleCarat)}>
            <Image
                src={`/letter-i.png`}
                width={32}
                height={32}
                alt={`information icon`}
                quality={100}
                className={styles.letterI}
            />
          </div>
          <div className={toggleCarat ? styles.containerModal : styles.displayNone}> 
            <div className={styles.titleModal}>
              CARAT WEIGHT
            </div> 
            <div className={styles.contentModel}>
              When diamonds are mined, large gems are discovered much less frequently than small ones. 
              This makes large diamonds much rarer and therefore much more valuable. 
              In fact, because of the rarity, diamond prices rise exponentially with carat weight.
              This means, for example, that a 1 carat diamond of a given quality will always be worth significantly more than two 0.5 carat diamonds of the same quality.
            </div>
          </div> 
        </div>   */}

        {/* DIAMOND CUT */}
        {/* <div className={styles.textLabel}>CUT</div>
        <div className={styles.containerGridDropdown}>
        <div className={styles.selectionContainer} align={'center'}>
            <select
              name="cut"
              className={styles.dropdown}
              onChange={(e) => handleChangeCut(e.target.value)}
            >
              <option value="0.75">Good</option>
              <option value="0.90">Very Good</option>
              <option value="1.00">Excellent</option>
            </select>
            <Image
              src={`/down-arrow.png`}
              width={32}
              height={32}
              alt={`GIA Logo`}
              quality={100}
              className={styles.arrow}
            />
        </div>
        <div className={styles.containerLetterI} onClick={(e) => setToggleCut(!toggleCut)}>
            <Image
                src={`/letter-i.png`}
                width={32}
                height={32}
                alt={`information icon`}
                quality={100}
                className={styles.letterI}
            />
        </div>
        <div className={toggleCut ? styles.containerModal : styles.displayNone}> 
          <div className={styles.titleModal}>
            DIAMOND CUT
          </div> 
          <div className={styles.contentModel}>
          The cut of a diamond is the most crucial factor in determining its brilliance and overall beauty. 
          Unlike shape, which refers to the outline of the diamond, the cut refers to how well the diamond's 
          facets interact with light. A well-cut diamond will capture and reflect light to create a stunning display of brightness, fire, 
          and scintillation. These aspects are what make a diamond sparkle, as light enters the stone, bounces within it, 
          and exits in a captivating dance of light. 
          The precision of the cut, from the angles of the facets to the symmetry and polish, can dramatically impact the diamond&apos;s value, making it a key consideration for those seeking a truly radiant gem.
          </div>
        </div> 
        </div> */}

        {/* DIAMOND CLARITY */}
        {/* <div className={styles.textLabel}>CLARITY</div>
        <div className={styles.containerGridDropdown}>
        <div className={styles.selectionContainer} align={'center'}>
            <select
              name="Clarity"
              className={styles.dropdown} 
              onChange={(e) => handleChangeClarity(e.target.value)}
            >
              <option value="SI2">SI2</option>
              <option value="SI1">SI1</option>
              <option value="VS2">VS2</option>
              <option value="VS1">VS1</option>
              <option value="VVS2">VVS2</option>
              <option value="VVS1">VVS1</option>
              <option value="IF">IF</option>
            </select> 
            <Image
              src={`/down-arrow.png`}
              width={32}
              height={32}
              alt={`GIA Logo`}
              quality={100}
              className={styles.arrow}
            />  
        </div>
        <div className={styles.containerLetterI} onClick={(e) => setToggleClarity(!toggleClarity)}>
            <Image
                src={`/letter-i.png`}
                width={32}
                height={32}
                alt={`information icon`}
                quality={100}
                className={styles.letterI}
            />
        </div>
        <div className={toggleClarity ? styles.containerModal : styles.displayNone}> 
          <div className={styles.titleModal}>
            DIAMOND CLARITY
          </div> 
          <div className={styles.contentModel}>
            Diamond clarity refers to the purity and cleanliness of a diamond, encompassing the presence or absence of internal inclusions and external blemishes. 
            These natural imperfections, often microscopic, can affect how light passes through the diamond, potentially diminishing its brilliance. 
            Clarity is graded on a scale from Flawless, indicating no visible inclusions or blemishes under 10x magnification, to Included, where imperfections are more noticeable. While inclusions are typically invisible to the naked eye in higher clarity grades, they play a significant role in determining the diamond&apos;s overall quality and value. 
            A diamond with high clarity exudes a sense of purity and elegance, enhancing its visual appeal and making it a prized possession.
          </div>
        </div> 
        </div>
   */}
        {/* DIAMOND COLOUR */}
        {/* <div className={styles.textLabel}>COLOUR</div> 
        <div className={styles.containerGridDropdown}>
        <div className={styles.selectionContainer} align={'center'}>
          <select
                name="Colour"
                className={styles.dropdown} 
                onChange={(e) => handleChangeColor(e.target.value)}
              >
                <option value="h">H</option>
                <option value="g">G</option>
                <option value="f">F</option>
                <option value="e">E</option>
                <option value="d">D</option>
          </select>
          <Image
            src={`/down-arrow.png`}
            width={32}
            height={32}
            alt={`GIA Logo`}
            quality={100}
            className={styles.arrow}
          />
        </div>
        <div className={styles.containerLetterI} onClick={(e) => setToggleColour(!toggleColour)}>
            <Image
                src={`/letter-i.png`}
                width={32}
                height={32}
                alt={`information icon`}
                quality={100}
                className={styles.letterI}
            />
        </div>
        <div className={toggleColour ? styles.containerModal : styles.displayNone}> 
          <div className={styles.titleModal}>
            DIAMOND COLOUR
          </div> 
          <div className={styles.contentModel}>
            Diamond color refers to the subtle variations in tone that can affect a diamond&apos;s overall appearance and value. 
            While most diamonds may appear colorless at first glance, they often contain slight traces of color, usually yellow or brown, which can influence their brilliance. 
            The Gemological Institute of America (GIA) grades diamond color on a scale from D (completely colorless) to Z (noticeably colored), with colorless diamonds being the most rare and highly prized. 
            A diamond&apos;s color, or lack thereof, is essential in determining its beauty, as a purer, less colored diamond allows more light to pass through and reflect, creating a bright and radiant look. 
            The finest diamonds, those closest to colorless, are cherished for their pure, icy brilliance that adds to their timeless allure.
          </div>
        </div> 
        </div> */}


        {/* METAL TYPE */}
        {/* <div className={styles.textLabel}>METAL TYPE</div>   */}
        {/* <div className={styles.containerGridDropdown}>
        <div className={styles.selectionContainer} align={'center'}>
            <select
              name="Metal Type"
              className={styles.dropdown} 
              onChange={(e) => handleChangeColor(e.target.value)}
            >
              <option value="">{ring.metal}</option>
              
            </select>
            <Image
              src={`/down-arrow.png`}
              width={32}
              height={32}
              alt={`GIA Logo`}
              quality={100}
              className={styles.arrow}
            />
        </div>
        <div className={styles.containerLetterI} onClick={(e) => setToggleMetal(!toggleMetal)}>
            <Image
                src={`/letter-i.png`}
                width={32}
                height={32}
                alt={`information icon`}
                quality={100}
                className={styles.letterI}
            />
        </div>
        <div className={toggleMetal ? styles.containerModal : styles.displayNone}> 
          <div className={styles.titleModal}>
            METAL TYPE
          </div> 
          <div className={styles.contentModel}>
            The metal type of a diamond ring plays a crucial role in both its aesthetic appeal and durability, complementing the brilliance of the diamond while ensuring the ring&apos;s longevity. 
            Commonly used metals include platinum, white gold, yellow gold, and rose gold, each offering a distinct look and feel. 
            Platinum, known for its strength and hypoallergenic properties, provides a sleek, modern backdrop that enhances the diamond&apos;s sparkle. 
            White gold, with its bright, silvery hue, is a popular choice for its versatility and classic elegance. 
            Yellow gold exudes warmth and tradition, creating a striking contrast that highlights the diamond's clarity and fire. 
            Rose gold, with its romantic pinkish tint, adds a touch of vintage charm and uniqueness to the ring. 
            The choice of metal not only reflects personal style but also affects the ring&apos;s durability, maintenance, 
            and how the diamond is perceived, making it a key factor in the overall design of the diamond ring.
          </div>
        </div> 
        </div> */}
        {/* </div> */}
        <div>

          <div className={styles.descriptionMobile}>
            {ring.descriptionMobile}
          </div>
          {/* <Link href="tel:07976753254" className={styles.linkBTN}>
            <div className={styles.BTNappointment} align="center">Request an Appointment</div>
          </Link> */}
          {/* BTN */}
        <div className={styles.heroBtn}>
            <Link href="tel:07976 753 254" className={styles.linkBTN}>CALL NOW</Link>
        </div>
        <div className={styles.heroBtn}>
            <Link
            href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
            className={styles.linkBTN}
            >
            WHATSAPP
            </Link>
        </div>
        <div className={styles.heroBtnDesktop}>07976 753 254</div>
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
        </div>
       
      </div>

      {/* <div className={styles.titleSub}>{ring.title}</div> */}
      {/* <div className={styles.priceAdditional}>£{price.toFixed(0)}</div> */}
      {/* <div className={styles.textDropdown}>The price is inclusive of VAT and delivery</div> */}
      <div className={styles.containerGIAGrid}>
        <div className={styles.containerGIA}>
          <Image
            src={`/GIA_Logo.png`}
            width={500}
            height={164.5}
            alt={`GIA Logo`}
            quality={100}
            className={styles.imageGIA}
          />
          <div className={styles.textGIA}>
            The Gemological Institute of America (GIA) certification is the gold standard in the diamond industry, 
            renowned for its meticulous and unbiased evaluation of diamonds. A GIA-certified diamond undergoes a rigorous assessment process, 
            ensuring its quality, authenticity, and value.
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
          <div className={styles.textGIA}>
          The FGA (Fellowship of the Gemmological Association) is a prestigious designation awarded by the Gemmological Association of Great Britain (Gem-A). It represents the highest level of professional certification in gemology, demonstrating advanced expertise in the identification, grading, and evaluation of gemstones. 
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
          <div className={styles.textGIA}>
            The London Diamond Bourse is a prestigious trade organization and marketplace at the heart of London&apos;s diamond industry. 
            Established to support the trade of diamonds, gemstones, and jewellery, it provides a secure and professional environment for members to conduct business.
          </div>
        </div>
      </div>  
    </div>
  )
}

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