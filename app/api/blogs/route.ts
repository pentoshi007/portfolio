import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { isAuthenticated } from '@/lib/auth';

// GET - Fetch all blogs (public only shows published, admin sees all)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const authenticated = await isAuthenticated();
    
    const query = authenticated ? {} : { published: true };
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(blogs);
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
    const body = await request.json();
    
    const { title, body: blogBody, coverImage, images, published } = body;
    
    if (!title || !blogBody) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

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
    return NextResponse.json({ 
      error: 'Failed to create blog', 
      message: error?.message || 'Unknown error',
      name: error?.name,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }, { status: 500 });
  }
}
