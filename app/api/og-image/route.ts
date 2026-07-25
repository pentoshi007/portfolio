import { NextRequest, NextResponse } from 'next/server';

async function extractPostImgDirectUrl(galleryUrl: string): Promise<string | null> {
  try {
    const response = await fetch(galleryUrl, {
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

    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    });

    if (!response.ok) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Verify it's actually an image
    if (!contentType.startsWith('image/')) {
      return new NextResponse('URL did not return an image', { status: 502 });
    }
    
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
