import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  console.log('Middleware running for path:', req.nextUrl.pathname);
  
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Pages that don't require authentication checks - always allow access
  const publicAdminPages = ['/admin/setup', '/admin/login', '/admin/test', '/admin/auth-test', '/admin/blogs'];
  
  // Check if any admin page has a timestamp parameter
  // This is used to bypass normal checks when navigating between pages
  const hasTimestampParam = req.nextUrl.searchParams.has('t');
  
  if (req.nextUrl.pathname.startsWith('/admin/') && hasTimestampParam) {
    console.log('Admin page accessed with timestamp, bypassing checks:', req.nextUrl.pathname);
    return res;
  }
  
  // If accessing a public admin page, allow access without redirects
  if (publicAdminPages.includes(req.nextUrl.pathname)) {
    console.log('Accessing public admin page, allowing access');
    return res;
  }
  
  try {
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Session check complete. Session details:', { 
      exists: !!session, 
      userId: session?.user?.id,
      email: session?.user?.email,
      expiresAt: session?.expires_at 
    });
    
    // Look for auth cookie as a backup check
    const hasSbAccessToken = req.cookies.get('sb-access-token');
    const hasSbRefreshToken = req.cookies.get('sb-refresh-token');
    const hasLegacyToken = req.cookies.get('supabase-auth-token');
    
    console.log('Auth cookies:', { 
      'sb-access-token': !!hasSbAccessToken,
      'sb-refresh-token': !!hasSbRefreshToken,
      'supabase-auth-token': !!hasLegacyToken
    });
    
    // Use either the session or cookie to determine authentication
    const isAuthenticated = !!session || !!hasSbAccessToken || !!hasSbRefreshToken || !!hasLegacyToken;
    
    // If the user is not authenticated and trying to access protected admin routes, redirect to login
    if (!isAuthenticated && req.nextUrl.pathname.startsWith('/admin')) {
      console.log('Not authenticated, redirecting to login');
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // If authenticated but accessing login page, redirect to admin dashboard
    if (isAuthenticated && req.nextUrl.pathname === '/admin/login') {
      console.log('Already authenticated, redirecting to dashboard');
      const redirectUrl = new URL('/admin/dashboard', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // If we get here and the path starts with /admin, the user is authenticated
    // So we allow access to all admin routes including /admin/blogs
    if (req.nextUrl.pathname.startsWith('/admin')) {
      console.log('User is authenticated, allowing access to', req.nextUrl.pathname);
      return res;
    }
    
    return res;
  } catch (error) {
    console.error('Error in middleware:', error);
    
    // If there's an error checking the session, still allow access to public pages
    if (publicAdminPages.includes(req.nextUrl.pathname)) {
      return res;
    }
    
    // For other pages, redirect to login to be safe
    const redirectUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}; 