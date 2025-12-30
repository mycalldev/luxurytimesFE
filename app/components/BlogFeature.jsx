import Image from 'next/image'
import Link from 'next/link'
import { getAllArticles } from '../utils/shopify'
import styles from './BlogFeature.module.css'
import Button from './Button'

export default async function BlogFeature({ limit = 3 }) {
  const articles = await getAllArticles('News')
  const featuredArticles = articles.slice(0, limit)

  if (featuredArticles.length === 0) {
    return null
  }

  return (
    <section className={styles.blogSection}>
      <h2 className={styles.sectionTitle}>Latest from Our Blog</h2>
      <p className={styles.sectionDescription}>
        Stay informed with our latest insights on luxury watches, market trends, and expert advice.
      </p>
      
      <div className={styles.articlesGrid}>
        {featuredArticles.map(({ node: article }) => (
          <article key={article.id} className={styles.articleCard}>
            <Link href={`/blog/${article.handle}`} className={styles.articleLink}>
              {article.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={article.image.url}
                    alt={article.image.altText || article.title}
                    width={800}
                    height={600}
                    className={styles.articleImage}
                    quality={90}
                  />
                </div>
              )}
              
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                
                <div className={styles.articleMeta}>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                  {article.author && (
                    <span className={styles.author}> • {article.author.name}</span>
                  )}
                </div>
                
                {article.excerpt && (
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <Button href="/blog" prefetch={true}>
          View All Articles
        </Button>
      </div>
    </section>
  )
}

