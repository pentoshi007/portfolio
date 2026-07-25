import { NextRequest, NextResponse } from 'next/server';
import { validateFetchUrl } from '@/lib/url-validator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const FETCH_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 3;

async function fetchWithTimeout(
  url: URL,
  init: RequestInit = {},
  timeoutMs = FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: 'manual', // we validate each hop ourselves
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch an image URL, manually following redirects while re-validating every
 * redirect target through the SSRF validator. Returns the final Response or
 * throws on too many redirects / non-image content / oversized body.
 */
async function safeFetchImage(
  rawUrl: string,
  userAgent: string,
): Promise<{ response: Response; finalUrl: URL }> {
  let currentUrl = rawUrl;
  let redirects = 0;

  while (redirects <= MAX_REDIRECTS) {
    const validation = await validateFetchUrl(currentUrl);
    if (!validation.ok) {
      throw new Error(`Blocked URL: ${validation.reason}`);
    }

    const response = await fetchWithTimeout(validation.url, {
      headers: { 'User-Agent': userAgent },
    });

    // Handle redirects (3xx) — re-validate the Location header
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) {
        throw new Error('Redirect without Location header');
      }
      // Resolve relative redirects against the current URL
      currentUrl = new URL(location, validation.url).toString();
      redirects++;
      continue;
    }

    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      throw new Error('URL did not return an image');
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_IMAGE_BYTES) {
      throw new Error('Image exceeds size limit');
    }

    return { response, finalUrl: validation.url };
  }

  throw new Error('Too many redirects');
}

async function extractPostImgDirectUrl(galleryUrl: string): Promise<string | null> {
  try {
    const validation = await validateFetchUrl(galleryUrl);
    if (!validation.ok) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(validation.url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: controller.signal,
        redirect: 'manual',
      });
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) return null;

    const html = await response.text();

    // PostImg stores direct image URL in og:image meta tag
    const ogImageMatch = html.match(
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
    );
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

    const { response } = await safeFetchImage(
      imageUrl,
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    );

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength > MAX_IMAGE_BYTES) {
      return new NextResponse('Image exceeds size limit', { status: 413 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; img-src 'self'; sandbox",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Return a generic 502 for all blocked/failed fetches — do not leak internal details
    return new NextResponse('Error fetching image', { status: 502 });
  }
}
