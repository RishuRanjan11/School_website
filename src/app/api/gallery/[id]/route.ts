import { NextRequest, NextResponse } from 'next/server';
import { updateGalleryImage, deleteGalleryImage } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { GalleryImage } from '@/types';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const updates: Partial<GalleryImage> = {};

    if (typeof body.title === 'string') updates.title = body.title.trim();
    if (typeof body.description === 'string') updates.description = body.description.trim();
    if (typeof body.image_url === 'string') updates.image_url = body.image_url.trim();
    if (typeof body.is_featured === 'boolean') updates.is_featured = body.is_featured;
    if (typeof body.event_date === 'string') updates.event_date = body.event_date || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one valid field is required to update an image.' },
        { status: 400 }
      );
    }

    const updated = await updateGalleryImage(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update gallery image',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { id } = params;
    const deleted = await deleteGalleryImage(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Gallery image not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
