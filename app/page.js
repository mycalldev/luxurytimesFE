import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import ReviewSwiper from './components/ReviewSwiper'
import Carousel from './components/Carousel'

// Define metadata for the page using Next.js Metadata API
export const metadata = {
  title: 'Luxury Times - Exclusive Luxury Watches',
  description: 'Discover premium luxury watches at Luxury Times. Authorized dealer for Rolex, Patek Philippe, and Audemars Piguet.',
  openGraph: {
    title: 'Luxury Times - Exclusive Luxury Watches',
    description: 'Discover premium luxury watches at Luxury Times. Authorized dealer for Rolex, Patek Philippe, and Audemars Piguet.',
    images: [
      {
        url: '/favicon.ico',
        width: 500,
        height: 500,
      },
    ],
    type: 'website',
  },
};

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
    <>
      <main className={styles.main}>
      <section className={styles.containerFeature}>

    {/* HERO SECTION */}
      {/* MOBILE HERO */}
      <Image
        className={styles.heroImageMobile}
        src={'/home-page-hero-mobile.JPG'}
        width={2304}
        height={1536}
        alt={'hero image'}
        quality={100}
      />

      {/* DESKTOP HERO */}
      <Image
        className={styles.heroImageDesktop}
        src={'/home-page-hero-desktop.jpeg'}
        width={2304}
        height={644}
        alt={'hero image'}
        quality={100}
      />
      {/* MOBILE CONTACT */}
      <div className={styles.contactBTNContainerMobile}>
        <Link href="tel:07714611699" className={styles.linkBTN}>
            <div>CONTACT</div>
        </Link>
        </div>
      <div className={styles.contactBTNContainerMobile}>
        <Link
          href={"https://wa.me/447714611699?text=Hi%20Luxury%20Times...."} 
          className={styles.linkBTN}
        >
          <div>WHATSAPP</div>
        </Link>
      </div>
      {/* CONTACT DESKTOP */}
      <div className={styles.contactBTNContainerDesktop}>
        <div className={styles.titleContactDesktop}>CONTACT</div>
            <div className={styles.contactBTN}>07714 611 699</div>
      </div>


      
      {/* CATEGORY SECTION */}
      <section className={styles.categoryContainerGrid}>

          <div className={styles.imageCategoryContainer}>
            <Link href={`/rolex/rolex-categories`} prefetch={true} className={styles.viewBTNContainer}> 
              <Image src={'/Rolex_thumb.JPG'} className={styles.imageCategory} width={3272.5} height={2181.5} alt={'rolex datejust'} quality={100}  />
              <div className={styles.titleCategoryWatch}>Rolex</div>
              <div className={styles.viewDetailsBTN}>
                  <h4>View</h4>
              </div>
            </Link>
          </div>

          <div className={styles.imageCategoryContainer}>
            <Link href={`/patek-philippe/patek-philippe-categories`} prefetch={true} className={styles.viewBTNContainer}> 
              <Image src={'/PP_thumb.JPG'} className={styles.imageCategory} width={3272.5} height={2181.5} alt={'Patek Pillipe'} quality={100} />
              <div className={styles.titleCategoryWatch}>Patek Philippe</div>
              <div className={styles.viewDetailsBTN}>
                  <h4>View</h4>
              </div>
            </Link>
          </div>

          <div className={styles.imageCategoryContainer}>
            <Link href={`/audemars-piguet/audemars-piguet-categories`} className={styles.viewBTNContainer} prefetch={true}> 
              <Image src={'/category/APiguet.JPG'} className={styles.imageCategory} width={840} height={560} alt={'rolex datejust'} quality={100} />
              <div className={styles.titleCategoryWatch}>Audemars Piguet</div>
              <div className={styles.viewDetailsBTN}>
                  <h4>View</h4>
              </div>
            </Link>
          </div>
      </section>
</section>

      
      {/* <section>
        <div className={styles.imageCategoryContainer}>
          <Link href={"/Jewellery"} prefetch={true} className={styles.viewBTNContainer}>
            <Image
              src={`/jewellery/rings/image_hero_rings.png`}
              width={1456}
              height={816}
              alt={'hero image of rings'}
              className={styles.imageCategoryJewellery}
              quality={100}
            />
            <div className={styles.titleCategoryWatch}>Jewellery Collection</div>
            <div className={styles.viewDetailsBTN}>
                <h4>View</h4>
            </div>
          </Link>
        </div>
      </section> */}

      <div className={styles.spaceDesktop}></div>
            
      <Carousel />
      {/* GUIDES SECTION
      <section className={styles.guideHighlightGrid}>
       
          <h1 className={styles.titleGuides}>GUIDES</h1>

          <div className={styles.imageGuidesContainer}>
            <Image src={'/guides1.jpg'} 
              className={styles.imageGuides} 
              width={1110} 
              height={720} 
              alt={'image of watch'} 
              quality={100} 
            />
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
            {/* <div className={styles.conenttitleHighlights}>Rolex</div> */}
            <div className={styles.contentSubTitleHighlights}>Sky Dweller</div>
            <div className={styles.paragraphHighlights1}>Introducing the Rolex Sky-Dweller! Where elegance meets precsion.... With its iconic design, dual time zones, and....</div>
          </div> 
      <div className={styles.contactBTNContainerMobile}>
          <Link href={'/landing/SkyDweller'} className={styles.linkBTN} prefetch={true}>
            <div>Read More</div>
          </Link>
          </div>
      </section> 

      {/* BLOG SECTION */}
      <section>
         <h1 className={styles.titleBlogs}>BLOGS</h1>
         <Link href={'/blog'} prefetch={true}>
            <Image src={'/rolex_book.jpg'} width={2303} height={1536} className={styles.imageBlogs} alt={'image of Sky-dweller'} quality={100} />
          </Link>
            <div className={styles.contentHighlightsContainer}>
              {/* <div className={styles.conenttitleHighlights}>Watches</div> */}
              <div className={styles.contentSubTitleHighlights}>Time Investment</div>
              <div className={styles.paragraphHighlights1}>Investing in time.... Investing in your future! The Watch world has geneated a ton of interest in recent times and for good....</div>
            </div> 
      <div className={styles.contactBTNContainerMobile}>
          <Link href={'/blog'} className={styles.linkBTN} prefetch={true}>
            <div>Read More</div>
          </Link>
          </div>
      </section>
      </div>

      <ReviewSwiper review={review}/>
    </main>
    </>
  )
}
