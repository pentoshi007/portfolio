import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'aniketpandey.website';

  // 1. Skip system paths (Crucial for assets, images, and internal Next.js calls)
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/static') ||
    pathname.includes('.') // Skip files (favicon.ico, robots.txt, etc.)
  ) {
    return NextResponse.next();
  }

  // 2. Handle Main Domain PATH to SUBDOMAIN redirects
  // This ensures aniketpandey.website/blogs -> blogs.aniketpandey.website
  if (host === domain || host.includes('localhost') || host.includes('vercel.app')) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL(`https://admin.${domain}${pathname.replace('/admin', '')}`, request.url));
    }
    if (pathname.startsWith('/blogs')) {
      return NextResponse.redirect(new URL(`https://blogs.${domain}${pathname.replace('/blogs', '')}`, request.url));
    }
  }

  // 2. Handle admin subdomain routing (REWRITE instead of REDIRECT)
  if (host.startsWith('admin.')) {
    // If accessing root or any path, rewrite to /admin/...
    // But don't rewrite if it's already starting with /admin to avoid double prefix
    if (!pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL(`/admin${pathname === '/' ? '' : pathname}`, request.url));
    }
    return NextResponse.next();
  }

  // 3. Handle blogs subdomain routing (REWRITE instead of REDIRECT)
  if (host.startsWith('blogs.')) {
    // If accessing root or any path, rewrite to /blogs/...
    if (!pathname.startsWith('/blogs')) {
      return NextResponse.rewrite(new URL(`/blogs${pathname === '/' ? '' : pathname}`, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
