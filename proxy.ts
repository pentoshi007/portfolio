export default function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Define domains
  const mainDomain = 'aniketpandey.website';
  const adminDomain = `admin.${mainDomain}`;
  const blogsDomain = `blogs.${mainDomain}`;

  // 1. SKIP STATIC/SYSTEM PATHS
  // This is CRITICAL to prevent 404s on CSS/JS/Images
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/static') || 
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. MAIN DOMAIN -> SUBDOMAIN REDIRECTS
  // If user visits aniketpandey.website/admin -> redirect to admin.aniketpandey.website
  if (hostname === mainDomain || hostname.includes('localhost') || hostname.includes('vercel.app')) {
    if (url.pathname.startsWith('/admin')) {
      const newUrl = new URL(url.toString());
      newUrl.hostname = adminDomain;
      newUrl.pathname = url.pathname.replace('/admin', ''); 
      return NextResponse.redirect(newUrl);
    }
    if (url.pathname.startsWith('/blogs')) {
      const newUrl = new URL(url.toString());
      newUrl.hostname = blogsDomain;
      newUrl.pathname = url.pathname.replace('/blogs', '');
      return NextResponse.redirect(newUrl);
    }
  }

  // 3. SUBDOMAIN ROUTING (REWRITES)
  // If user is on admin.aniketpandey.website -> rewrite to /admin folder
  if (hostname.startsWith('admin.')) {
    // Only rewrite if we aren't already targeting /admin to prevent infinite loops
    if (!url.pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL(`/admin${url.pathname}`, request.url));
    }
  }

  // If user is on blogs.aniketpandey.website -> rewrite to /blogs folder
  if (hostname.startsWith('blogs.')) {
    if (!url.pathname.startsWith('/blogs')) {
      return NextResponse.rewrite(new URL(`/blogs${url.pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
