import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/admin(.*)']);
const PUBLISHABLE_KEY = 'pk_test_ZnVsbC1qb2V5LTgxLmNsZXJrLmFjY291bnRzLmRldiQ';

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
      console.log('Access granted to protected route');
    } catch (error) {
      console.log('User not authenticated, redirecting to /login ', req.url);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin(.*)'],
};
