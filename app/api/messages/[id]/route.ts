import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { isAuthenticated } from '@/lib/auth';
import { isValidObjectId } from '@/lib/validation';

// Disable caching
export const dynamic = 'force-dynamic';

// PATCH - Mark message as read
export async function PATCH(
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
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
    }
    
    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    ).lean();
    
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

// DELETE - Delete a message
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
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
    }
    
    const message = await Message.findByIdAndDelete(id);
    
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
