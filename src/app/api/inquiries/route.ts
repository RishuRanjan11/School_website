import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, addInquiry, updateInquiryStatus } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { getDatabaseSetupError } from '@/lib/database-errors';
import { admissionClasses, getAdmissionStreams } from '@/lib/admissions';

export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const inquiries = await getInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student_name, parent_name, email, phone, class_applying, stream, message } = body;

    if (!student_name || !parent_name || !email || !phone || !class_applying || !stream) {
      return NextResponse.json(
        { success: false, message: 'Student Name, Parent Name, Email, Phone, Class, and Stream are required.' },
        { status: 400 }
      );
    }

    if (
      !admissionClasses.includes(class_applying)
      || !getAdmissionStreams(class_applying).includes(stream)
    ) {
      return NextResponse.json(
        { success: false, message: 'Select a valid class and its matching stream.' },
        { status: 400 }
      );
    }

    const inquiry = await addInquiry({
      student_name: student_name.trim(),
      parent_name: parent_name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      class_applying: class_applying.trim(),
      stream: stream.trim(),
      message: message ? message.trim() : '',
    });

    return NextResponse.json({
      success: true,
      message: 'Admission inquiry submitted successfully. The school admissions office will contact you soon.',
      data: inquiry,
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        message: getDatabaseSetupError(error)
          || 'Could not save your inquiry. Please try again or contact the school office.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and Status required' }, { status: 400 });
    }

    const updated = await updateInquiryStatus(id, status);
    return NextResponse.json({ success: updated });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}
