import { NextRequest, NextResponse } from 'next/server';
import { getTeachers, addTeacher } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { getStorageProxyUrl } from '@/lib/storage-url';
import { getDatabaseSetupError } from '@/lib/database-errors';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const teachers = await getTeachers();
    return NextResponse.json({
      success: true,
      data: teachers.map((teacher) => ({
        ...teacher,
        photo_url: teacher.photo_url ? getStorageProxyUrl(teacher.photo_url) : '',
      })),
    });
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
    const { name, subject, department, designation, experience, email, phone, photo_url, bio, classes_taught } = body;

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
      qualification: '',
      classes_taught: (classes_taught || '').trim(),
      experience: (experience || '1 Year').trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      photo_url: photo_url || '',
      bio: (bio || '').trim(),
      order_index: body.order_index || 0,
    });

    return NextResponse.json({ success: true, data: newTeacher }, { status: 201 });
  } catch (error) {
    console.error('Error adding teacher:', error);
    return NextResponse.json(
      {
        success: false,
        message: getDatabaseSetupError(error)
          || (error instanceof Error ? error.message : 'Failed to add teacher'),
      },
      { status: 500 }
    );
  }
}
