'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to check authentication
    const checkAuth = () => {
      // Check for cookie
      const hasCookie = document.cookie.includes('authToken=');
      console.log('Checking for authToken cookie:', hasCookie ? 'Found' : 'Not found');
      
      if (!hasCookie) {
        console.log('No auth token found, redirecting to signup');
        router.push('/admin/signup');
      } else {
        // Parse token to get user info if needed
        try {
          const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('authToken='))
            ?.split('=')[1];
            
          if (cookieValue) {
            // Just set loading to false - in a real app you might want to
            // decode the JWT and set the user state
            setLoading(false);
          } else {
            console.log('Auth token found but empty, redirecting to signup');
            router.push('/admin/signup');
          }
        } catch (e) {
          console.error('Error parsing auth token:', e);
          setLoading(false);
        }
      }
    };

    // Give a small delay to ensure cookies are processed
    const timer = setTimeout(() => {
      checkAuth();
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = () => {
    // Clear the authToken cookie properly
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
    router.push('/admin/signup');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div>
          <h2 className={styles.loadingText}>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Welcome to the Admin Dashboard</h2>
              <p className={styles.cardText}>
                You have successfully created and logged in as an admin user.
              </p>
              <div className={styles.buttonGroup}>
                <Link href="/admin/signup" className={styles.linkButton}>
                  Back to Signup
                </Link>
                <button 
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 