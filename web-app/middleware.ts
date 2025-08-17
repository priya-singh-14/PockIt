import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  // If user is logged in and tries to access login page "/", redirect to /home
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If user is not logged in and tries to access any protected page redirect to /
  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
