import Image from "next/image"
import Link from 'next/link'
import styles from './blogCategories.module.css'

async function getBlogs() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/blogs', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}

export default async function Blogs() {
  
    const blogs = await getBlogs()
    

    return (
        <main>
            <Image src={'/categoryBanner/blog_category_hero.jpg'} width={2912} height={1038} className={styles.imageHero} alt='hero image for blogs categroy' quality={100} />
            <h1 className={styles.titleMain}>BLOG COLLECTION</h1>
            
            {blogs.map((blog) => (
                <div key={blog._id}>
                    <div className={styles.imageThumbnailContainer}>
                      <Image src={`/blogs/${blog.imageRef1}.JPG`} width={1680} height={1120} className={styles.imageThumbnail} alt='thumbnail of blog image' quality={100} />
                    </div>
                    <div className={styles.contentContainer}>
                        
                        <div className={styles.blogTitle}>{blog.blogTitle}</div>
                        <div className={styles.blogSubTitle1}>{blog.subTitle1}</div>
                        <div className={styles.flexReadTime}>
                            <div className={styles.readTime}>Read Time:</div> 
                            <div>{blog.minuteRead} minutes</div>
                        </div>
                       
                    </div>
                    
                </div>
            ))}
            
        </main>
    )
}