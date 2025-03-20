'use client';

import React, { useState, useEffect } from 'react';
import styles from './ContactForm.module.css';
import { getSupabase } from '../lib/supabase';

export default function ContactForm({ 
  contactTitle = "Get in Touch",
  contactDescription = "Interested in our luxury timepieces? Have questions about a specific model? Fill out the form below and our horological experts will get back to you shortly.",
  blogId = null, // Optional blog ID to associate the submission with
  blogTitle = null // Optional blog title to store with the submission
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const [blogInfo, setBlogInfo] = useState({
    id: blogId,
    title: blogTitle
  });

  // Debug log on mount and when props change
  useEffect(() => {
    console.log('ContactForm mounted or updated with props:', {
      blogId,
      blogTitle,
      currentBlogInfoState: blogInfo
    });
  }, [blogId, blogTitle, blogInfo]);
  
  // Update blogInfo when props change
  useEffect(() => {
    console.log('BlogId or blogTitle props changed:', { blogId, blogTitle });
    setBlogInfo({
      id: blogId,
      title: blogTitle
    });
  }, [blogId, blogTitle]);
  
  // If we have a blogId but no blogTitle, fetch the blog title
  useEffect(() => {
    async function fetchBlogTitle() {
      if (blogInfo.id && !blogInfo.title) {
        try {
          const supabase = getSupabase();
          
          console.log('Attempting to fetch blog title for ID:', blogInfo.id);
          
          const { data, error } = await supabase
            .from('blogs')
            .select('title')
            .eq('id', blogInfo.id)
            .single();
            
          if (error) {
            console.error('Error fetching blog title:', error);
            throw error;
          }
          
          if (data && data.title) {
            console.log('Fetched blog title:', data.title);
            setBlogInfo(prev => ({
              ...prev,
              title: data.title
            }));
          } else {
            console.log('No blog title found for ID:', blogInfo.id);
          }
        } catch (err) {
          console.error('Error in fetchBlogTitle:', err);
        }
      }
    }
    
    fetchBlogTitle();
  }, [blogInfo.id, blogInfo.title]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Submitting your message...'
      });
      
      const supabase = getSupabase();
      
      // Create the submission data object
      const submissionData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      
      // Only add blog info if it exists
      if (blogInfo.id) {
        submissionData.blog_id = blogInfo.id;
      }
      
      if (blogInfo.title) {
        submissionData.blog_title = blogInfo.title;
      }
      
      console.log('Submitting contact form with data:', submissionData);
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submissionData])
        .select();
        
      if (error) {
        console.error('Supabase error during submission:', error);
        throw error;
      }
      
      console.log('Contact submission successful:', data);
      
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          error: false,
          message: ''
        });
      }, 5000);
      
    } catch (err) {
      console.error('Error submitting contact form:', err);
      
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  // Debug info component
  const DebugInfo = () => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return (
      <div style={{
        margin: '20px 0',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#343a40' }}>ContactForm Debug Info</h4>
        <pre style={{ margin: 0, overflow: 'auto' }}>
          {JSON.stringify({
            propsReceived: { blogId, blogTitle },
            blogInfoState: blogInfo
          }, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className={styles.contactContainer}>
      {/* {process.env.NODE_ENV === 'development' && <DebugInfo />} */}
      
      <h2 className={styles.contactTitle}>{contactTitle}</h2>
      <p className={styles.contactDescription}>{contactDescription}</p>
      
      {formStatus.message && (
        <div className={`${styles.formMessage} ${formStatus.error ? styles.errorMessage : styles.successMessage}`}>
          {formStatus.message}
        </div>
      )}
      
      {!formStatus.submitted && (
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              required
            ></textarea>
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      )}
    </div>
  );
} 