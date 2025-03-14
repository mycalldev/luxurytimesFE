'use client';

import { AuthProvider } from '../../contexts/AuthContext';
import '../globals.css';

// This is a client component layout that only handles the AuthProvider
export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 