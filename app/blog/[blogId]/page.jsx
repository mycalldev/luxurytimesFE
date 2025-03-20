'use client';

import React, { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabase';
import ContactForm from '../../components/ContactForm';
import styles from './blogPage.module.css';

export default function BlogPage({ params }) {
  const { blogId } = params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const supabase = getSupabase();
        
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', blogId)
          .single();
          
        if (error) throw error;
        
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlog();
  }, [blogId]);
  
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!blog) return <div className={styles.notFound}>Blog post not found</div>;
  
  // Add debug log
  console.log('Blog data being passed to ContactForm:', {
    id: blog.id,
    title: blog.title
  });
  
  return (
    <div className={styles.blogPage}>
      <main className={styles.blogContent}>
        <h1 className={styles.blogTitle}>{blog.title}</h1>
        {blog.subtitle && <h2 className={styles.blogSubtitle}>{blog.subtitle}</h2>}
        
        {/* Debug information - only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            margin: '1rem 0',
            padding: '0.5rem',
            background: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '0.8rem'
          }}>
            <p><strong>Debug Info:</strong></p>
            <p>Blog ID: {blog.id}</p>
            <p>Blog Title: {blog.title}</p>
          </div>
        )}
        
        {blog.featured_image && (
          <div className={styles.featuredImageContainer}>
            <img 
              src={blog.featured_image} 
              alt={blog.title} 
              className={styles.featuredImage} 
            />
          </div>
        )}
        
        <div className={styles.blogMeta}>
          {blog.author && <span className={styles.author}>By {blog.author}</span>}
          {blog.publish_date && (
            <span className={styles.publishDate}>
              Published on {new Date(blog.publish_date).toLocaleDateString()}
            </span>
          )}
          {blog.read_time && <span className={styles.readTime}>{blog.read_time} min read</span>}
        </div>
        
        {/* Blog content would go here */}
        <div className={styles.blogBody}>
          <p>
            This is where the main blog content would be displayed. In a complete implementation,
            you would likely have the blog content stored in your database or as Markdown/HTML.
          </p>
        </div>
        
        {/* Contact form section */}
        <div className={styles.blogContactForm}>
          <ContactForm 
            contactTitle="Questions about this article?"
            contactDescription="If you have any questions about this article or would like more information, please fill out the form below."
            blogId={blog.id}
            blogTitle={blog.title}
          />
        </div>
      </main>
    </div>
  );
} 