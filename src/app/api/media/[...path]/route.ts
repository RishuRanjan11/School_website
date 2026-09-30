import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const filePath = params.path.join('/');
  if (!filePath || filePath.split('/').some((part) => part === '.' || part === '..')) {
    return NextResponse.json({ success: false, message: 'Invalid image path.' }, { status: 400 });
  }

  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { success: false, message: 'Image storage is not configured.' },
      { status: 503 }
    );
  }

  const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'school-media';
  const { data, error } = await supabaseAdmin.storage.from(bucketName).download(filePath);
  if (error) {
    console.error('Supabase image download error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to load this image from Supabase Storage.' },
      { status: 502 }
    );
  }

  return new NextResponse(data, {
    headers: {
      'Content-Type': data.type || 'application/octet-stream',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
