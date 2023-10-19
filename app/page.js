import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>

    {/* Hero Section */}
      {/* Mobile Hero */}
      <Image
        className={styles.heroImageMobile}
        src={'/hero_daytona.JPG'}
        width={1680}
        height={1120}
        // layout="responsive"
        alt={'hero image'}
        quality={100}
      />

      {/* Desktop Hero */}
      <Image
        className={styles.heroImageDesktop}
        src={'/hero_daytona_desktop.jpg'}
        width={3246}
        height={1014}
        // layout="responsive"
        alt={'hero image'}
        quality={100}
      />

      {/* CTA */}
      <div className={styles.contactBTNContainer}>
        <Image src={"/call.png"} width={25} height={25} alt={'phone icon'} quality={100} /> 
        <Link href="tel:07976753254" className={styles.contactBTNLink}>Contact</Link>
      </div>

      
      {/* Category Section */}
      <section>
          <div className={styles.titleCategory}>CATEGORIES</div>

          <div className={styles.imageCategoryContainer}>
            <div className={styles.titleCategoryWatch}>Rolex</div>
            <Image src={'/category/hulk_category.jpg'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100}  />
          </div>

          <div className={styles.imageCategoryContainer}>
            <div className={styles.titleCategoryWatch}>Patek Phillipe</div>
            <Image src={'/category/PPhillipe.JPG'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
          </div>

          <div className={styles.imageCategoryContainer}>
            <div className={styles.titleCategoryWatch}>Audemars Piguet</div>
            <Image src={'/category/APiguet.JPG'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
          </div>
      </section>

      {/* Guides #section */}
      <section>
        <div className={styles.titleGuides}>GUIDES</div>
        <div className={styles.tagGuides}>Check out our latest guides</div>
        <div className={styles.imageGuidesContainer}>
          <Image src={'/cogs.jpg'} className={styles.imageGuides} width={1456} height={816} alt={'cogs for watch background'} quality={100} />
          <div className={styles.guiedsBTN}>Veiw</div>
        </div>
      </section>

      {/* Highlight Section */}
      <section>
        <div className={styles.titleHighlights}>HIGHLIGHTS</div>
        <Image src={'/highlight.JPG'} width={840} height={560} className={styles.imageHighlights} alt={'image of Sky-dweller'} quality={100} />
        <div className={styles.contentHighlightsContainer}>
          <div className={styles.conenttitleHighlights}>Rolex</div>
          <div className={styles.contentSubTitleHighlights}>Sky Dweller</div>
          <div className={styles.paragraphHighlights1}>Introducing the Rolex Sky-Dweller! Where elegance meets precsion.... With its iconic design, dual time zones, and....</div>
        </div> 
        <div className={styles.highlightsBTN}>Read More</div>
      </section>

      {/* Blog */}
      <section>
      <div className={styles.titleBlogs}>BLOGS</div>
      <Image src={'/blingToBullion.jpeg'} width={840} height={560} className={styles.imageBlogs} alt={'image of Sky-dweller'} quality={100} />
      <div className={styles.tagBlogs}>Keep Up-To-Date with the latest gossip in horology</div>
      <div className={styles.blogsBTN}>Read More</div>
      </section>
    </main>
  )
}
