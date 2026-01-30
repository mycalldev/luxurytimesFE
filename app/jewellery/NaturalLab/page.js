
import Link from "next/link";
import Image from "next/image";
import styles from './naturalLab.module.css'


export default function NaturalLab() {

  return (
    <div>
      
        {/* HERO SECTION MOBILE */}

        <div className={styles.heroMobileContainer}>
          <Image
            src={"/jewellery/rings/natural_vs_lab.png"}
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

        <div className={styles.tagline}>Natural Vs Lab</div>
        <div className={styles.content}>
            When it comes to diamonds, the debate between natural and lab-grown has become 
            a hot topic in recent years. Both types are visually identical and can sparkle just as brilliantly, 
            but there are key differences that set them apart. Here's a quick comparison to help you 
            understand how natural diamonds and lab-grown diamonds stack up against each other.
        </div>

        <ol className={styles.orderedList}>
            <li className={styles.itemList}>
                <div className={styles.titleList}>Origin</div>
                <ul>
                    <li className={styles.unorderedList}>
                        <span>Natural Diamonds:</span> Formed over billions of years deep within the Earth under extreme heat and pressure. 
                        They are mined from the Earth, making them rare and unique geological treasures.
                    </li>
                    <li className={styles.unorderedList}>
                        <span>Lab-Grown Diamonds:</span> Created in a controlled laboratory environment using advanced technology that mimics the natural diamond formation process. 
                        These diamonds can be produced in a matter of weeks, making them more readily available.
                    </li>
                </ul>
            </li>
            <li className={styles.itemList}>
                <div className={styles.titleList}>Cost</div>
                <ul>
                    <li className={styles.unorderedList}>
                        <span>Natural Diamonds:</span> Because of their rarity and the labor-intensive mining process, 
                        natural diamonds tend to be more expensive, especially for high-quality stones.
                    </li>
                    <li className={styles.unorderedList}>
                        <span>Lab-Grown Diamonds:</span> Typically 20-40% cheaper than natural diamonds of the same quality,
                        making them an attractive option for budget-conscious buyers.
                    </li>
                </ul>

            </li>
            <li className={styles.itemList}>
                <div className={styles.titleList}>Environmental Impact</div>
                <ul>
                    <li className={styles.unorderedList}>
                        <span>Natural Diamonds:</span> Mining can have a significant environmental impact, 
                        including land disruption, water use, and energy consumption. 
                        However, efforts are being made toward more ethical and sustainable mining practices.
                    </li>
                    <li className={styles.unorderedList}>
                        <span>Lab-Grown Diamonds:</span> Generally considered more environmentally friendly since they don&apos;t require mining. However, 
                        the energy-intensive processes used in labs can still have an ecological footprint, depending on the energy sources used.
                    </li>
                </ul>
            </li>
            <li className={styles.itemList}>
            <div className={styles.titleList}>Apearance & Quality</div>
            <ul>
                <li className={styles.unorderedList}>
                    <span>Natural Diamonds:</span> Each natural diamond is unique, with slight variations in inclusions and imperfections, adding to their character and appeal.
                </li>
                <li className={styles.unorderedList}>
                    <span>Lab-Grown Diamonds:</span> Identical in chemical, physical, and optical properties to natural diamonds.
                    Without advanced equipment, it&apos;s nearly impossible to distinguish them from natural diamonds.</li>
            </ul>


            </li>
            <li className={styles.itemList}>
            <div className={styles.titleList}>Resale & Value</div>
            <ul>
                <li className={styles.unorderedList}>
                    <span>Natural Diamonds:</span> Tend to hold their value better over time due to their 
                    rarity and market demand, especially high-quality stones.
                </li>
                <li className={styles.unorderedList}>
                    <span>Lab-Grown Diamonds:</span> Depreciate faster and generally have lower resale value because they are not as rare and can be mass-produced.
                </li>
            </ul>
            </li>
        </ol>

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
            
        <div className={styles.containerImage}>
          <Image
              src={"/jewellery/rings/tennis_bracelet.png"}
              width={1456}
              height={816}
              quality={100}
              alt='hero image mobile'
              className={styles.imageHeroMobile}
          />
          </div>

          <div className={styles.titleSub}>Conclusion</div>
          <div className={styles.contentBottom}>
            Both natural and lab-grown diamonds offer beautiful, ethical, 
            and sustainable options for jewelry lovers. If you value tradition, rarity, and long-term value,
            a natural diamond might be for you. However, if you're looking for a more 
            affordable and environmentally friendly option, lab-grown diamonds provide an excellent 
            alternative without compromising on beauty or quality. 
            Ultimately, the choice comes down to personal values and preferences.
          </div>
    </div>
  )
}
