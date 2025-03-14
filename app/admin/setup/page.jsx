'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './setup.module.css';

export default function AdminSetup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    token: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('/api/admin/create-first-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin user');
      }

      setStatus({
        loading: false,
        error: null,
        success: true
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message,
        success: false
      });
    }
  };

  return (
    <div className={styles.setupContainer}>
      <div className={styles.setupCard}>
        <h1 className={styles.setupTitle}>Admin Setup</h1>
        <p className={styles.setupSubtitle}>Create the first admin user for Luxury Times</p>

        {status.error && (
          <div className={styles.errorMessage}>{status.error}</div>
        )}

        {status.success ? (
          <div className={styles.successMessage}>
            <p>Admin user created successfully!</p>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.setupForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Full Name"
                required
                disabled={status.loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Email Address"
                required
                disabled={status.loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Password (min 6 characters)"
                required
                minLength={6}
                disabled={status.loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="token" className={styles.formLabel}>Setup Token</label>
              <input
                id="token"
                type="text"
                name="token"
                value={formData.token}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Setup Token (if required)"
                disabled={status.loading}
              />
              <small className={styles.helpText}>
                The setup token is defined in your .env.local file as ADMIN_SETUP_TOKEN
              </small>
            </div>

            <button
              type="submit"
              className={styles.setupButton}
              disabled={status.loading}
            >
              {status.loading ? 'Creating Admin...' : 'Create Admin User'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 