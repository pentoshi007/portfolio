import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { isAuthenticated } from '@/lib/auth';
import { isValidObjectId, isValidSlug, validateBlogInput, sanitizeForDB } from '@/lib/validation';

// Disable caching
export const dynamic = 'force-dynamic';

// GET - Fetch single blog by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Validate ID/slug format
    if (!id || id.length > 200) {
      return NextResponse.json({ error: 'Invalid blog identifier' }, { status: 400 });
    }
    
    // Try to find by ID first, then by slug
    let blog = null;
    if (isValidObjectId(id)) {
      blog = await Blog.findById(id).lean();
    }
    if (!blog && isValidSlug(id)) {
      blog = await Blog.findOne({ slug: id }).lean();
    }
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Only return unpublished blogs to authenticated admins
    const authenticated = await isAuthenticated();
    if (!(blog as any).published && !authenticated) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    const response = NextResponse.json(blog);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    
    // Validate ID
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }
    
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Build update object with only provided fields
    const updateData: any = { updatedAt: new Date() };
    
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.length < 3 || body.title.length > 200) {
        return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
      }
      updateData.title = sanitizeForDB(body.title);
      updateData.slug = body.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    if (body.body !== undefined) {
      if (typeof body.body !== 'string' || body.body.length < 10 || body.body.length > 100000) {
        return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
      }
      updateData.body = sanitizeForDB(body.body);
    }
    
    if (body.coverImage !== undefined) {
      updateData.coverImage = sanitizeForDB(body.coverImage || '');
    }
    
    if (body.published !== undefined) {
      updateData.published = Boolean(body.published);
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true }).lean();
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    
    // Validate ID
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
