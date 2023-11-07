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
        src={'/hero_daytona.JPG'}
        width={1680}
        height={1120}
        alt={'hero image'}
        quality={100}
      />

      {/* DESKTOP HERO */}
      <Image
        className={styles.heroImageDesktop}
        src={'/hero_daytona_desktop.jpg'}
        width={3246}
        height={1014}
        alt={'hero image'}
        quality={100}
      />

      {/* CTA */}
      <div className={styles.contactBTNContainer}>
        <Image src={"/call.png"} width={25} height={25} alt={'phone icon'} quality={100} /> 
        <Link href="tel:07976753254" className={styles.linkBTN}>Contact</Link>
      </div>

      
      {/* CATEGORY SECTION */}
          <div className={styles.titleCategory}>CATEGORIES</div>
      <section className={styles.categoryContainerGrid}>

          <div className={styles.imageCategoryContainer}>
            <Image src={'/category/hulk_category.jpg'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100}  />
            <div className={styles.titleCategoryWatch}>Rolex</div>
            <Link href={`/rolex/rolex-categories`} prefetch={true} className={styles.viewBTNContainer}> 
              <div className={styles.viewDetailsBTN}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          </div>

          <div className={styles.imageCategoryContainer}>
            <Image src={'/category/patekphilippe.JPG'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
            <div className={styles.titleCategoryWatch}>Patek Phillipe</div>
            <Link href={`/patek-philippe/patek-philippe-categories`} prefetch={true} className={styles.viewBTNContainer}> 
              <div className={styles.viewDetailsBTN}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          </div>

          <div className={styles.imageCategoryContainer}>
            <Image src={'/category/APiguet.JPG'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
            <div className={styles.titleCategoryWatch}>Audemars Piguet</div>
            <Link href={`/audemars-piguet/audemars-piguet-categories`} className={styles.viewBTNContainer}> 
              <div className={styles.viewDetailsBTN}>
                  <h4>VIEW</h4>
              </div>
            </Link>
          </div>
      </section>

      {/* GUIDES SECTION */}
      <section className={styles.guideHighlightGrid}>
       
          <div className={styles.titleGuides}>GUIDES</div>

          <div className={styles.imageGuidesContainer}>
            <Image src={'/cogs.jpg'} className={styles.imageGuides} width={1456} height={816} alt={'cogs for watch background'} quality={100} />
            <div className={styles.tagGuides}>Check out our latest guides</div>
            <div className={styles.paragraphGuides}>Introducing our latest guides! We're thrilled to present a collection of expertly crafted resources designed to empower and inform you.</div>
            <Link href={'/guide'} className={styles.viewBTNContainer}>
              <div className={styles.guiedsBTN}>Veiw</div>
            </Link>
          </div>
        </section>
       
      
      {/* HIGHLIGHT SECTION */}
      <div className={styles.blogHighlightGrid}>
       <section>
          <div className={styles.titleHighlights}>HIGHLIGHTS</div>

          <Image src={'/highlight.JPG'} width={840} height={560} className={styles.imageHighlights} alt={'image of Sky-dweller'} quality={100} />
          
          <div className={styles.contentHighlightsContainer}>
            <div className={styles.conenttitleHighlights}>Rolex</div>
            <div className={styles.contentSubTitleHighlights}>Sky Dweller</div>
            <div className={styles.paragraphHighlights1}>Introducing the Rolex Sky-Dweller! Where elegance meets precsion.... With its iconic design, dual time zones, and....</div>
          </div> 
          <Link href={'/landing/SkyDweller'} className={styles.linkBTN} >
          <div className={styles.highlightsBTN}>Read More</div>
          </Link>
      </section>

      {/* BLOG SECTION */}
      <section>
        <div className={styles.titleBlogs}>BLOGS</div>
        <Image src={'/blingToBullion.jpeg'} width={840} height={560} className={styles.imageBlogs} alt={'image of Sky-dweller'} quality={100} />
        <div className={styles.contentHighlightsContainer}>
            <div className={styles.conenttitleHighlights}>Watches</div>
            <div className={styles.contentSubTitleHighlights}>Time Investment</div>
            <div className={styles.paragraphHighlights1}>Investing in time.... Investing in your future! The Watch world has geneated a ton of interest in recent times and for good....</div>
          </div> 
        {/* <div className={styles.tagBlogs}>Keep Up-To-Date with the latest gossip in horology</div> */}
        <Link href={'/landing/SkyDweller'} className={styles.linkBTN} >
          <div className={styles.blogsBTN}>Read More</div>
        </Link>
      </section>
      </div>

      <ReviewSwiper review={review}/>
    </main>
  )
}
