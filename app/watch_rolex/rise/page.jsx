import React from 'react';
import Image from 'next/image';
import styles from '../watch_rolex.module.css';

export default function RiseOfLuxuryTimes() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}> The Rise of Luxury Times</h1>
        <p className={styles.subtitle}>Canary Wharf</p>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/footer_new.jpg" 
            alt="Luxury Watches" 
            width={1116.5} 
            height={744.25} 
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.imageCaption}>The epitome of luxury and precision</div>
      </section>

      <article className={styles.content}>
        <section className={styles.introduction}>
          <h2>The Humble Beginnings</h2>
          <p>
            Luxury Times began as a small family-run business with a passion for horology. Nestled in the heart of Canary Wharf, 
            the founders envisioned a boutique that would offer not just watches, but a curated experience of luxury and elegance.
          </p>
          <p>
            Over the years, the business has grown, yet it remains true to its roots—providing personalized service and 
            an unparalleled selection of timepieces from the world's most prestigious brands.
          </p>
        </section>

        <section className={styles.collectionSection}>
          <h2>The Prestigious Brands</h2>
          <p>
            At Luxury Times, we pride ourselves on offering a diverse range of luxury watches. From the timeless elegance 
            of Rolex to the avant-garde designs of Richard Mille, our collection caters to the discerning tastes of our clientele.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/audemars1.jpg" 
                alt="Audemars Piguet" 
                width={564}
                height={846} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>Audemars Piguet - A blend of tradition and innovation</div>
          </div>
          
          <p>
            Audemars Piguet, known for its Royal Oak collection, represents the perfect fusion of tradition and innovation. 
            Each timepiece is a testament to the brand's commitment to craftsmanship and excellence.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/patek2.jpg" 
                alt="Patek Philippe" 
                width={1660} 
                height={1106.5} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>Patek Philippe - The pinnacle of watchmaking artistry</div>
          </div>
          
          <p>
            Patek Philippe is synonymous with watchmaking artistry. Its timepieces are not only functional but also 
            masterpieces of design, cherished by collectors and connoisseurs alike.
          </p>
        </section>

        <section className={styles.luxurySection}>
          <h2>The Family Legacy</h2>
          <p>
            The heart of Luxury Times is its family legacy. Each generation has contributed to the business's growth, 
            bringing new ideas while preserving the core values of quality and customer satisfaction.
          </p>
          <p>
            As we look to the future, we remain committed to offering the finest luxury watches and an exceptional 
            shopping experience that reflects our passion for horology.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/richard1.jpg" 
                alt="Richard Mille" 
                width={1199} 
                height={1865} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>Richard Mille - The avant-garde of watchmaking</div>
          </div>
          
          <p>
            Richard Mille's avant-garde designs push the boundaries of traditional watchmaking. Known for its innovative 
            use of materials and technology, Richard Mille creates timepieces that are as much works of art as they are 
            feats of engineering.
          </p>
        </section>

        <section className={styles.craftSection}>
          <h2>The Art of Curation</h2>
          <p>
            At Luxury Times, we believe in the art of curation. Our selection process is meticulous, ensuring that each 
            watch we offer is a reflection of our commitment to excellence and our understanding of our clients' desires.
          </p>
          
          <div className={styles.imageGalleryItem}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/rise/rise1.jpg" 
                alt="Luxury Watch Collection" 
                width={700} 
                height={450} 
                className={styles.contentImage}
              />
            </div>
            <div className={styles.imageCaption}>A curated collection of the finest timepieces</div>
          </div>
          
          <p>
            Our curated collection is a testament to our dedication to quality and our passion for horology. Each piece 
            is selected not only for its beauty and craftsmanship but also for its ability to tell a story and evoke emotion.
          </p>
        </section>
      </article>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Luxury Times | The Ultimate Guide to Exceptional Timepieces</p>
        <p>For inquiries about our luxury watch collection, please contact our horological experts.</p>
      </footer>
    </div>
  );
} 