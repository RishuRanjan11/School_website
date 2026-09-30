import React from 'react';
import { GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import FallbackImage from '@/components/FallbackImage';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="inline-block px-3 py-1 rounded bg-school-100 text-school-900 text-xs font-bold">
            School UDISE: 100051603811
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            About UUMV Mahasingh Hasauli
          </h1>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
            <span>Madhepur, Madhubani, Bihar</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed pt-2">
            Utkramit Uccha Madhyamik Vidyalaya (UUMV) Mahasingh Hasauli is an established government co-educational institution providing school education up to the +2 (Senior Secondary) level in Madhepur block of Madhubani district, Bihar.
          </p>
        </div>

        {/* School Photo Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="relative h-64 sm:h-80 w-full bg-slate-100">
            <FallbackImage
              src="/school.jpg"
              alt="UUMV Mahasingh Hasauli Campus"
              className="w-full h-full object-cover"
              fallbackSrc="/uploads/c63388c5-4705-479c-b9a0-a2070ef449ef.jpg"
            />
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 font-medium text-center">
            School Building of UUMV Mahasingh Hasauli, Madhepur, Madhubani, Bihar
          </div>
        </div>

        {/* Basic School Information */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Basic School Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium block">School Name</span>
              <strong className="text-slate-900">UUMV Mahasingh Hasauli</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium block">School UDISE Code</span>
              <strong className="text-slate-900">100051603811</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium block">Block & District</span>
              <strong className="text-slate-900">Madhepur, Madhubani</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium block">State</span>
              <strong className="text-slate-900">Bihar, India</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium block">Classes Taught</span>
              <strong className="text-slate-900">Class 1 to Class 12 (+2)</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium block">Senior Secondary Streams</span>
              <strong className="text-slate-900">Arts & Science Streams</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
