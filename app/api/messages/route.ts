import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { isAuthenticated } from '@/lib/auth';
import { validateMessageInput } from '@/lib/validation';

// Disable caching for this API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Fetch all messages (admin only)
export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .lean();
    const response = NextResponse.json(messages);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST - Create new message (public - from contact form)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Validate and sanitize input
    const validation = validateMessageInput(body);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors.join(', ') }, { status: 400 });
    }

    const { name, email, message } = validation.sanitized!;

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true, id: newMessage._id }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
