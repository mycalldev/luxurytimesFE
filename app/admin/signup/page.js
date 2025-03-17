'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const hasCookie = document.cookie.includes('authToken=');
    if (hasCookie) {
      // User is already logged in, redirect to admin dashboard
      router.push('/admin');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Send request to create admin
    try {
      const response = await fetch('/api/admin/createAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include', // Important: include cookies in the request/response
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin user');
      }

      setSuccess('Admin user created successfully! Redirecting to admin dashboard...');
      setRedirecting(true);
      
      // Wait longer to ensure the cookie is set
      setTimeout(() => {
        // Verify cookie is set before redirecting
        if (document.cookie.includes('authToken=')) {
          router.push('/admin');
        } else {
          console.log('Cookie not found, trying to redirect anyway');
          router.push('/admin');
        }
      }, 3000);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (redirecting) {
    return (
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>
            Admin Account Created!
          </h2>
          <p className={styles.subtitle}>
            Redirecting to admin dashboard...
          </p>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <div className={styles.successMessage}>
              Your admin account has been created successfully.
              If you are not redirected automatically, 
              <button 
                onClick={() => router.push('/admin')}
                className={styles.textButton}
              >
                click here
              </button>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.title}>
          Create Admin Account
        </h2>
        <p className={styles.subtitle}>
          This page is for creating the first admin user only
        </p>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          {success && (
            <div className={styles.successMessage}>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={styles.input}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.button} ${isLoading ? styles.buttonDisabled : ''}`}
              >
                {isLoading ? 'Creating...' : 'Create Admin Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 