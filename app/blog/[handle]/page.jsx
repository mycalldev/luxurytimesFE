import Image from 'next/image';
import Link from 'next/link';
import { getArticle } from '../../utils/shopify';
import styles from './article.module.css';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const article = await getArticle('News', params.handle);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image.url] : [],
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle('News', params.handle); 

  if (!article) {
    return (
      <main className={styles.container}>
        <h1>Article Not Found</h1>
        <Link href="/blog">← Back to Blog</Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Link href="/blog" className={styles.backLink}>
        ← Back to Blog
      </Link>

      <article className={styles.article}>
        {article.image && (
          <div className={styles.heroImage}>
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              width={1200}
              height={800}
              className={styles.image}
              quality={100}
              priority
            />
          </div>
        )}

        <div className={styles.articleHeader}>
          <h1 className={styles.title}>{article.title}</h1>
          
          <div className={styles.meta}>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
            {article.author && <span> • By {article.author.name}</span>}
          </div>
        </div>

        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}