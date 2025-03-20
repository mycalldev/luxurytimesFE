'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSupabase } from '../../../app/lib/supabase';
import styles from './contacts.module.css';

function ContactsContent() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedContact, setExpandedContact] = useState(null);
  
  // Add states for test form
  const [testFormVisible, setTestFormVisible] = useState(false);
  const [testContact, setTestContact] = useState({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message',
    blog_id: '',
    blog_title: 'Test Blog Title'
  });
  
  useEffect(() => {
    fetchContacts();
  }, []);
  
  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabase();
      
      // Fetch contact submissions, still including the blog relationship 
      // for linking purposes, but we'll primarily use the stored blog_title
      const { data, error } = await supabase
        .from('contact_submissions')
        .select(`
          *,
          blogs:blog_id (
            id,
            title
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Add debugging log
      console.log('Fetched contacts:', data);
      
      setContacts(data || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError(err.message || 'Failed to fetch contacts');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;
    
    setIsLoading(true);
    try {
      const supabase = getSupabase();
      
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Refresh the list
      await fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError(err.message || 'Failed to delete contact');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleDetails = (contactId) => {
    setExpandedContact(expandedContact === contactId ? null : contactId);
  };
  
  // Handle test form input change
  const handleTestInputChange = (e) => {
    const { name, value } = e.target;
    setTestContact(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle test form submission
  const handleTestSubmit = async (e) => {
    e.preventDefault();
    try {
      const supabase = getSupabase();
      
      // Prepare test data
      const testData = { ...testContact };
      
      // Only include blog data if it's provided
      if (!testData.blog_id) delete testData.blog_id;
      if (!testData.blog_title) delete testData.blog_title;
      
      console.log('Submitting test contact:', testData);
      
      // Insert test data
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([testData])
        .select();
        
      if (error) throw error;
      
      console.log('Test submission successful:', data);
      alert('Test contact created successfully!');
      
      // Refresh contacts list
      fetchContacts();
      
      // Hide the form
      setTestFormVisible(false);
    } catch (err) {
      console.error('Error creating test contact:', err);
      alert(`Error creating test contact: ${err.message}`);
    }
  };
  
  if (isLoading && contacts.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading contacts...</p>
      </div>
    );
  }
  
  return (
    <div className={styles.contactsContainer}>
      <nav className={styles.backNavigation}>
        <Link href="/admin/dashboard" className={styles.backButton}>
          <span className={styles.backIcon}>←</span> Back to Dashboard
        </Link>
      </nav>
      
      <header className={styles.contactsHeader}>
        <h1 className={styles.contactsTitle}>Contact Form Submissions</h1>
      </header>
      
      {/* Add debugging buttons */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => console.log('Current contacts data:', contacts)} 
          className={styles.debugButton}
        >
          Log Contacts Data (Check Console)
        </button>
        
        <button 
          onClick={() => setTestFormVisible(!testFormVisible)} 
          className={styles.testButton}
        >
          {testFormVisible ? 'Hide Test Form' : 'Create Test Contact'}
        </button>
      </div>
      
      {/* Test contact form */}
      {testFormVisible && (
        <div className={styles.testFormCard}>
          <h3 className={styles.testFormTitle}>Create Test Contact with Blog Reference</h3>
          <form onSubmit={handleTestSubmit} className={styles.testForm}>
            <div className={styles.testFormGroup}>
              <label className={styles.testFormLabel}>Name</label>
              <input
                type="text"
                name="name"
                value={testContact.name}
                onChange={handleTestInputChange}
                className={styles.testFormInput}
                required
              />
            </div>
            
            <div className={styles.testFormGroup}>
              <label className={styles.testFormLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={testContact.email}
                onChange={handleTestInputChange}
                className={styles.testFormInput}
                required
              />
            </div>
            
            <div className={styles.testFormGroup}>
              <label className={styles.testFormLabel}>Message</label>
              <textarea
                name="message"
                value={testContact.message}
                onChange={handleTestInputChange}
                className={styles.testFormTextarea}
                required
              ></textarea>
            </div>
            
            <div className={styles.testFormGroup}>
              <label className={styles.testFormLabel}>Blog ID (UUID format, empty for none)</label>
              <input
                type="text"
                name="blog_id"
                value={testContact.blog_id}
                onChange={handleTestInputChange}
                className={styles.testFormInput}
                placeholder="00000000-0000-0000-0000-000000000000"
              />
            </div>
            
            <div className={styles.testFormGroup}>
              <label className={styles.testFormLabel}>Blog Title</label>
              <input
                type="text"
                name="blog_title"
                value={testContact.blog_title}
                onChange={handleTestInputChange}
                className={styles.testFormInput}
              />
            </div>
            
            <div className={styles.testFormButtons}>
              <button type="submit" className={styles.testFormSubmit}>Create Test Contact</button>
              <button 
                type="button" 
                onClick={() => setTestFormVisible(false)}
                className={styles.testFormCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Submissions</h3>
          <p className={styles.statValue}>{contacts.length}</p>
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
      
      {/* Contact list */}
      <div className={styles.contactsList}>
        <h2 className={styles.sectionTitle}>Contact Submissions</h2>
        
        {contacts.length === 0 ? (
          <div className={styles.emptyState}>
            No contact submissions found.
          </div>
        ) : (
          <div className={styles.contactsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Name</div>
              <div className={styles.tableCell}>Email</div>
              <div className={styles.tableCell}>Related Blog</div>
              <div className={styles.tableCell}>Date</div>
              <div className={styles.tableCell}>Actions</div>
            </div>
            
            {contacts.map(contact => (
              <div key={contact.id}>
                <div className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <p className={styles.contactName}>{contact.name}</p>
                    <button 
                      onClick={() => toggleDetails(contact.id)} 
                      className={styles.detailsToggle}
                    >
                      {expandedContact === contact.id ? 'Hide Message' : 'View Message'}
                    </button>
                  </div>
                  <div className={styles.tableCell}>{contact.email}</div>
                  <div className={styles.tableCell}>
                    {contact.blog_title ? (
                      <Link href={`/blog/${contact.blog_id}`} className={styles.blogLink}>
                        {contact.blog_title}
                      </Link>
                    ) : contact.blogs?.title ? (
                      <Link href={`/blog/${contact.blog_id}`} className={styles.blogLink}>
                        {contact.blogs.title} (from join)
                      </Link>
                    ) : (
                      <span className={styles.noBlog}>General Contact</span>
                    )}
                  </div>
                  <div className={styles.tableCell}>
                    {new Date(contact.created_at).toLocaleDateString()}
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.contactActions}>
                      <button 
                        onClick={() => handleDelete(contact.id)} 
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                {expandedContact === contact.id && (
                  <div className={styles.messageDetails}>
                    <div className={styles.messageContent}>
                      <h4 className={styles.messageTitle}>Message:</h4>
                      <p className={styles.messageText}>{contact.message}</p>
                    </div>
                    <div className={styles.metaDetails}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Submitted:</span>
                        <span className={styles.metaValue}>{new Date(contact.created_at).toLocaleString()}</span>
                      </div>
                      {contact.blog_title && (
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Related to:</span>
                          <span className={styles.metaValue}>{contact.blog_title}</span>
                        </div>
                      )}
                      {/* Add debugging information */}
                      <div className={styles.metaItem} style={{ marginTop: '1rem', color: '#999' }}>
                        <span className={styles.metaLabel}>Debug Info:</span>
                        <span className={styles.metaValue}>
                          blog_id: {contact.blog_id || 'null'}, 
                          blog_title: {contact.blog_title || 'null'}, 
                          has blogs join: {contact.blogs ? 'yes' : 'no'}
                          {contact.blogs && `, blogs.title: ${contact.blogs.title || 'null'}`}
                        </span>
                      </div>
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

export default function AdminContacts() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading content...</p>
      </div>
    }>
      <ContactsContent />
    </Suspense>
  );
} 