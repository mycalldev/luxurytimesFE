import React from 'react';
import Image from 'next/image';
import styles from './watch_rolex.module.css';

export default function RolexWatchBlog() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Timeless Allure of Rolex</h1>
        <p className={styles.subtitle}>A Luxury Times Exclusive</p>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/watch_blog/roleximages/image1.jpg" 
            alt="Rolex Submariner" 
            width={800} 
            height={500} 
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.imageCaption}>The iconic Rolex Submariner - A symbol of precision and luxury</div>
      </section>

      <article className={styles.content}>
        <section className={styles.introduction}>
          <h2>The Crown Jewel of Horology</h2>
          <p>
            In the realm of luxury timepieces, few brands command the respect and admiration that Rolex does. 
            At Luxury Times, we recognize that a Rolex is more than just a watch—it's a statement of achievement, 
            a testament to craftsmanship, and an heirloom to be passed down through generations.
          </p>
          <p>
            Founded in 1905 by Hans Wilsdorf, Rolex has consistently defined the standards of watchmaking excellence. 
            The brand's commitment to precision, innovation, and timeless design has made it the undisputed king of 
            luxury watches, adorning the wrists of world leaders, explorers, artists, and visionaries.
          </p>
        </section>


        <section className={styles.collectionSection}>
          <h2>The Prestigious Collections</h2>
          <p>
            Rolex's catalog is divided into distinct collections, each with its own character and purpose, yet all sharing 
            the brand's commitment to excellence. From the rugged Professional series to the elegant Classic line, there's 
            a Rolex for every discerning taste.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/watch_blog/roleximages/image3.jpg" 
                alt="Rolex GMT Master II" 
                width={700} 
                height={450} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>The Rolex GMT-Master II - The traveler's essential timepiece</div>
          </div>
          
          <p>
            The GMT-Master II, first introduced in 1982 as an evolution of the original GMT-Master, was designed with 
            international travelers in mind. This iconic timepiece allows wearers to track multiple time zones simultaneously 
            through its distinctive rotating bezel and additional 24-hour hand. The legendary two-tone bezel combinations, 
            including the famous "Pepsi" (red and blue) and "Batman" (black and blue), have become instantly recognizable 
            hallmarks of the collection. With its robust construction and practical functionality, the GMT-Master II 
            continues to be the preferred watch for pilots, business travelers, and global adventurers.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/watch_blog/roleximages/image4.jpg" 
                alt="Rolex Daytona" 
                width={700} 
                height={450} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>The Rolex Cosmograph Daytona - The ultimate racing chronograph</div>
          </div>
          
          <p>
            Introduced in 1963 and named after the famous Daytona International Speedway in Florida, the Cosmograph Daytona 
            was designed specifically for racing drivers. Its tachymetric scale on the bezel allows drivers to measure 
            average speeds up to 400 kilometers or miles per hour. The chronograph's precise timing capabilities and 
            legendary reliability have made it an icon among motorsport enthusiasts. From Paul Newman's famous association 
            with the model to its modern iterations in precious metals and Cerachrom bezels, the Daytona remains one of 
            the most coveted and collectible timepieces in the world.
          </p>
        </section>

        <section className={styles.luxurySection}>
          <h2>The Luxury Times Perspective</h2>
          <p>
            At Luxury Times, we believe that true luxury is defined by craftsmanship, heritage, and enduring value—qualities 
            that Rolex exemplifies. Each Rolex timepiece undergoes rigorous testing and is assembled by hand by master watchmakers, 
            ensuring unparalleled quality and reliability.
          </p>
          <p>
            The investment value of Rolex watches continues to appreciate, with vintage and limited-edition models fetching 
            impressive sums at auctions worldwide. Beyond their monetary worth, however, is the intangible value of wearing 
            a piece of horological history—a connection to a legacy of excellence that spans over a century.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/watch_blog/roleximages/image5.jpg" 
                alt="Rolex Submariner Hulk" 
                width={700} 
                height={450} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>The Rolex Submariner "Hulk" - The green giant of the collection</div>
          </div>
          
          <p>
            Introduced in 2010 and discontinued in 2020, the Rolex Submariner reference 116610LV—affectionately nicknamed 
            the "Hulk" by enthusiasts—has become one of the most coveted modern Rolex sports watches. Distinguished by its 
            vibrant green dial and matching green Cerachrom bezel, the Hulk represented a bold departure from Rolex's 
            traditionally conservative design approach. What began as a somewhat polarizing release quickly gained cult 
            status, with its value appreciating significantly after its discontinuation. The Hulk's decade-long production 
            run witnessed its transformation from an available luxury timepiece to a highly sought-after collector's item, 
            with secondary market prices more than doubling its original retail value. Its successor, the 126610LV (nicknamed 
            "Starbucks" or "Cermit"), features a black dial with green bezel but has not captured collectors' imagination 
            quite like the all-green Hulk.
          </p>
        </section>

        <section className={styles.craftSection}>
          <h2>The Art of Watchmaking</h2>
          <p>
            What sets Rolex apart is not just the finished product but the meticulous process behind it. From developing 
            their own alloys in-house (including their proprietary Everose gold and Oystersteel) to manufacturing their 
            own movements, Rolex maintains control over every aspect of production.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/watch_blog/roleximages/image6.jpg" 
                alt="Rolex Movement" 
                width={700} 
                height={450} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>The intricate Rolex movement - A marvel of mechanical engineering</div>
          </div>
          
          <p>
            The heart of every Rolex is its movement, or caliber. Rolex designs, develops, and manufactures its calibers 
            entirely in-house. These self-winding mechanical movements are certified chronometers, having passed the 
            Swiss Official Chronometer Testing Institute (COSC) tests, and then undergo further testing by Rolex after 
            being cased to ensure they meet the brand's stringent standards for precision, power reserve, shock resistance, 
            and magnetic resistance.
          </p>
        </section>

        
      </article>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Luxury Times | The Ultimate Guide to Exceptional Timepieces</p>
        <p>For inquiries about featured Rolex watches, please contact our horological experts.</p>
      </footer>
    </div>
  );
}
