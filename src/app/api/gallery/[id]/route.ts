import { NextRequest, NextResponse } from 'next/server';
import { updateGalleryImage, deleteGalleryImage } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';

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

    const updated = await updateGalleryImage(id, body);
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
      { success: false, message: 'Failed to update gallery image' },
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
