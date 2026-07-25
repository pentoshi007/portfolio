import { NextRequest, NextResponse } from 'next/server';
import { validateImageUrl } from '@/lib/url-validator';

const FETCH_TIMEOUT = 10_000; // 10 seconds
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_REDIRECT_HOPS = 3;

async function fetchWithTimeout(url: string, opts?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function extractPostImgDirectUrl(galleryUrl: string): Promise<string | null> {
  try {
    // Validate the gallery URL before fetching
    const validation = await validateImageUrl(galleryUrl);
    if (!validation.valid || !validation.url) return null;

    const response = await fetchWithTimeout(validation.url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) return null;

    const html = await response.text();

    // PostImg stores direct image URL in og:image meta tag
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    if (ogImageMatch?.[1]) {
      return ogImageMatch[1];
    }

    // Fallback: look for direct link in the page
    const directLinkMatch = html.match(/https:\/\/i\.postimg\.cc\/[^"'\s]+/);
    if (directLinkMatch?.[0]) {
      return directLinkMatch[0];
    }

    return null;
  } catch {
    return null;
  }
}

function isPostImgGalleryUrl(url: string): boolean {
  return url.includes('postimg.cc/') && !url.includes('i.postimg.cc/');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  try {
    // Handle PostImg gallery URLs by extracting direct image URL
    if (isPostImgGalleryUrl(imageUrl)) {
      const directUrl = await extractPostImgDirectUrl(imageUrl);
      if (directUrl) {
        imageUrl = directUrl;
      } else {
        return new NextResponse('Could not extract image from PostImg', { status: 502 });
      }
    }

    // Validate the URL through our security validator
    const validation = await validateImageUrl(imageUrl);
    if (!validation.valid || !validation.url) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    // Fetch with manual redirects so we can re-validate each hop
    let currentUrl = validation.url.toString();
    let redirectHops = 0;

    let response = await fetchWithTimeout(currentUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
      redirect: 'manual',
    });

    // Handle redirects manually, re-validating each target
    while ([301, 302, 303, 307, 308].includes(response.status) && redirectHops < MAX_REDIRECT_HOPS) {
      const location = response.headers.get('location');
      if (!location) break;

      const redirectValidation = await validateImageUrl(location);
      if (!redirectValidation.valid || !redirectValidation.url) {
        return new NextResponse('Failed to fetch image', { status: 502 });
      }

      currentUrl = redirectValidation.url.toString();
      redirectHops++;

      response = await fetchWithTimeout(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
        redirect: 'manual',
      });
    }

    // If still redirecting after max hops, reject
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    if (!response.ok) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    const contentType = response.headers.get('content-type') || '';

    // Verify it's actually an image
    if (!contentType.startsWith('image/')) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    // Check content-length against size cap before reading body
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_IMAGE_SIZE) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    const buffer = await response.arrayBuffer();

    // Double-check actual buffer size
    if (buffer.byteLength > MAX_IMAGE_SIZE) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': 'https://aniketpandey.website https://blogs.aniketpandey.website',
      },
    });
  } catch {
    return new NextResponse('Failed to fetch image', { status: 502 });
  }
}
