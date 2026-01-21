import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { isAuthenticated } from '@/lib/auth';
import { validateBlogInput } from '@/lib/validation';

// Disable caching for this API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Fetch all blogs (public only shows published, admin sees all)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const authenticated = await isAuthenticated();
    
    const query = authenticated ? {} : { published: true };
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    const response = NextResponse.json(blogs);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST - Create new blog (admin only)
export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Validate and sanitize input
    const validation = validateBlogInput({
      title: body.title,
      body: body.body,
      coverImage: body.coverImage,
      images: body.images,
      published: body.published,
    });

    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors.join(', ') }, { status: 400 });
    }

    const { title, body: blogBody, coverImage, images, published } = validation.sanitized!;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newBlog = await Blog.create({
      title,
      slug,
      body: blogBody,
      coverImage: coverImage || '',
      images: images || [],
      published: published || false,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    // Don't expose internal errors in production
    return NextResponse.json({ 
      error: 'Failed to create blog',
    }, { status: 500 });
  }
}
