'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSupabase } from '../../../app/lib/supabase';

import styles from './dashboard.module.css';

// Metadata is now handled by the metadata.js file in this directory

// Component that uses searchParams and needs to be wrapped in Suspense
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stats, setStats] = useState({
    rolexWatches: 0,
    patekPhilippe: 0,
    audemars: 0,
    adminUsers: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        const supabase = getSupabase();
        
        // Fetch count of Rolex watches
        const { count, error: rolexError } = await supabase
          .from('rolex_watch')
          .select('*', { count: 'exact', head: true });
          
        if (rolexError) throw rolexError;
        
        setStats(prev => ({
          ...prev,
          rolexWatches: count || 0
        }));
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Set default values in case of error
        setStats(prev => ({
          ...prev,
          rolexWatches: 0
        }));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStats();
  }, []);
 
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, Luxury Times Admin</span>
          {/* <button onClick={handleLogout} className={styles.logoutButton}> */}
            {/* Logout
          </button> */}
        </div>
      </header>

      <div className={styles.dashboardContent}>
        <nav className={styles.sidebar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/admin/dashboard" className={`${styles.navLink} ${styles.active}`}>
                Dashboard
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/admin/watches" className={styles.navLink}>
                Watches
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/admin/blogs" className={styles.navLink}>
                Blogs
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/admin/contacts" className={styles.navLink}>
                Contact Submissions
              </Link>
            </li>
            {/* <li className={styles.navItem}>
              <Link href="/admin/users" className={styles.navLink}>
                Admin Users
              </Link>
            </li> */}
            {/* <li className={styles.navItem}>
              <Link href="/admin/settings" className={styles.navLink}>
                Settings
              </Link>
            </li> */}
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
              <p className={styles.statValue}>{isLoading ? '...' : stats.rolexWatches}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Patek Philippe</h3>
              <p className={styles.statValue}>{stats.patekPhilippe}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Audemars Piguet</h3>
              <p className={styles.statValue}>{stats.audemars}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Admin Users</h3>
              <p className={styles.statValue}>{stats.adminUsers}</p>
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