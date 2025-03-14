'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, signIn, signOut, getCurrentUser } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider mounted');
    
    // Check for active session on initial load
    const checkUser = async () => {
      setLoading(true);
      console.log('Checking for existing user session');
      try {
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error getting current user:', error);
        }
        
        console.log('Current user:', user);
        setUser(user);
      } catch (err) {
        console.error('Unexpected error in checkUser:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN') {
          console.log('User signed in, fetching user data');
          const { user, error } = await getCurrentUser();
          if (error) {
            console.error('Error getting user after sign in:', error);
          }
          setUser(user);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
        }
      }
    );

    return () => {
      console.log('Cleaning up auth listener');
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    console.log('Login attempt for:', email);
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }
      
      console.log('Sign in successful:', data);
      return { data };
    } catch (err) {
      console.error('Unexpected error in login:', err);
      return { error: err };
    }
  };

  const logout = async () => {
    console.log('Logout attempt');
    const { error } = await signOut();
    if (error) {
      console.error('Sign out error:', error);
      return { error };
    }
    setUser(null);
    console.log('Logout successful');
    return { error: null };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 