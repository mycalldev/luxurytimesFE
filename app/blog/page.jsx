import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '../utils/shopify';
import styles from './blog.module.css';

// Generate metadata
export async function generateMetadata() {
  return {
    title: 'Blog - Luxury Times',
    description: 'Read our latest articles about luxury watches, market trends, and expert insights.',
  };
}

export default async function BlogPage() {
  
  const articles = await getAllArticles('News');

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>BLOG</h1>
      
      <div className={styles.articlesGrid}>
        {articles.map(({ node: article }) => (
          <article key={article.id} className={styles.articleCard}>
            <Link href={`/blog/${article.handle}`}>
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
                <h2 className={styles.articleTitle}>{article.title}</h2>
                
                <div className={styles.articleMeta}>
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                  {article.author && <span> • {article.author.name}</span>}
                </div>
                
                {article.excerpt && (
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                )}
                
                <div className={styles.readMoreBtn}>Read More</div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      {articles.length === 0 && (
        <p className={styles.noArticles}>No articles published yet.</p>
      )}
    </main>
  );
}