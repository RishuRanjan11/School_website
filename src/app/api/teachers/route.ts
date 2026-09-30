import { NextRequest, NextResponse } from 'next/server';
import { getTeachers, addTeacher } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    const teachers = await getTeachers();
    return NextResponse.json({ success: true, data: teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, subject, department, designation, qualification, experience, email, phone, photo_url, bio } = body;

    if (!name || !subject || !department) {
      return NextResponse.json(
        { success: false, message: 'Name, Subject, and Department are required.' },
        { status: 400 }
      );
    }

    const newTeacher = await addTeacher({
      name: name.trim(),
      subject: subject.trim(),
      department: department.trim(),
      designation: (designation || 'Teacher').trim(),
      qualification: (qualification || 'Graduate').trim(),
      experience: (experience || '1 Year').trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      photo_url: photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      bio: (bio || '').trim(),
      order_index: body.order_index || 0,
    });

    return NextResponse.json({ success: true, data: newTeacher }, { status: 201 });
  } catch (error) {
    console.error('Error adding teacher:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add teacher' },
      { status: 500 }
    );
  }
}
