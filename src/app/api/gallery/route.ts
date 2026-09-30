import { NextRequest, NextResponse } from 'next/server';
import { getGalleryImages, addGalleryImage } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { getStorageProxyUrl } from '@/lib/storage-url';
import { getDatabaseSetupError } from '@/lib/database-errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';

    const images = await getGalleryImages(category, featuredOnly);
    return NextResponse.json({
      success: true,
      data: images.map((image) => ({
        ...image,
        image_url: getStorageProxyUrl(image.image_url),
      })),
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, category, image_url, is_featured, event_date } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { success: false, message: 'Title and image URL are required.' },
        { status: 400 }
      );
    }

    const newImage = await addGalleryImage({
      title: title.trim(),
      description: (description || '').trim(),
      category: (category || 'Campus').trim(),
      image_url: image_url.trim(),
      is_featured: is_featured !== undefined ? Boolean(is_featured) : true,
      event_date: event_date || new Date().toISOString().split('T')[0],
    });

    return NextResponse.json({
      success: true,
      data: {
        ...newImage,
        image_url: getStorageProxyUrl(newImage.image_url),
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return NextResponse.json(
      {
        success: false,
        message: getDatabaseSetupError(error)
          || (error instanceof Error ? error.message : 'Failed to add gallery image'),
      },
      { status: 500 }
    );
  }
}
