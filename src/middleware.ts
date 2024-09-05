import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Initialize the Supabase client
  const supabase = createMiddlewareClient({ req, res });
  
  // Get the session from Supabase authentication
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Check for session if user is trying to access the dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      // If no session, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Handle email link errors
  const emailLinkError = 'Email link is invalid or has expired';
  const errorDescription = req.nextUrl.searchParams.get('error_description');
  if (errorDescription === emailLinkError && req.nextUrl.pathname !== '/signup') {
    return NextResponse.redirect(
      new URL(`/signup?error_description=${errorDescription}`, req.url)
    );
  }

  // If the user is already logged in, redirect away from login/signup pages
  if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
  
  return res;
}
