'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

export default function AuthTestPage() {
  const [localSession, setLocalSession] = useState(null);
  const [supabaseSession, setSupabaseSession] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [cookies, setCookies] = useState(null);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkAuth() {
      try {
        setIsLoading(true);
        
        // Check AuthContext
        console.log('AuthContext state:', auth);
        
        // Check Supabase session
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        setSupabaseSession(data.session);
        
        // Check localStorage
        try {
          const storedAuth = localStorage.getItem('supabase.auth.token');
          setLocalStorageData(storedAuth ? JSON.parse(storedAuth) : null);
        } catch (e) {
          console.error('Error accessing localStorage:', e);
          setLocalStorageData({ error: e.message });
        }
        
        // No direct way to check cookies in client side, so we'll just note that
        setCookies('Cannot access directly from client side');
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error in auth check:', err);
        setMessage(`Error checking auth: ${err.message}`);
        setIsLoading(false);
      }
    }
    
    checkAuth();
  }, [auth]);

  const handleForceLogin = async () => {
    try {
      setMessage('Attempting to force session refresh...');
      
      // Try to refresh the session
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        setMessage(`Failed to refresh: ${error.message}`);
        return;
      }
      
      if (data.session) {
        setMessage('Session refreshed successfully!');
        // Force store in localStorage
        try {
          localStorage.setItem('supabase.auth.token', JSON.stringify({
            currentSession: data.session,
            expiresAt: Math.floor(Date.now() / 1000) + data.session.expires_in
          }));
          setMessage('Session refreshed and stored in localStorage.');
        } catch (e) {
          setMessage(`Session refreshed but failed to store: ${e.message}`);
        }
      } else {
        setMessage('Session refresh returned no session.');
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  if (isLoading) {
    return <div style={styles.container}>Loading authentication data...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Authentication Test Page</h1>
      
      {message && <div style={styles.message}>{message}</div>}
      
      <div style={styles.section}>
        <h2 style={styles.subheading}>Auth Context</h2>
        <pre style={styles.code}>
          {JSON.stringify({
            user: auth.user,
            loading: auth.loading,
            isAuthenticated: auth.isAuthenticated,
          }, null, 2)}
        </pre>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.subheading}>Supabase Session</h2>
        <pre style={styles.code}>
          {supabaseSession ? JSON.stringify({
            user_id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            expires_at: supabaseSession.expires_at,
            created_at: supabaseSession.created_at,
          }, null, 2) : 'No active session'}
        </pre>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.subheading}>localStorage Data</h2>
        <pre style={styles.code}>
          {JSON.stringify(localStorageData, null, 2)}
        </pre>
      </div>
      
      <div style={styles.buttonContainer}>
        <button onClick={handleForceLogin} style={styles.button}>
          Force Session Refresh
        </button>
        
        <a href="/admin/blogs" style={styles.link}>
          Try Blogs Page
        </a>
        
        <a href="/admin/dashboard" style={styles.link}>
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#0f2c52',
    marginBottom: '20px',
  },
  subheading: {
    color: '#0f2c52',
    fontSize: '18px',
    marginBottom: '10px',
  },
  section: {
    marginBottom: '30px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  code: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '4px',
    overflow: 'auto',
    fontSize: '14px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#0f2c52',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  link: {
    backgroundColor: '#91c0dc',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  message: {
    padding: '10px 15px',
    backgroundColor: '#f0f8ff',
    border: '1px solid #bde0fe',
    borderRadius: '4px',
    marginBottom: '20px',
  }
}; 