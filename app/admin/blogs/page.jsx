'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabase } from '../../../app/lib/supabase';
import styles from './blogs.module.css';

// Component that uses searchParams and needs to be wrapped in Suspense
function BlogsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0
  });
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
    readTime: '2',
    featuredImage: '',
    status: 'draft'
  });
  const [expandedBlog, setExpandedBlog] = useState(null);
  // Get the Supabase client instance
  const supabase = getSupabase();

  useEffect(() => {
    console.log('Blogs page mounted');
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching blogs from database...');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      
      console.log('Blogs fetched successfully:', data);
      setBlogs(data || []);
      
      // Calculate stats
      if (data) {
        const published = data.filter(blog => blog.status === 'published').length;
        setStats({
          total: data.length,
          published: published,
          drafts: data.length - published
        });
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to fetch blogs: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create a blog data object that matches our schema
      const blogData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        meta_title: formData.metaTitle || null,
        meta_description: formData.metaDescription || null,
        meta_keywords: formData.metaKeywords || null,
        author: formData.author || null,
        publish_date: formData.publishDate || null,
        featured_image: formData.featuredImage || null,
        read_time: parseInt(formData.readTime) || null,
        status: formData.status || 'draft'
      };
      
      console.log('Preparing to save blog data:', blogData);
      
      let result;
      
      if (currentBlog) {
        // Update existing blog
        console.log('Updating existing blog with ID:', currentBlog.id);
        const { data, error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', currentBlog.id)
          .select();
          
        if (error) {
          console.error('Error updating blog:', error);
          throw new Error(`Failed to update blog: ${error.message || error}`);
        }
        
        console.log('Blog updated successfully:', data);
        result = data;
      } else {
        // Create new blog entry
        console.log('Creating new blog entry');
        
        const { data, error } = await supabase
          .from('blogs')
          .insert([blogData])
          .select();
          
        if (error) {
          console.error('Error inserting blog:', error);
          throw new Error(`Failed to insert blog: ${error.message || error}`);
        }
        
        result = data;
      }
      
      // Refresh blogs list
      await fetchBlogs();
      
      // Reset form
      setFormData({
        title: '',
        subtitle: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        author: '',
        publishDate: new Date().toISOString().split('T')[0],
        readTime: '2',
        featuredImage: '',
        status: 'draft'
      });
      
      setCurrentBlog(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving blog:', err);
      setError(err.message || 'Failed to save blog. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog) => {
    console.log('Editing blog with data:', blog);
    setCurrentBlog(blog);
    
    // Map database snake_case fields to form camelCase fields
    setFormData({
      title: blog.title || '',
      subtitle: blog.subtitle || '',
      metaTitle: blog.meta_title || '',
      metaDescription: blog.meta_description || '',
      metaKeywords: blog.meta_keywords || '',
      author: blog.author || '',
      publishDate: blog.publish_date || new Date().toISOString().split('T')[0],
      readTime: blog.read_time ? blog.read_time.toString() : '2',
      featuredImage: blog.featured_image || '',
      status: blog.status || 'draft'
    });
    
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Refresh blogs list
      await fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError(err.message || 'Failed to delete blog');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle metadata details
  const toggleMetadataDetails = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId);
  };

  if (isLoading && blogs.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className={styles.blogsContainer}>
      <header className={styles.blogsHeader}>
        <h1 className={styles.blogsTitle}>Blog Management Dashboard</h1>
        <button 
          onClick={() => {
            setCurrentBlog(null);
            setFormData({
              title: '',
              subtitle: '',
              metaTitle: '',
              metaDescription: '',
              metaKeywords: '',
              author: '',
              publishDate: new Date().toISOString().split('T')[0],
              readTime: '2',
              featuredImage: '',
              status: 'draft'
            });
            setShowForm(!showForm);
          }} 
          className={styles.addButton}
        >
          {showForm ? 'Cancel' : 'Add New Blog'}
        </button>
      </header>

      {/* Blog Stats Dashboard */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Entries</h3>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Published</h3>
          <p className={styles.statValue}>{stats.published}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Drafts</h3>
          <p className={styles.statValue}>{stats.drafts}</p>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <strong>Error:</strong> {error}
          <button 
            onClick={() => setError(null)} 
            className={styles.errorCloseButton}
          >
            ×
          </button>
        </div>
      )}

      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{currentBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
          <form onSubmit={handleSubmit} className={styles.blogForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.formLabel}>Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Blog Title"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subtitle" className={styles.formLabel}>Subtitle</label>
                <input
                  id="subtitle"
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Blog Subtitle"
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="metaTitle" className={styles.formLabel}>Meta Title</label>
                <input
                  id="metaTitle"
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Meta Title for SEO"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="metaDescription" className={styles.formLabel}>Meta Description</label>
                <input
                  id="metaDescription"
                  type="text"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Meta Description for SEO"
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="metaKeywords" className={styles.formLabel}>Meta Keywords</label>
              <input
                id="metaKeywords"
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Keywords separated by commas"
              />
              <small className={styles.formHelp}>Enter keywords separated by commas, e.g., "luxury, watches, rolex"</small>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="author" className={styles.formLabel}>Author</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Blog Author"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="readTime" className={styles.formLabel}>Read Time (minutes)</label>
                <input
                  id="readTime"
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="2"
                  min="1"
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="publishDate" className={styles.formLabel}>Publish Date</label>
                <input
                  id="publishDate"
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.formLabel}>Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={styles.formSelect}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="featuredImage" className={styles.formLabel}>Featured Image URL</label>
              <input
                id="featuredImage"
                type="text"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="/path/to/image.jpg"
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (currentBlog ? 'Update Blog' : 'Save Blog')}
            </button>
          </form>
        </div>
      )}

      <div className={styles.blogsList}>
        <h2 className={styles.sectionTitle}>Blog Entries</h2>
        
        {blogs.length === 0 ? (
          <div className={styles.emptyState}>
            No blog entries found. Add your first blog above.
          </div>
        ) : (
          <div className={styles.blogsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Title</div>
              <div className={styles.tableCell}>Author</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Publish Date</div>
              <div className={styles.tableCell}>Actions</div>
            </div>
            
            {blogs.map(blog => (
              <div key={blog.id}>
                <div className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <p className={styles.blogTitle}>{blog.title}</p>
                    <p className={styles.blogSubtitle}>{blog.subtitle}</p>
                    <button 
                      onClick={() => toggleMetadataDetails(blog.id)} 
                      className={styles.metaToggle}
                    >
                      {expandedBlog === blog.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  <div className={styles.tableCell}>{blog.author || 'N/A'}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${blog.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    {blog.publish_date ? new Date(blog.publish_date).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.blogActions}>
                      <button 
                        onClick={() => handleEdit(blog)} 
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)} 
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                {expandedBlog === blog.id && (
                  <div className={styles.metadataDetails}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Meta Title:</span>
                      <span className={styles.metaValue}>{blog.meta_title || 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Meta Description:</span>
                      <span className={styles.metaValue}>{blog.meta_description || 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Meta Keywords:</span>
                      <span className={styles.metaValue}>{blog.meta_keywords || 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Read Time:</span>
                      <span className={styles.metaValue}>{blog.read_time ? `${blog.read_time} minutes` : 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Featured Image:</span>
                      <span className={styles.metaValue}>{blog.featured_image || 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Created:</span>
                      <span className={styles.metaValue}>{blog.created_at ? new Date(blog.created_at).toLocaleString() : 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Last Updated:</span>
                      <span className={styles.metaValue}>{blog.updated_at ? new Date(blog.updated_at).toLocaleString() : 'Not set'}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main component that renders the wrapped BlogsContent component
export default function AdminBlogs() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading content...</p>
      </div>
    }>
      <BlogsContent />
    </Suspense>
  );
} 