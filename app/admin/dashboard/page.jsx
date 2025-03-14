'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import styles from './dashboard.module.css';

// Metadata is now handled by the metadata.js file in this directory

// Component that uses searchParams and needs to be wrapped in Suspense
function DashboardContent() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasTimestamp = searchParams.has('t');

  useEffect(() => {
    console.log('Dashboard mounted, auth state:', { loading, isAuthenticated, user });
    console.log('Has timestamp parameter:', hasTimestamp);
    
    // If we have a timestamp parameter, we're coming directly from login
    // We should check localStorage for the session first
    if (hasTimestamp) {
      try {
        const storedSession = localStorage.getItem('supabase.auth.token');
        console.log('Found stored session in localStorage:', !!storedSession);
        
        if (storedSession) {
          // Session exists in localStorage, finish verification quickly
          console.log('Using stored session from localStorage');
          setIsVerifying(false);
          return;
        }
      } catch (err) {
        console.error('Error checking localStorage:', err);
      }
    }
    
    const verifySession = async () => {
      setIsVerifying(true);
      
      try {
        // Double-check the session directly
        const { data, error } = await supabase.auth.getSession();
        console.log('Dashboard session check:', data, error);
        
        if (error) {
          console.error('Session verification error:', error);
          setMessage('Session verification error');
          router.push('/admin/login');
          return;
        }
        
        if (!data.session) {
          console.log('No session found in dashboard check');
          
          // Try refreshing the session
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          console.log('Session refresh attempt:', refreshData, refreshError);
          
          if (refreshError || !refreshData.session) {
            console.log('Session refresh failed, redirecting to login');
            router.push('/admin/login');
            return;
          }
          
          console.log('Session refreshed successfully');
        }
        
        setIsVerifying(false);
      } catch (err) {
        console.error('Unexpected error verifying session:', err);
        setMessage('Session verification error');
        router.push('/admin/login');
      }
    };
    
    // If arriving directly with timestamp, skip multiple checks
    if (hasTimestamp) {
      setIsVerifying(false);
      return;
    }
    
    // If not loading and not authenticated, verify the session directly
    if (!loading) {
      if (!isAuthenticated) {
        verifySession();
      } else {
        setIsVerifying(false);
      }
    }
  }, [loading, isAuthenticated, router, user, hasTimestamp]);

  const handleLogout = async () => {
    console.log('Logging out...');
    // Clear localStorage manually
    try {
      localStorage.removeItem('supabase.auth.token');
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
    
    await logout();
    router.push('/admin/login');
  };

  if (loading || isVerifying) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>{message || 'Loading...'}</p>
      </div>
    );
  }

  // If coming directly from login with timestamp, skip the redirect
  if (!isAuthenticated && !isVerifying && !hasTimestamp) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {user?.name || user?.email || 'Admin'}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <div className={styles.dashboardContent}>
        <nav className={styles.sidebar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/admin/dashboard" className={`${styles.navLink} ${styles.active}`}>
                Dashboard
              </a>
            </li>
            <li className={styles.navItem}>
              <a href={`/admin/watches?t=${Date.now()}`} className={styles.navLink}>
                Watches
              </a>
            </li>
            <li className={styles.navItem}>
              <a href={`/admin/blogs?t=${Date.now()}`} className={styles.navLink}>
                Blogs
              </a>
            </li>
            <li className={styles.navItem}>
              <a href={`/admin/users?t=${Date.now()}`} className={styles.navLink}>
                Admin Users
              </a>
            </li>
            <li className={styles.navItem}>
              <a href={`/admin/settings?t=${Date.now()}`} className={styles.navLink}>
                Settings
              </a>
            </li>
          </ul>
        </nav>

        <main className={styles.mainContent}>
          <div className={styles.dashboardCard}>
            <h2 className={styles.cardTitle}>Welcome to Luxury Times Admin</h2>
            <p className={styles.cardText}>
              This is your control panel for managing the Luxury Times website. From here, you can manage your watch inventory,
              admin users, and website settings.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Rolex Watches</h3>
              <p className={styles.statValue}>24</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Patek Philippe</h3>
              <p className={styles.statValue}>18</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Audemars Piguet</h3>
              <p className={styles.statValue}>12</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Admin Users</h3>
              <p className={styles.statValue}>3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Main component that renders the wrapped DashboardContent component
export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading content...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
} 