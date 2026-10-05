import React from 'react';
import Link from 'next/link';
import FallbackImage from '@/components/FallbackImage';
import { 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Bell, 
  CheckCircle, 
  Calendar,
  Camera
} from 'lucide-react';
import HomeGalleryShowcase from '@/components/HomeGalleryShowcase';
import TeacherAvatar from '@/components/TeacherAvatar';
import { getNotices, getTeachers } from '@/lib/db';
import { SCHOOL_UDISE_CODE } from '@/lib/school-address';
import SchoolAddressText from '@/components/SchoolAddressText';

export const revalidate = 0;

export default async function HomePage() {
  const notices = await getNotices();
  const teachers = await getTeachers();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. HERO SECTION WITH SCHOOL PHOTO */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: School Information */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-school-100 text-school-900 text-xs font-bold">
                <span>School UDISE: {SCHOOL_UDISE_CODE}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                UUMV Mahasingh Hasauli
              </h1>

              <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-slate-700">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <SchoolAddressText />
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                Utkramit Uccha Madhyamik Vidyalaya (UUMV) Mahasingh Hasauli provides government school education from foundational classes up to Senior Secondary (+2), with Science, Commerce, and Arts streams.
              </p>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs text-slate-500 font-medium">Classes Taught</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">Up to +2 (Class 12)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs text-slate-500 font-medium">Streams (+2)</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">Science & Arts</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-500 font-medium">Teaching Faculty</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{teachers.length} Educators</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/faculty"
                  className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-school-900 hover:bg-school-800 transition flex items-center gap-1.5 shadow-sm"
                >
                  <Users className="w-4 h-4 text-gold-400" />
                  <span>View Teachers Details</span>
                </Link>

                <Link
                  href="/gallery"
                  className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center gap-1.5"
                >
                  <Camera className="w-4 h-4 text-slate-600" />
                  <span>School Photos</span>
                </Link>

              </div>
            </div>

            {/* Right Col: Actual School Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <div className="relative h-72 sm:h-80 w-full bg-slate-100">
                  <FallbackImage
                    src="/school.jpg"
                    alt="UUMV Mahasingh Hasauli School Building"
                    className="w-full h-full object-cover"
                    fallbackSrc="/uploads/c63388c5-4705-479c-b9a0-a2070ef449ef.jpg"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4">
                    <span className="text-xs font-bold text-gold-400">School Campus Photo</span>
                    <p className="text-xs text-white">UUMV Mahasingh Hasauli, <SchoolAddressText /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOTICE BOARD */}
      {notices && notices.length > 0 && (
        <section className="bg-amber-50 border-b border-amber-200 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" />
                <span>Notice:</span>
              </span>
            </div>
            <div className="flex-1 text-xs text-slate-800">
              {notices.map((n) => (
                <span key={n.id} className="mr-4 inline-block">
                  <strong className="text-slate-900">• {n.title}</strong> ({n.date})
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. BASIC ACADEMIC INFORMATION (+2 AND HIGH SCHOOL) */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Academic Courses & Sections
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Education offered at UUMV Mahasingh Hasauli up to Class 12 (+2).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">+2 Science Stream</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physics, Chemistry, Mathematics, Biology, and Hindi/English language courses for Classes 11th & 12th.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">+2 Arts Stream</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                History, Political Science, Geography, Economics, Hindi, and English literature for Classes 11th & 12th.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Secondary & Upper Primary</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard curriculum for Classes 1 to 10 covering General Science, Social Studies, Maths, and Languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOMEPAGE EVENT & GALLERY SHOWCASE (ADMIN CONTROLLED) */}
      <HomeGalleryShowcase />

      {/* 5. TEACHERS SUMMARY */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                School Teachers
              </h2>
              <p className="text-xs text-slate-600">
                Teaching staff at UUMV Mahasingh Hasauli (Controlled by Admin).
              </p>
            </div>
            <Link
              href="/faculty"
              className="text-xs font-bold text-school-900 hover:underline flex items-center gap-1"
            >
              <span>View All Teachers Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5"
              >
                <TeacherAvatar
                  src={t.photo_url}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-slate-200 shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{t.name}</h4>
                  <div className="text-xs font-semibold text-school-700 truncate">{t.designation}</div>
                  <div className="text-[11px] text-slate-500 truncate">{t.department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
