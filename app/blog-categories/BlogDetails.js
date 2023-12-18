'use client'

import Image from "next/image";
import Link from "next/link";
import styles from './BlogDetails.module.css';


export default function BlogDetails( { blogDetails } ) {

  let orderedList1 = []
  if (blogDetails.orderList1 !== null) {
    orderedList1 = blogDetails.orderList1.split(',')
  }

  let orderedList2 = []
  if (blogDetails.orderList2 !== null) {
    orderedList2 = blogDetails.orderList2.split(',')
  }
  
  

  return (
    <main>
      {/* HERO MOBILE */}
        <div className={styles.imageHeroMobileContainer}>
          <Image 
              src={`/blogs/${blogDetails.imageThumbnail}/${blogDetails.imageHeroMobile}.jpg`} 
              width={blogDetails.imageWidthMobile} 
              height={blogDetails.imageHeightMobile} 
              style={{
                  width: '100%',
                  height: 'auto',
                }}
              alt='thumbnail of blog image' 
              quality={100} 
          />  
        </div>

        {/* HERO DESKTOP */}
        <div className={styles.imageHeroDesktopContainer}>
          <Image 
              src={`/blogs/${blogDetails.imageThumbnail}/${blogDetails.imageHeroDesktop}.jpg`} 
              width={blogDetails.imageWidthDesktop} 
              height={blogDetails.imageHeightDesktop} 
              style={{
                  width: '100%',
                  height: 'auto',
                }}
              alt='thumbnail of blog image' 
              quality={100} 
          />  
        </div>
<div className={styles.backBTN}>
<Link href={`/blogs`} className={styles.linkBTN}>
          {'< BLOGS'}
        </Link>
</div>
        
        <div className={styles.titleMain}>
            <h1>{blogDetails.blogTitle}</h1>
            <p className={styles.tagCompletion}>{blogDetails.tagCompletion}</p>
        </div>

        <div className={styles.contentMain}>
{/* CAPTION 1 */}
          <div className={blogDetails.caption1 ? styles.caption1 : styles.displayNone}>
            {blogDetails.caption1}
          </div>

{/* SUBTITLE 1 */}
          <div className={blogDetails.subTitle1 ? styles.subTitle : styles.displayNone}>
            {blogDetails.subTitle1}
          </div>
{/* DESCRIPTION 1 */}
            <div className={blogDetails.description1 ? styles.description : styles.displayNone}>
              {blogDetails.description1}
            </div>

{/* SUBTITLE 2 */}
<div className={blogDetails.subTitle2 ? styles.subTitle : styles.displayNone}>
            {blogDetails.subTitle2}
          </div>
{/* DESCRIPTION 2 */}
          <div className={blogDetails.description2 ? styles.description : styles.displayNone}>
            {blogDetails.description2}
          </div>

{/* SUBTITLE 3 */}
<div className={blogDetails.subTitle3 ? styles.subTitle : styles.displayNone}>
            {blogDetails.subTitle3}
          </div>
{/* DESCRIPTION 3 */}
<div className={blogDetails.description3 ? styles.description : styles.displayNone}>
            {blogDetails.description3}
          </div>

{/* ORDERLIST1 */}
          <div className={blogDetails.orderList1 ? styles.orderedList : styles.displayNone}>
            <ul>
            {orderedList1.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
            </ul>
          </div>

{/* IMAGEREF 1 */}
           {blogDetails.imageRef1 && <div className={styles.imageRef1Container}>
            <Image 
                src={`/blogs/${blogDetails.imageThumbnail}/${blogDetails.imageRef1}.jpg`} 
                width={1456} 
                height={816} 
                style={{
                    width: '100%',
                    height: 'auto',
                  }}
                alt='image of ref 1' 
                quality={100} 
              />  
           </div>}

{/* DESCRIPTION 4 */}
          <div className={blogDetails.description4 ? styles.description : styles.displayNone}>
            {blogDetails.description4}
          </div>
{/* DESCRIPTION 5 */}
<div className={blogDetails.description5 ? styles.description : styles.displayNone}>
            {blogDetails.description5}
          </div>
            
          </div>
    </main>
  )
}

