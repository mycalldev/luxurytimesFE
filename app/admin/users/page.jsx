'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from '../../../lib/supabase';
import styles from './users.module.css';

export default function AdminUsers() {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor'
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
    
    // Redirect to dashboard if not admin
    if (!loading && isAuthenticated && !isAdmin) {
      router.push('/admin/dashboard');
    }
    
    // Fetch users if authenticated and admin
    if (isAuthenticated && isAdmin) {
      fetchUsers();
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await getAdminUsers();
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch admin users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const { data, error } = await createAdminUser(formData);
      if (error) throw error;
      
      setUsers(prev => [...prev, data[0]]);
      setShowAddForm(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'editor'
      });
    } catch (err) {
      setError(err.message || 'Failed to create admin user');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const { error } = await deleteAdminUser(id);
      if (error) throw error;
      
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const { data, error } = await updateAdminUser(id, { role: newRole });
      if (error) throw error;
      
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError('Failed to update user role');
      console.error(err);
    }
  };

  if (loading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.usersContainer}>
      <header className={styles.usersHeader}>
        <h1 className={styles.usersTitle}>Admin Users</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className={styles.addButton}
        >
          {showAddForm ? 'Cancel' : 'Add New User'}
        </button>
      </header>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {showAddForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Admin User</h2>
          <form onSubmit={handleSubmit} className={styles.userForm}>
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
                placeholder="Password"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Create User
            </button>
          </form>
        </div>
      )}

      <div className={styles.usersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableCell}>Name</div>
          <div className={styles.tableCell}>Email</div>
          <div className={styles.tableCell}>Role</div>
          <div className={styles.tableCell}>Actions</div>
        </div>
        
        {users.length === 0 ? (
          <div className={styles.emptyState}>
            No admin users found. Add your first user above.
          </div>
        ) : (
          users.map(adminUser => (
            <div key={adminUser.id} className={styles.tableRow}>
              <div className={styles.tableCell}>{adminUser.name}</div>
              <div className={styles.tableCell}>{adminUser.email}</div>
              <div className={styles.tableCell}>
                <select
                  value={adminUser.role}
                  onChange={(e) => handleRoleChange(adminUser.id, e.target.value)}
                  className={styles.roleSelect}
                  disabled={adminUser.id === user.id} // Can't change own role
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
              <div className={styles.tableCell}>
                <button 
                  onClick={() => handleDelete(adminUser.id)}
                  className={styles.deleteButton}
                  disabled={adminUser.id === user.id} // Can't delete self
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 