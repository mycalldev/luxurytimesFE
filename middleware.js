import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Secret key for JWT verification
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Paths that should be protected (require authentication)
const protectedPaths = [
  '/admin',
  '/dashboard'
];

// Paths that are publicly accessible
const publicPaths = [
  '/login',
  '/register',
  '/',
  '/api/admin/createAdmin',  // Allow access to create the first admin
  '/admin/signup',           // Allow access to admin signup page
  '/admin/blogs'             // Allow access to blog management without authentication
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path)
  );
  
  // If it's a public path, allow the request
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // If it's not a protected path, allow the request
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  // Get the token from the cookies
  const authToken = request.cookies.get('authToken')?.value;
  
  // If there's no token, redirect to login
  if (!authToken) {
    return NextResponse.redirect(new URL('/admin/signup', request.url));
  }
  
  try {
    // Verify the token
    const decoded = verify(authToken, JWT_SECRET);
    
    // Check for admin paths that require admin role
    if (pathname.startsWith('/admin') && decoded.role !== 'ADMIN') {
      // If trying to access admin paths without admin role, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // If everything is fine, allow the request
    return NextResponse.next();
  } catch (error) {
    // If token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/admin/signup', request.url));
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (static images folder)
     * - public files (like robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}; 