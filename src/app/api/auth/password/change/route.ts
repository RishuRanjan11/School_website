import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';
import { getAdminCredentials, saveAdminCredentials } from '@/lib/admin-credentials';

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const body = await req.json();
    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@12345';

    if (newPassword.length < 12 || Buffer.byteLength(newPassword, 'utf-8') > 72) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 12 characters and no more than 72 UTF-8 bytes.' },
        { status: 400 }
      );
    }

    const credentials = await getAdminCredentials();
    const currentPasswordMatches = credentials.passwordHash
      ? await bcrypt.compare(currentPassword, credentials.passwordHash)
      : currentPassword === adminPassword;

    if (!currentPasswordMatches) {
      return NextResponse.json({ success: false, message: 'Current password is incorrect.' }, { status: 400 });
    }

    await saveAdminCredentials({ passwordHash: await bcrypt.hash(newPassword, 12) });

    return NextResponse.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Admin password change error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to change the password. Please try again later.' },
      { status: 500 }
    );
  }
}
