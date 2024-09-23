import Link from "next/link";
import Image from "next/image";
import styles from './diamonds.module.css'

export default async function Jewellery() {

  
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
          <Link href={'/Jewellery'} className={styles.backLinkBTN} prefetch={true}>
                <div className={styles.backNav}>
                    {'< Jewellery'}
                </div>
          </Link>
  
          <div className={styles.tagline}>Understanding Diamonds and the 4 C's</div>

          <div className={styles.content}>
          Natural diamonds have captivated the human imagination for centuries, representing wealth, 
          love, and timeless beauty. Formed deep within the Earth under immense heat and pressure, 
          natural diamonds are prized for their rarity and brilliant sparkle. When purchasing a diamond, 
          the quality and value are assessed based on the "4 C's: Cut, Color, Clarity, and Carat weight. 
          These four factors significantly influence the diamond's appearance and price. 
          Let&apos;s dive deeper into these characteristics to understand how they define a diamond&apos;s worth.
          </div>

          <div className={styles.containerImage}>
          <Image
              src={"/jewellery/rings/diamond_earring_stud.png"}
              width={1456}
              height={816}
              quality={100}
              alt='hero image mobile'
              className={styles.imageHeroMobile}
          />
          </div>

          <ol className={styles.orderedList}>
            <li className={styles.itemList}>The Cut
            <div className={styles.contentList}>
                Cut refers to how well a diamond is shaped and faceted by a skilled craftsman. 
                It is the only one of the 4 C&apos;s directly influenced by human effort. 
                While diamonds come in various shapes (round, oval, princess, etc.), 
                the cut&apos;s quality determines how well the diamond reflects light.
                A well-cut diamond sparkles with brilliance and fire, 
                while a poorly cut one appears dull, regardless of its size or clarity.
            </div>
            <div className={styles.contentTitleSub}>Key Elements of a Cut</div>
            <ul>
                <li className={styles.itemListUL}><span>Brightness:</span> Refers to the total light reflected from a diamond.</li>
                <li className={styles.itemListUL}><span>Fire:</span> The dispersion of light into the colors of the spectrum.</li>
                <li className={styles.itemListUL}><span>Scintillation:</span> The sparkle or flashes of light that occur when the diamond moves.</li>
            </ul>
            <div className={styles.contentList}>
                The Gemological Institute of America (GIA) grades diamond cuts from Excellent to Poor. 
                An excellent cut maximizes light reflection, making the diamond shine brighter.
            </div>
          </li>
          <li className={styles.itemList}>
            The Colour
            <div className={styles.contentList}>
                Diamonds come in a variety of colors, ranging from colorless (the most valuable) to yellow or brown. 
                The less color a diamond has, the higher its value. 
                The GIA color grading scale ranges from D (completely colorless) to Z (light yellow or brown).
            </div>
            <ul>
                <li className={styles.itemListUL}><span>D-F:</span> Completely colorless and very rare.</li>
                <li className={styles.itemListUL}><span>G-J:</span> Near-colorless, offering a good balance of value and appearance.</li>
                <li className={styles.itemListUL}><span>K-M:</span> Faint yellow, noticeable to the naked eye.</li>
                <li className={styles.itemListUL}><span>N-Z:</span> Very light to light yellow, less expensive but with a visible hue.</li>
            </ul>
            <div className={styles.contentList}>
                Although most people strive for a colorless diamond, some diamonds with intense and rare colors, 
                like pink, blue, or green (also known as fancy diamonds), 
                can be even more valuable due to their rarity.
            </div>
          </li>
          <li className={styles.itemList}>Clarity
            <div className={styles.contentList}>
                Clarity measures the presence of internal flaws (inclusions) or external imperfections (blemishes). 
                These imperfections are often microscopic and don&apos;t significantly affect the beauty of the diamond 
                to the naked eye, but they do influence the value. 
                The fewer inclusions or blemishes, the higher the clarity grade and the more valuable the diamond.
            </div>
            <div className={styles.contentList}>
              The GIA clarity scale includes the following grades:
            </div>
            <ul>
                <li className={styles.itemListUL}><span>FL (Flawless):</span> No inclusions or blemishes under 10x magnification. Extremely rare.</li>
                <li className={styles.itemListUL}><span>IF (Internally Flawless):</span> No inclusions, only very small surface blemishes.</li>
                <li className={styles.itemListUL}><span>VVS1 and VVS2 (Very Very Slightly Included):</span>  Inclusions are difficult to detect under magnification.</li>
                <li className={styles.itemListUL}><span>VS1 and VS2 (Very Slightly Included):</span> Inclusions are somewhat easy to detect under magnification but are not visible to the naked eye.</li>
                <li className={styles.itemListUL}><span>SI1 and SI2 (Slightly Included):</span> Inclusions are noticeable under magnification and may be visible to the naked eye.</li>
                <li className={styles.itemListUL}><span>I1, I2, and I3 (Included):</span> Inclusions are visible under magnification and may affect the diamond's brilliance.</li>
            </ul>
          </li>
          <li className={styles.itemList}>Carat
            <div className={styles.contentList}>
                Carat weight refers to the diamond&apos;s size. One carat equals 200 milligrams. 
                While carat weight is often equated with size, it&apos;s important to remember that 
                two diamonds of the same carat weight can appear differently in size based on their cut quality. 
                Additionally, a larger carat weight doesn't always mean a better diamond. 
                A smaller diamond with an excellent cut, high clarity, 
                and color can be far more beautiful and valuable than a larger diamond with lesser quality.
            </div>
            <div className={styles.contentTitleSub}>
                Price and Carat Weight
            </div>
            <div className={styles.contentList}>
                Diamonds are priced per carat, and the price increases exponentially as the carat weight goes up, 
                particularly for diamonds over 1 carat. For instance, a 1-carat diamond is not simply double the 
                price of a 0.50-carat diamond—it is significantly more due to the rarity of finding larger diamonds in nature.
            </div>
          </li>
          </ol>
  
          <div className={styles.containerImage}>
          <Image
              src={"/jewellery/rings/balancing_scales.png"}
              width={1456}
              height={816}
              quality={100}
              alt='hero image mobile'
              className={styles.imageHeroMobile}
          />
          </div>
          
          <div className={styles.tagline}>The Perfect Balance: The 4 C's Working Together</div>
          <div className={styles.content}>
            When selecting a diamond, all four C&apos;s must be considered together. 
            A diamond with a perfect cut but poor clarity or color will not be as valuable or visually stunning 
            as a diamond that balances these elements. Depending on your budget, it&apos;s 
            often recommended to prioritize cut quality to ensure the best sparkle, 
            followed by carat size, and then color and clarity based on personal preferences.
          </div>

          <div className={styles.tagline2}>
            Expert Tips for Consumers
          </div>
          <ol className={styles.orderedList}>
            <li className={styles.itemListUL}>
            <span>Cut Is King:</span> Always prioritize cut over carat weight or clarity, as a well-cut diamond will shine brighter and appear larger.
            </li>
            <li className={styles.itemListUL}>
            <span>Don&apos;t Overpay for Clarity:</span> Inclusions are often invisible to the naked eye, so consider diamonds with VS or SI grades to get more value.
            </li> 
            <li className={styles.itemListUL}>
            <span>Consider Near-Colorless Diamonds:</span>Consider Near-Colorless Diamonds: G-J diamonds are often indistinguishable from higher-graded diamonds in terms of color, offering better value.
            </li> 
            <li className={styles.itemListUL}>
            <span>Balance Carat with Quality:</span> A larger diamond isn&apos;t always better; focus on a balance of size and quality.
            </li>
          </ol>

          <div className={styles.tagline2}>
            Conclusion
          </div>

          <div className={styles.contentBottom}>
            Natural diamonds are unique marvels of nature, each with its own character defined by the 4 C&apos;s: 
            Cut, Colour, Clarity, and Carat weight. Understanding these characteristics allows buyers to make 
            informed decisions, ensuring they choose a diamond that not only fits their budget but also represents 
            their personal style and values. Whether you're seeking a stunning engagement ring or an investment piece, 
            mastering the 4 C&apos;s is essential in finding the perfect diamond that sparkles with 
            brilliance and stands the test of time.
          </div>
        
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
  
       
      </div>
    )
  }