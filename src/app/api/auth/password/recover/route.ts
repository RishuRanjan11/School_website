import { createHash, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { saveAdminCredentials } from '@/lib/admin-credentials';

const failedAttempts = new Map<string, { count: number; resetAt: number }>();
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recoveryCode = typeof body.recoveryCode === 'string' ? body.recoveryCode : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

    const configuredRecoveryCode = process.env.ADMIN_PASSWORD_RECOVERY_CODE;
    if (!configuredRecoveryCode) {
      return NextResponse.json(
        { success: false, message: 'Password recovery is not configured. Contact the site administrator.' },
        { status: 503 }
      );
    }
    if (!/^\d{4,6}$/.test(configuredRecoveryCode)) {
      return NextResponse.json(
        { success: false, message: 'The configured recovery PIN must contain 4 to 6 digits.' },
        { status: 503 }
      );
    }
    if (!/^\d{4,6}$/.test(recoveryCode)) {
      return NextResponse.json({ success: false, message: 'The recovery code is incorrect.' }, { status: 400 });
    }
    if (newPassword.length < 12 || Buffer.byteLength(newPassword, 'utf-8') > 72) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 12 characters and no more than 72 UTF-8 bytes.' },
        { status: 400 }
      );
    }

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || req.headers.get('x-real-ip')
      || 'unknown';
    const now = Date.now();
    let attemptWindow = failedAttempts.get(clientIp);
    if (!attemptWindow || attemptWindow.resetAt <= now) {
      attemptWindow = { count: 0, resetAt: now + ATTEMPT_WINDOW_MS };
      failedAttempts.set(clientIp, attemptWindow);
    }
    if (attemptWindow.count >= MAX_FAILED_ATTEMPTS) {
      return NextResponse.json(
        { success: false, message: 'Too many incorrect recovery PIN attempts. Try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const submittedCodeHash = createHash('sha256').update(recoveryCode).digest();
    const configuredCodeHash = createHash('sha256').update(configuredRecoveryCode).digest();
    if (!timingSafeEqual(submittedCodeHash, configuredCodeHash)) {
      attemptWindow.count += 1;
      return NextResponse.json({ success: false, message: 'The recovery code is incorrect.' }, { status: 400 });
    }

    await saveAdminCredentials({ passwordHash: await bcrypt.hash(newPassword, 12) });
    failedAttempts.delete(clientIp);

    return NextResponse.json({ success: true, message: 'Password recovered successfully. You can now sign in.' });
  } catch (error) {
    console.error('Admin password recovery error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to reset the password. Please try again later.' },
      { status: 500 }
    );
  }
}
