import { createHash, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { saveAdminCredentials } from '@/lib/admin-credentials';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recoveryCode = typeof body.recoveryCode === 'string' ? body.recoveryCode : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

    const configuredRecoveryCode = process.env.ADMIN_PASSWORD_RECOVERY_CODE;
    if (!configuredRecoveryCode || configuredRecoveryCode.length < 32) {
      return NextResponse.json(
        { success: false, message: 'Password recovery is not configured. Contact the site administrator.' },
        { status: 503 }
      );
    }
    if (!recoveryCode || recoveryCode.length > 1024) {
      return NextResponse.json({ success: false, message: 'The recovery code is incorrect.' }, { status: 400 });
    }
    if (newPassword.length < 12 || Buffer.byteLength(newPassword, 'utf-8') > 72) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 12 characters and no more than 72 UTF-8 bytes.' },
        { status: 400 }
      );
    }

    const submittedCodeHash = createHash('sha256').update(recoveryCode).digest();
    const configuredCodeHash = createHash('sha256').update(configuredRecoveryCode).digest();
    if (!timingSafeEqual(submittedCodeHash, configuredCodeHash)) {
      return NextResponse.json({ success: false, message: 'The recovery code is incorrect.' }, { status: 400 });
    }

    await saveAdminCredentials({ passwordHash: await bcrypt.hash(newPassword, 12) });

    return NextResponse.json({ success: true, message: 'Password recovered successfully. You can now sign in.' });
  } catch (error) {
    console.error('Admin password recovery error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to reset the password. Please try again later.' },
      { status: 500 }
    );
  }
}
