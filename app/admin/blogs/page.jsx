'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import styles from './blogs.module.css';

// Component that uses searchParams and needs to be wrapped in Suspense
function BlogsContent() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasTimestamp = searchParams.has('t');
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
    readTime: '2 minute read',
    featuredImage: '',
    status: 'draft'
  });
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [schemaError, setSchemaError] = useState(null);

  useEffect(() => {
    console.log('Blogs page mounted, auth state:', { loading, isAuthenticated, user });
    console.log('Has timestamp parameter:', hasTimestamp);
    
    // If we have a timestamp parameter, we can assume we came from an authenticated route
    if (hasTimestamp) {
      setIsLoading(false);
      fetchBlogs();
      checkDatabaseSchema();
      return;
    }
    
    // Otherwise, check authentication status
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    fetchBlogs();
    checkDatabaseSchema();
  }, [loading, isAuthenticated, router, hasTimestamp]);

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
      // Create a simplified blog data object with only essential fields
      // This should work even if some columns are missing in the database
      const blogData = {
        title: formData.title, // Required field
        status: formData.status || 'draft' // Required field with default
      };
      
      // Add optional fields that should work in most cases
      if (formData.subtitle) blogData.subtitle = formData.subtitle;
      if (formData.author) blogData.author = formData.author;
      
      // Try to add the metadata fields, but don't let them break the submission
      try {
        // Add these conditionally with full error handling
        if (formData.metaTitle) blogData.meta_title = formData.metaTitle;
        if (formData.metaDescription) blogData.meta_description = formData.metaDescription;
        if (formData.publishDate) blogData.publish_date = formData.publishDate;
        if (formData.readTime) blogData.read_time = formData.readTime;
        if (formData.featuredImage) blogData.featured_image = formData.featuredImage;
        
        // Specifically handle meta_keywords with extra caution
        if (formData.metaKeywords) {
          // Try to add it, but if this fails, the rest of the form will still work
          try {
            blogData.meta_keywords = formData.metaKeywords;
          } catch (metaKeywordsErr) {
            console.warn('Could not set meta_keywords field:', metaKeywordsErr);
            // Continue without meta_keywords
          }
        }
      } catch (metadataErr) {
        console.warn('Error setting some metadata fields:', metadataErr);
        // Continue with basic fields only
      }
      
      // Add user_id if available
      if (user?.id) {
        blogData.user_id = user.id;
      }
      
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
        // Create new blog metadata entry
        console.log('Creating new blog entry');
        
        const { data, error } = await supabase
          .from('blogs')
          .insert([blogData])
          .select();
          
        if (error) {
          console.error('Error inserting blog:', error);
          
          // Special handling for column errors
          if (error.message && error.message.includes('column')) {
            const columnMatch = error.message.match(/column ["'](.+?)["']/);
            if (columnMatch && columnMatch[1]) {
              throw new Error(`Database column error with: ${columnMatch[1]}. Please check your database schema.`);
            }
          }
          
          throw new Error(`Failed to insert blog: ${error.message || error}`);
        }
        
        console.log('Blog created successfully:', data);
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
        readTime: '2 minute read',
        featuredImage: '',
        status: 'draft'
      });
      
      setCurrentBlog(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving blog:', err);
      setError(err.message || 'Failed to save blog metadata. Check console for details.');
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
      readTime: blog.read_time || '2 minute read',
      featuredImage: blog.featured_image || '',
      status: blog.status || 'draft'
    });
    
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog metadata entry?')) return;
    
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
      setError(err.message || 'Failed to delete blog metadata');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a function to toggle metadata details
  const toggleMetadataDetails = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId);
  };

  // Add this improved function to check database schema
  const checkDatabaseSchema = async () => {
    try {
      console.log('Performing comprehensive database schema check...');
      
      // First, check if table exists by trying to select from it
      const { data: tableData, error: tableError } = await supabase
        .from('blogs')
        .select('*')
        .limit(1);
        
      if (tableError) {
        console.error('Error checking blogs table:', tableError);
        setError(`Database error: ${tableError.message}. The blogs table may not exist.`);
        return;
      }
      
      let columns = [];
      
      if (tableData && tableData.length > 0) {
        columns = Object.keys(tableData[0]);
        console.log('Blogs table exists with columns:', columns);
        
        // Check for missing required columns
        const requiredColumns = ['id', 'title', 'status', 'created_at', 'updated_at'];
        const missingRequired = requiredColumns.filter(col => !columns.includes(col));
        
        if (missingRequired.length > 0) {
          console.error('Missing required columns:', missingRequired);
          setError(`Missing required columns: ${missingRequired.join(', ')}`);
        }
        
        // Check specifically for meta fields
        const metaColumns = ['meta_title', 'meta_description', 'meta_keywords'];
        const missingMeta = metaColumns.filter(col => !columns.includes(col));
        
        if (missingMeta.length > 0) {
          console.warn('Missing metadata columns:', missingMeta);
          setError(`Missing metadata columns: ${missingMeta.join(', ')}. Some features may not work correctly.`);
        }
      } else {
        console.log('No blog rows found. Creating a test row to check schema...');
        
        // Try to insert a minimal test record
        const testData = { 
          title: 'Test Blog', 
          status: 'draft'
        };
        
        const { data: insertData, error: insertError } = await supabase
          .from('blogs')
          .insert([testData])
          .select();
          
        if (insertError) {
          console.error('Error creating test record:', insertError);
          setError(`Cannot verify database schema: ${insertError.message}`);
        } else if (insertData && insertData.length > 0) {
          columns = Object.keys(insertData[0]);
          console.log('Test row created. Schema appears to be:', columns);
          
          // Delete test row
          await supabase.from('blogs').delete().eq('id', insertData[0].id);
          
          // Check for meta_keywords column specifically
          if (!columns.includes('meta_keywords')) {
            console.error('meta_keywords column is missing!');
            setError('The meta_keywords column is missing from the database!');
          }
        }
      }
      
      return columns;
    } catch (err) {
      console.error('Error in schema check:', err);
      setError(`Schema check failed: ${err.message}`);
    }
  };
  
  // Add function to attempt fixing the schema
  const attemptSchemaFix = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to fix database schema...');
      
      // Try to add missing meta columns using SQL directly
      const { error } = await supabase.rpc('add_missing_columns');
      
      if (error) {
        console.error('Error running schema fix:', error);
        setError(`Schema fix failed: ${error.message}. You may need to add columns manually.`);
        
        // Show manual SQL instructions
        console.log('To manually fix the schema, run this SQL in the Supabase SQL Editor:');
        console.log(`
          ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
          ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description TEXT;
          ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
        `);
      } else {
        console.log('Schema fix attempted successfully');
        // Recheck schema
        await checkDatabaseSchema();
        setError('Schema fix attempted. Please reload the page to verify.');
      }
    } catch (err) {
      console.error('Error fixing schema:', err);
      setError(`Schema fix failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
              readTime: '2 minute read',
              featuredImage: '',
              status: 'draft'
            });
            setShowForm(!showForm);
          }} 
          className={styles.addButton}
        >
          {showForm ? 'Cancel' : 'Add New Blog Entry'}
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
          <div className={styles.errorActions}>
            {error.includes('column') && (
              <button 
                onClick={() => {
                  // Show SQL instructions in the console
                  console.log('To fix the schema, run this SQL in the Supabase SQL Editor:');
                  console.log(`
                    -- Add missing columns to the blogs table
                    ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
                    ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description TEXT;
                    ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
                    
                    -- Verify columns were added
                    SELECT column_name, data_type 
                    FROM information_schema.columns 
                    WHERE table_name = 'blogs'
                    ORDER BY ordinal_position;
                  `);
                  
                  // Show confirmation dialog
                  if (window.confirm(
                    'To fix this issue, you need to add the missing columns to your database.\n\n' +
                    'SQL instructions have been printed in the browser console.\n\n' + 
                    'Would you like to reload the page after running the SQL?'
                  )) {
                    window.location.reload();
                  }
                }}
                className={styles.fixSchemaButton}
              >
                Fix Schema
              </button>
            )}
            <button 
              onClick={() => setError(null)} 
              className={styles.errorCloseButton}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{currentBlog ? 'Edit Blog Metadata' : 'Add New Blog Metadata'}</h2>
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
                <label htmlFor="readTime" className={styles.formLabel}>Read Time</label>
                <input
                  id="readTime"
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="2 minute read"
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
              <label htmlFor="featuredImage" className={styles.formLabel}>Featured Image Path</label>
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
              {isLoading ? 'Saving...' : (currentBlog ? 'Update Metadata' : 'Save Metadata')}
            </button>
          </form>
        </div>
      )}

      <div className={styles.blogsList}>
        <h2 className={styles.sectionTitle}>Blog Entries</h2>
        
        {blogs.length === 0 ? (
          <div className={styles.emptyState}>
            No blog entries found. Add your first blog metadata above.
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
                    {blog.meta_title && (
                      <button 
                        onClick={() => toggleMetadataDetails(blog.id)} 
                        className={styles.metaToggle}
                      >
                        {expandedBlog === blog.id ? 'Hide Metadata' : 'Show Metadata'}
                      </button>
                    )}
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
                      <span className={styles.metaValue}>{blog.read_time || 'Not set'}</span>
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