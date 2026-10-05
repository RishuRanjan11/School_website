import { createHash, randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getAdminCredentials, saveAdminCredentials } from '@/lib/admin-credentials';

const RESET_MESSAGE = 'If that address belongs to the administrator, a password reset link has been sent.';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@school.edu').trim().toLowerCase();
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_FROM;
    const appUrlValue = process.env.ADMIN_APP_URL;

    if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !password || !from || !appUrlValue) {
      return NextResponse.json(
        { success: false, message: 'Password reset email is not configured. Contact the site administrator.' },
        { status: 503 }
      );
    }

    const appUrl = new URL(appUrlValue);
    if (!['http:', 'https:'].includes(appUrl.protocol)
      || (process.env.NODE_ENV === 'production' && appUrl.protocol !== 'https:')) {
      return NextResponse.json(
        { success: false, message: 'Password reset requires an HTTPS admin application URL.' },
        { status: 503 }
      );
    }

    const credentials = await getAdminCredentials();
    if (!email || email !== adminEmail) {
      return NextResponse.json({ success: true, message: RESET_MESSAGE });
    }

    const now = Date.now();
    const lastResetRequest = credentials.resetTokenExpiresAt
      ? Date.parse(credentials.resetTokenExpiresAt) - 30 * 60 * 1000
      : Number.NaN;
    if (Number.isFinite(lastResetRequest) && now - lastResetRequest < 60 * 1000) {
      return NextResponse.json({ success: true, message: RESET_MESSAGE });
    }

    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    await saveAdminCredentials({
      resetTokenHash: tokenHash,
      resetTokenExpiresAt: expiresAt,
    });

    const resetUrl = new URL('/admin/reset-password', appUrl);
    resetUrl.searchParams.set('token', token);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE.toLowerCase() === 'true'
        : port === 465,
      auth: { user, pass: password },
    });

    await transporter.sendMail({
      from,
      to: adminEmail,
      subject: 'Administrator password reset',
      text: `Use this link to reset the administrator password. It expires in 30 minutes:\n\n${resetUrl.toString()}`,
      html: `<p>Use the link below to reset the administrator password. It expires in 30 minutes.</p><p><a href="${resetUrl.toString()}">Reset administrator password</a></p>`,
    });

    return NextResponse.json({ success: true, message: RESET_MESSAGE });
  } catch (error) {
    console.error('Admin password reset request error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to send a password reset email. Please try again later.' },
      { status: 500 }
    );
  }
}
