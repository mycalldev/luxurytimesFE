
import Link from "next/link";
import Image from "next/image";
import styles from './jewellery.module.css'
import ReviewSwiper from '../components/ReviewSwiper'



async function getReview() {
  
  const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/reviews', {
  
      next: {
          revalidate: 30,
      }
  })
  const data = await res.json()
  return data

}


export default async function Jewellery() {
  const review = await getReview();

  return (
    <div>
      
        {/* HERO SECTION MOBILE */}
        <div className={styles.heroMobileContainer}>
          <Image
            src={"/jewellery/rings/natural_diamond.png"}
            width={1456}
            height={816}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
          />
        </div>
        <div className={styles.heroDesktopContainer}>
          <Image
            src={"/jewellery/rings/natural_diamond_desktop.png"}
            width={1456}
            height={491}
            quality={100}
            alt='hero image mobile'
            className={styles.imageHeroMobile}
          />
        </div>

        <Link href={'/'} className={styles.backLinkBTN} prefetch={true}>
                <div className={styles.backNav}>
                    {'< Home'}
                </div>
        </Link>

        <div className={styles.tagline}>Luxury Times Jewellery</div>
        
        {/* BTN */}
        <div className={styles.heroBtn}>
                <Link href="tel:07976 753 254" className={styles.linkBTN}>CALL NOW</Link>
        </div>

        <div className={styles.whatsappBTN}>
            <Link
            href={"https://wa.me/447976753254?text=Hi%20Luxury%20Times...."} 
            className={styles.linkBTN}
            >
            WHATSAPP
            </Link>
        </div>
            <div className={styles.heroBtnDesktop}>07976 753 254</div>

        <div className={styles.containerGrid}>
        <div className={styles.itemGrid}>
          <Link href={'/rings'} className={styles.linkBTNDark} prefetch={true}>
            <div className={styles.containerImage}>
              <Image
                src={"/jewellery/rings/solitaire_hero.png"}
                width={1456}
                height={816}
                quality={100}
                alt='hero image mobile'
                className={styles.imageGrid}
              />
            </div>
            </Link>
            <div className={styles.titleSubCat}>Engagement Collection</div>
            <Link href={`/rings`} prefetch={true} className={styles.linkBTN}> 
              <div className={styles.viewDetailsBTNMobile}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          
          </div>

          <div className={styles.itemGrid}>
          <Link href={'/Jewellery/Diamonds'} className={styles.linkBTNDark} prefetch={true}>
            <div className={styles.containerImage}>
              <Image
                src={"/jewellery/rings/natural_diamond.png"}
                width={1456}
                height={816}
                quality={100}
                alt='hero image mobile'
                className={styles.imageGrid}
              />
            </div>
          </Link>
            <div className={styles.titleSubCat}>Diamonds</div>
            <Link href={`/Jewellery/Diamonds`} prefetch={true} className={styles.linkBTN}> 
              <div className={styles.viewDetailsBTNMobile}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          </div>

          <div className={styles.itemGrid}>
          <Link href={'/Jewellery/NaturalLab'} className={styles.linkBTNDark} prefetch={true}>
          <div className={styles.containerImage}>
              <Image
                src={"/jewellery/rings/natural_vs_lab.png"}
                width={1456}
                height={816}
                quality={100}
                alt='hero image mobile'
                className={styles.imageGrid}
              />
            </div>
            </Link>
            <div className={styles.titleSubCat}>Natural Vs Lab</div>
            <Link href={`/Jewellery/NaturalLab`} prefetch={true} className={styles.linkBTN}> 
              <div className={styles.viewDetailsBTNMobile}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          </div>
          <div className={styles.itemGrid}>
          <Link href={'/Jewellery/Rings'} className={styles.linkBTNDark} prefetch={true}>
          <div className={styles.containerImage}>
              <Image
                src={"/jewellery/rings/image_hero_rings.png"}
                width={1456}
                height={816}
                quality={100}
                alt='hero image mobile'
                className={styles.imageGrid}
              />
            </div>
            </Link>
            <div className={styles.titleSubCat}>Rings Guide</div>
            <Link href={`/Jewellery/Rings`} prefetch={true} className={styles.linkBTN}> 
              <div className={styles.viewDetailsBTNMobile}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          </div>
          
        </div>

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
            className={styles.imageGIA}
          />
          <div className={styles.textGIA}>
            The London Diamond Bourse is a prestigious trade organization and marketplace at the heart of London&apos;s diamond industry. 
            Established to support the trade of diamonds, gemstones, and jewellery, it provides a secure and professional environment for members to conduct business.
          </div>
        </div>

      </div>  
      <ReviewSwiper review={review}/>

     
    </div>
  )
}
