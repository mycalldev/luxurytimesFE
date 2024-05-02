
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import ReviewSwiper from './components/ReviewSwiper'

async function getReview() {
  
  const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/reviews', {
  
      next: {
          revalidate: 30,
      }
  })
  const data = await res.json()
  return data

}

export default async function Home() {

  const review = await getReview();
  return (
    <main className={styles.main}>

    {/* HERO SECTION */}
      {/* MOBILE HERO */}
      <Image
        className={styles.heroImageMobile}
        src={'/skydweller-landing-hero.JPG'}
        width={2304}
        height={1536}
        alt={'hero image'}
        quality={100}
      />

      {/* DESKTOP HERO */}
      <Image
        className={styles.heroImageDesktop}
        src={'/skydweller-landing-hero-desktop.jpeg'}
        width={2304}
        height={898}
        alt={'hero image'}
        quality={100}
      />

      <div className={styles.tagLine}>Luxury Times Ltd.... The Official Watch Dealership</div>

      {/* CTA */}
      <div className={styles.contactBTNContainer}>
        <Link href="tel:07976753254" className={styles.linkBTN}>Contact</Link>
      </div>

      
      {/* CATEGORY SECTION */}
          <h1 className={styles.titleBrands}>WATCH BRANDS</h1>
      <section className={styles.categoryContainerGrid}>

          <div className={styles.imageCategoryContainer}>
            <Link href={`/rolex/rolex-categories`} prefetch={true} className={styles.viewBTNContainer}> 
              <Image src={'/category/hulk_category.jpg'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100}  />
              <div className={styles.titleCategoryWatch}>Rolex</div>
              <div className={styles.viewDetailsBTN}>
                  <h4>View All</h4>
              </div>
            </Link>
          </div>

          <div className={styles.imageCategoryContainer}>
            <Link href={`/patek-philippe/patek-philippe-categories`} prefetch={true} className={styles.viewBTNContainer}> 
              <Image src={'/category/patek_category.jpg'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
              <div className={styles.titleCategoryWatch}>Patek Phillipe</div>
              <div className={styles.viewDetailsBTN}>
                  <h4>View All</h4>
              </div>
            </Link>
          </div>

          <div className={styles.imageCategoryContainer}>
            <Link href={`/audemars-piguet/audemars-piguet-categories`} className={styles.viewBTNContainer}> 
              <Image src={'/category/APiguet.JPG'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
              <div className={styles.titleCategoryWatch}>Audemars Piguet</div>
              <div className={styles.viewDetailsBTN}>
                  <h4>View All</h4>
              </div>
            </Link>
          </div>
      </section>

      {/* GUIDES SECTION */}
      <section className={styles.guideHighlightGrid}>
       
          <h1 className={styles.titleGuides}>GUIDES</h1>

          <div className={styles.imageGuidesContainer}>
            <Image src={'/cogs.jpg'} className={styles.imageGuides} width={1456} height={816} alt={'cogs for watch background'} quality={100} />
            <div className={styles.tagLine}>Check Out Our Latest Guides</div>
            <div className={styles.paragraphGuides}>Introducing our latest guides! We're thrilled to present a collection of expertly crafted resources designed to empower and inform you.</div>
            <Link href={'/guide'} className={styles.viewBTNContainer}>
              <div className={styles.guiedsBTN}>View</div>
            </Link>
          </div>
        </section>
       
      
      {/* HIGHLIGHT SECTION */}
      <div className={styles.blogHighlightGrid}>
       <section>
          <h1 className={styles.titleHighlights}>HIGHLIGHTS</h1>
          <Link href={'/landing/SkyDweller'} prefetch={true}>
            <Image src={'/highlight.JPG'} width={840} height={560} className={styles.imageHighlights} alt={'image of Sky-dweller'} quality={100} />
          </Link>
          <div className={styles.contentHighlightsContainer}>
            <div className={styles.conenttitleHighlights}>Rolex</div>
            <div className={styles.contentSubTitleHighlights}>Sky Dweller</div>
            <div className={styles.paragraphHighlights1}>Introducing the Rolex Sky-Dweller! Where elegance meets precsion.... With its iconic design, dual time zones, and....</div>
          </div> 
          <Link href={'/landing/SkyDweller'} className={styles.linkBTN} prefetch={true}>
            <div className={styles.highlightsBTN}>Read More</div>
          </Link>
      </section>

      {/* BLOG SECTION */}
      <section>
         <h1 className={styles.titleBlogs}>BLOGS</h1>
         <Link href={'/blog'} prefetch={true}>
            <Image src={'/blingToBullion.jpeg'} width={840} height={560} className={styles.imageBlogs} alt={'image of Sky-dweller'} quality={100} />
          </Link>
            <div className={styles.contentHighlightsContainer}>
              <div className={styles.conenttitleHighlights}>Watches</div>
              <div className={styles.contentSubTitleHighlights}>Time Investment</div>
              <div className={styles.paragraphHighlights1}>Investing in time.... Investing in your future! The Watch world has geneated a ton of interest in recent times and for good....</div>
            </div> 
          <Link href={'/blog'} className={styles.linkBTN} prefetch={true}>
            <div className={styles.blogsBTN}>Read More</div>
          </Link>
      </section>
      </div>

      <ReviewSwiper review={review}/>
    </main>
  )
}
