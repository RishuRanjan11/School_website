import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';
import { getSchoolAddress, saveSchoolAddress } from '@/lib/school-settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ address: await getSchoolAddress() });
  } catch (error) {
    console.error('Error fetching school settings:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to load school address.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const body = await req.json();
    const address = typeof body.address === 'string' ? body.address.trim() : '';
    if (!address || address.length > 500) {
      return NextResponse.json(
        { success: false, message: 'Enter an address of up to 500 characters.' },
        { status: 400 }
      );
    }

    await saveSchoolAddress(address);
    return NextResponse.json({ success: true, address });
  } catch (error) {
    console.error('Error saving school settings:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to save school address.' },
      { status: 500 }
    );
  }
}
