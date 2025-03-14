// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('authToken')?.value;
  console.log("Middleware is running on:", request.nextUrl.pathname);

  const protectedPaths = ['/home', '/'];
  
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  if (isProtectedPath && !authToken) {
    console.log("Redirecting to login...");
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*'],
};