import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    // Security check to avoid path traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), 'public', 'uploads', safeFilename);

    if (!fs.existsSync(filePath)) {
      // Fallback check in public root
      const rootPath = path.join(process.cwd(), 'public', safeFilename);
      if (fs.existsSync(rootPath)) {
        const fileBuffer = fs.readFileSync(rootPath);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': getContentType(safeFilename),
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': getContentType(safeFilename),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('Error serving upload:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}
