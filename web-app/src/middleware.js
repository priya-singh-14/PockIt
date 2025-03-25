import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('authToken')?.value;
  console.log("Middleware is running on:", request.nextUrl.pathname);

  const pathname = request.nextUrl.pathname;

  if (!authToken && pathname === '/home') {
    console.log("User not authenticated. Redirecting to login...");
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (authToken && pathname === '/') {
    console.log("User already authenticated. Redirecting to home...");
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home'],
};
