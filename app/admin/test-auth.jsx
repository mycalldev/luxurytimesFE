'use client';

import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function TestAuth() {
  const auth = useAuth();
  
  useEffect(() => {
    console.log('Auth state:', {
      user: auth.user,
      loading: auth.loading,
      isAuthenticated: auth.isAuthenticated,
      isAdmin: auth.isAdmin
    });
  }, [auth.user, auth.loading, auth.isAuthenticated, auth.isAdmin]);
  
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>Auth Test Page</h1>
      
      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
        <h2>Auth State:</h2>
        <p><strong>Loading:</strong> {auth.loading ? 'Yes' : 'No'}</p>
        <p><strong>Authenticated:</strong> {auth.isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>Is Admin:</strong> {auth.isAdmin ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {auth.user ? JSON.stringify(auth.user, null, 2) : 'Not logged in'}</p>
      </div>
      
      {!auth.isAuthenticated && (
        <div style={{ margin: '20px 0' }}>
          <h2>Test Login Form</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            try {
              const result = await auth.login(email, password);
              console.log('Login result:', result);
            } catch (err) {
              console.error('Login error:', err);
            }
          }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Email:
                <input 
                  type="email" 
                  name="email" 
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '8px',
                    marginTop: '5px'
                  }} 
                />
              </label>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Password:
                <input 
                  type="password" 
                  name="password" 
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '8px',
                    marginTop: '5px'
                  }} 
                />
              </label>
            </div>
            
            <button 
              type="submit"
              style={{
                background: '#0f2c52',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test Login
            </button>
          </form>
        </div>
      )}
      
      {auth.isAuthenticated && (
        <div style={{ margin: '20px 0' }}>
          <button 
            onClick={auth.logout}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 