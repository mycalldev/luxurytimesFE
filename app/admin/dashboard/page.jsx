'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import styles from './dashboard.module.css';

// Metadata is now handled by the metadata.js file in this directory

// Component that uses searchParams and needs to be wrapped in Suspense
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
 
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
            {/* <li className={styles.navItem}>
              <Link href="/admin/watches" className={styles.navLink}>
                Watches
              </Link>
            </li> */}
            <li className={styles.navItem}>
              <Link href="/admin/blogs" className={styles.navLink}>
                Blogs
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
              <p className={styles.statValue}>66</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Patek Philippe</h3>
              <p className={styles.statValue}>4</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Audemars Piguet</h3>
              <p className={styles.statValue}>1</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Admin Users</h3>
              <p className={styles.statValue}>1</p>
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