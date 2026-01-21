import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// RATE LIMITING (in-memory, resets on cold start)
// ============================================
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_API_REQUESTS = 60; // 60 requests per minute
const MAX_CONTACT_REQUESTS = 5; // 5 contact submissions per minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

// Clean up old entries to prevent memory leak
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(key);
    }
  }
}

// ============================================
// SECURITY CHECKS
// ============================================
const blockedUserAgents = [/sqlmap/i, /nikto/i, /nmap/i, /masscan/i, /zgrab/i];
const blockedPaths = ['/.env', '/.git', '/wp-admin', '/wp-login', '/phpmyadmin', '/admin.php'];

function isBlockedRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname.toLowerCase();

  // Block malicious user agents
  if (blockedUserAgents.some(pattern => pattern.test(userAgent))) {
    return true;
  }

  // Block suspicious paths
  if (blockedPaths.some(path => pathname.startsWith(path))) {
    return true;
  }

  return false;
}

// ============================================
// MAIN MIDDLEWARE
// ============================================
export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const pathname = url.pathname;

  // Periodic cleanup (10% chance per request)
  if (Math.random() < 0.1) {
    cleanupRateLimitMap();
  }

  // 1. SKIP STATIC/SYSTEM PATHS
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') && !pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // 2. SECURITY: Block malicious requests
  if (isBlockedRequest(request)) {
    return new NextResponse(null, { status: 403 });
  }

  // 3. RATE LIMITING for API routes
  if (pathname.startsWith('/api/')) {
    const ip = getRateLimitKey(request);

    // Stricter limit for contact form
    if (pathname === '/api/messages' && request.method === 'POST') {
      if (isRateLimited(`contact:${ip}`, MAX_CONTACT_REQUESTS)) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // General API rate limiting
    if (isRateLimited(`api:${ip}`, MAX_API_REQUESTS)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Let API requests through after rate limit check
    return NextResponse.next();
  }

  // 4. SUBDOMAIN ROUTING
  const mainDomain = 'aniketpandey.website';
  const adminDomain = `admin.${mainDomain}`;
  const blogsDomain = `blogs.${mainDomain}`;

  // Main domain -> subdomain redirects
  if (hostname === mainDomain || hostname.includes('localhost') || hostname.includes('vercel.app')) {
    if (pathname.startsWith('/admin')) {
      const newUrl = new URL(url.toString());
      newUrl.hostname = adminDomain;
      newUrl.pathname = pathname.replace('/admin', '') || '/';
      return NextResponse.redirect(newUrl);
    }
    if (pathname.startsWith('/blogs')) {
      const newUrl = new URL(url.toString());
      newUrl.hostname = blogsDomain;
      newUrl.pathname = pathname.replace('/blogs', '') || '/';
      return NextResponse.redirect(newUrl);
    }
  }

  // Admin subdomain routing
  if (hostname.startsWith('admin.')) {
    if (pathname === '/login') {
      return NextResponse.rewrite(new URL('/admin/login', request.url));
    }
    if (!pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
    }
  }

  // Blogs subdomain routing
  if (hostname.startsWith('blogs.')) {
    if (!pathname.startsWith('/blogs')) {
      return NextResponse.rewrite(new URL(`/blogs${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
