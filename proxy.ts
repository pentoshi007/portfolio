import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Handle admin subdomain
  if (host.startsWith('admin.')) {
    // If accessing root of admin subdomain, redirect to /admin
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // If accessing /admin paths, allow through
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }
    // Rewrite other paths to /admin prefix
    return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
  }

  // Handle blogs subdomain
  if (host.startsWith('blogs.')) {
    // If accessing root of blogs subdomain, redirect to /blogs
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/blogs', request.url));
    }
    // If accessing /blogs paths, allow through
    if (pathname.startsWith('/blogs')) {
      return NextResponse.next();
    }
    // Rewrite other paths to /blogs prefix
    return NextResponse.rewrite(new URL(`/blogs${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
