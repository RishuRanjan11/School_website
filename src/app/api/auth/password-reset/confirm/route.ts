import { createHash, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { consumeAdminPasswordReset, getAdminCredentials } from '@/lib/admin-credentials';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = typeof body.token === 'string' ? body.token : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

    if (!/^[a-f0-9]{64}$/i.test(token)) {
      return NextResponse.json({ success: false, message: 'This reset link is invalid or expired.' }, { status: 400 });
    }
    if (newPassword.length < 12 || Buffer.byteLength(newPassword, 'utf-8') > 72) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 12 characters and no more than 72 UTF-8 bytes.' },
        { status: 400 }
      );
    }

    const credentials = await getAdminCredentials();
    const tokenHash = createHash('sha256').update(token).digest();
    const savedTokenHash = credentials.resetTokenHash
      ? Buffer.from(credentials.resetTokenHash, 'hex')
      : Buffer.alloc(0);
    const tokenMatches = savedTokenHash.length === tokenHash.length
      && timingSafeEqual(tokenHash, savedTokenHash);
    const expiresAt = credentials.resetTokenExpiresAt
      ? Date.parse(credentials.resetTokenExpiresAt)
      : Number.NaN;

    if (!tokenMatches || !credentials.resetTokenHash || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      return NextResponse.json({ success: false, message: 'This reset link is invalid or expired.' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    const consumed = await consumeAdminPasswordReset(credentials.resetTokenHash, passwordHash);
    if (!consumed) {
      return NextResponse.json({ success: false, message: 'This reset link is invalid or expired.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Password reset successfully. You can now sign in.' });
  } catch (error) {
    console.error('Admin password reset confirmation error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to reset the password. Please try again later.' },
      { status: 500 }
    );
  }
}
