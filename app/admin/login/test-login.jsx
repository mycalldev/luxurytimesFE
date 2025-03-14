'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function TestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Attempting login with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        setMessage(`Error: ${error.message}`);
      } else {
        console.log('Login successful:', data);
        setMessage('Login successful! Session created.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '100px auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{ 
        color: '#0f2c52',
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '8px'
      }}>
        Test Login
      </h1>
      <p style={{
        color: '#666',
        textAlign: 'center',
        marginBottom: '20px',
        fontStyle: 'italic'
      }}>
        Direct Supabase Authentication Test
      </p>
      
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleLogin} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontWeight: '500',
            color: '#333'
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontWeight: '500',
            color: '#333'
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#0f2c52',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            marginTop: '10px'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
} 