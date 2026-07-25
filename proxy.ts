import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// RATE LIMITING (in-memory, resets on cold start)
// ============================================
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_API_REQUESTS = 60; // 60 requests per minute
const MAX_CONTACT_REQUESTS = 5; // 5 contact submissions per minute
const MAX_LOGIN_REQUESTS = 5; // 5 login attempts per minute (brute-force protection)

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
// CSP / NONCE
// ============================================
function generateNonce(): string {
  // Edge Runtime: crypto.randomUUID() is available as a Web API
  return btoa(crypto.randomUUID());
}

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "frame-src https://tryhackme.com",
    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "worker-src 'self' blob:",
    "media-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ');
}

/**
 * Attach the per-request CSP header (with nonce) to any NextResponse.
 * Also used to forward the nonce to Next.js via the x-nonce request header
 * so that Next.js automatically applies it to its own inline bootstrap scripts.
 */
function withCsp(response: NextResponse, nonce: string): NextResponse {
  response.headers.set('Content-Security-Policy', buildCsp(nonce));
  return response;
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
  const isMetadataPath = pathname === '/robots.txt' || pathname === '/sitemap.xml';

  // Generate per-request nonce for CSP
  const nonce = generateNonce();

  // Forward nonce to Next.js via request headers so it auto-applies to inline scripts
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Periodic cleanup (10% chance per request)
  if (Math.random() < 0.1) {
    cleanupRateLimitMap();
  }

  // 1. SKIP STATIC/SYSTEM PATHS
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    (pathname.includes('.') && !pathname.startsWith('/api') && !isMetadataPath)
  ) {
    return withCsp(
      NextResponse.next({ request: { headers: requestHeaders } }),
      nonce,
    );
  }

  // 2. SECURITY: Block malicious requests
  if (isBlockedRequest(request)) {
    return withCsp(new NextResponse(null, { status: 403 }), nonce);
  }

  // 3. RATE LIMITING for API routes
  if (pathname.startsWith('/api/')) {
    const ip = getRateLimitKey(request);

    // Stricter limit for contact form
    if (pathname === '/api/messages' && request.method === 'POST') {
      if (isRateLimited(`contact:${ip}`, MAX_CONTACT_REQUESTS)) {
        return withCsp(
          NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          ),
          nonce,
        );
      }
    }

    // Stricter limit for login endpoint (brute-force protection)
    if (pathname === '/api/auth/login' && request.method === 'POST') {
      if (isRateLimited(`login:${ip}`, MAX_LOGIN_REQUESTS)) {
        return withCsp(
          NextResponse.json(
            { error: 'Too many login attempts. Please try again later.' },
            { status: 429 }
          ),
          nonce,
        );
      }
    }

    // General API rate limiting
    if (isRateLimited(`api:${ip}`, MAX_API_REQUESTS)) {
      return withCsp(
        NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        ),
        nonce,
      );
    }

    // Let API requests through after rate limit check
    return withCsp(
      NextResponse.next({ request: { headers: requestHeaders } }),
      nonce,
    );
  }

  if (pathname === '/robots.txt') {
    return withCsp(
      NextResponse.next({ request: { headers: requestHeaders } }),
      nonce,
    );
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
      return withCsp(NextResponse.redirect(newUrl, 308), nonce);
    }
    if (pathname.startsWith('/blogs')) {
      const newUrl = new URL(url.toString());
      newUrl.hostname = blogsDomain;
      newUrl.pathname = pathname.replace('/blogs', '') || '/';
      return withCsp(NextResponse.redirect(newUrl, 308), nonce);
    }
  }

  // Admin subdomain routing
  if (hostname.startsWith('admin.')) {
    if (pathname === '/login') {
      return withCsp(
        NextResponse.rewrite(new URL('/admin/login', request.url), {
          request: { headers: requestHeaders },
        }),
        nonce,
      );
    }
    if (!pathname.startsWith('/admin')) {
      return withCsp(
        NextResponse.rewrite(new URL(`/admin${pathname}`, request.url), {
          request: { headers: requestHeaders },
        }),
        nonce,
      );
    }
  }

  // Blogs subdomain routing
  if (hostname.startsWith('blogs.')) {
    if (pathname === '/sitemap.xml') {
      return withCsp(
        NextResponse.rewrite(new URL('/blog-sitemap.xml', request.url), {
          request: { headers: requestHeaders },
        }),
        nonce,
      );
    }

    // If someone hits blogs.<domain>/blogs/*, redirect to the canonical path without /blogs
    if (pathname === '/blogs' || pathname.startsWith('/blogs/')) {
      const newUrl = new URL(url.toString());
      newUrl.pathname = pathname.replace(/^\/blogs/, '') || '/';
      return withCsp(NextResponse.redirect(newUrl, 308), nonce);
    }

    if (!pathname.startsWith('/blogs')) {
      return withCsp(
        NextResponse.rewrite(new URL(`/blogs${pathname}`, request.url), {
          request: { headers: requestHeaders },
        }),
        nonce,
      );
    }
  }

  return withCsp(
    NextResponse.next({ request: { headers: requestHeaders } }),
    nonce,
  );
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
