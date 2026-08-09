import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const validEmail = 'admin@glontisvisaconsultancy.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'Glontis@2026!';

    if (email?.toLowerCase().trim() === validEmail && password === validPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        user: { email: validEmail, role: 'Administrator', name: 'Glontis Admin' },
      });

      // Set auth cookie
      response.cookies.set('glontis_admin_session', 'authenticated_token_' + Date.now(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid email address or password' }, { status: 401 });
  } catch (error) {
    console.error('API /api/admin/login error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
