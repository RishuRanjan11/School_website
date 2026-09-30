import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@school.edu';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@12345';

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = await signAdminToken({
      id: 'admin-1',
      email: adminEmail,
      name: 'School Administrator',
      role: 'superadmin',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        email: adminEmail,
        name: 'School Administrator',
        role: 'superadmin',
      },
    });

    // Set HTTP-Only Cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
