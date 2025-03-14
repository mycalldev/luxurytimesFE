'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import styles from './login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const router = useRouter();
  const { login, loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('AdminLogin component mounted');
    console.log('Auth loading state:', authLoading);
    console.log('Is authenticated:', isAuthenticated);
    
    // If already authenticated, redirect to dashboard
    if (!authLoading && isAuthenticated) {
      console.log('User is already authenticated, redirecting to dashboard');
      setRedirecting(true);
      router.push('/admin/dashboard');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setLoginStatus('Attempting login...');
    console.log('Login attempt with:', email);

    try {
      // Direct login with Supabase using the persistSession option
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          // Force persistence in localStorage
          persistSession: true
        }
      });
      
      if (loginError) {
        console.error('Login error:', loginError);
        setError(loginError.message || 'Failed to login');
        setLoading(false);
        setLoginStatus('');
        return;
      }
      
      console.log('Login successful:', data);
      setLoginStatus('Login successful! Establishing session...');
      setRedirecting(true);
      
      // Store the session in localStorage manually as a backup
      if (data.session) {
        try {
          localStorage.setItem('supabase.auth.token', JSON.stringify({
            currentSession: data.session,
            expiresAt: Math.floor(Date.now() / 1000) + data.session.expires_in
          }));
          console.log('Session manually stored in localStorage');
        } catch (storageErr) {
          console.error('Could not store session in localStorage:', storageErr);
        }
      }
      
      // Wait briefly for session to fully establish
      setTimeout(async () => {
        try {
          // Explicitly refresh the session to ensure it's up-to-date
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session verification error:', sessionError);
            setError('Session verification failed. Please try again.');
            setLoading(false);
            setRedirecting(false);
            setLoginStatus('');
            return;
          }
          
          console.log('Session verified:', sessionData);
          
          if (sessionData.session) {
            setLoginStatus('Session established! Redirecting...');
            console.log('Redirecting to dashboard with query param to force reload');
            
            // Pass a timestamp to force a reload and avoid caching issues
            const timestamp = new Date().getTime();
            window.location.href = `/admin/dashboard?t=${timestamp}`;
          } else {
            setError('Session could not be established. Please try again.');
            setLoading(false);
            setRedirecting(false);
            setLoginStatus('');
          }
        } catch (sessionErr) {
          console.error('Unexpected error during session verification:', sessionErr);
          setError('An unexpected error occurred during session verification');
          setLoading(false);
          setRedirecting(false);
          setLoginStatus('');
        }
      }, 1500);
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred: ' + (err.message || ''));
      setLoading(false);
      setLoginStatus('');
    }
  };

  // If we're in a redirecting state, show a loading indicator
  if (redirecting) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Redirecting...</h1>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            margin: '20px 0' 
          }}>
            <div className={styles.loadingSpinner}></div>
          </div>
          <p style={{ textAlign: 'center' }}>{loginStatus || 'Taking you to the admin dashboard...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Admin Login</h1>
        <p className={styles.loginSubtitle}>Luxury Times Control Panel</p>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading || authLoading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
} 