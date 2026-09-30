import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  FlaskConical, 
  Briefcase, 
  Palette, 
  CheckCircle2, 
  Award, 
  Calendar, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-100 text-school-800 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Curriculum & Programs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-school-900 tracking-tight">
            Academic Excellence from Foundation to +2
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            Affiliated with the Central Board of Secondary Education (CBSE), New Delhi. Preparing students with academic rigour, scientific temperament, and career-oriented pathways.
          </p>
        </div>

        {/* Higher Secondary (+2) Deep Dive */}
        <div className="space-y-12 mb-20">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-school-950 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gold-500 text-slate-950 flex items-center justify-center text-sm font-black">+2</span>
              <span>Senior Secondary Streams (Classes XI & XII)</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Students select from three specialized academic streams, supported by state-of-the-art laboratories and dedicated mentor counseling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stream 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Science Stream</h3>
              <p className="text-xs text-slate-600 mb-6">
                Ideal for Engineering, Medicine, Pure Sciences, Biotechnology, Data Science, and Architecture.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 text-school-700">Subject Combinations:</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> English Core (Compulsory)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Physics (Theory + Practicals)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Chemistry (Theory + Practicals)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Mathematics / Applied Maths</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Biology / Biotechnology</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Computer Science (Python/AI) / Physical Education</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-1">Competitive Preparation:</span>
                  <p className="text-slate-500">Regular doubt clearing, weekly test series, and foundation for JEE Main/Advanced, NEET, and CUET.</p>
                </div>
              </div>
            </div>

            {/* Stream 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Commerce Stream</h3>
              <p className="text-xs text-slate-600 mb-6">
                Tailored for Chartered Accountancy, Corporate Law, Investment Banking, Management, and Economics.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 text-school-700">Subject Combinations:</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> English Core (Compulsory)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Accountancy & Financial Accounting</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Business Studies & Management Principles</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Economics (Micro & Macro)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Mathematics / Applied Maths</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Informatics Practices / Physical Ed.</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-1">Competitive Preparation:</span>
                  <p className="text-slate-500">Mentorship for CA Foundation, IPMAT (IIM 5-Year Integrated Program), and CUET Commerce domain.</p>
                </div>
              </div>
            </div>

            {/* Stream 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Humanities / Arts Stream</h3>
              <p className="text-xs text-slate-600 mb-6">
                Fosters intellectual breadth for Civil Services (UPSC), Legal Studies, Psychology, Media, and Diplomacy.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 text-school-700">Subject Combinations:</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> English Core (Compulsory)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Political Science & Governance</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> History (World & Modern Indian)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Psychology & Counseling</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Sociology / Economics</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Fine Arts / Physical Education</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-1">Competitive Preparation:</span>
                  <p className="text-slate-500">Mock parliaments, CLAT (Common Law Admission Test) guidance, and analytical writing workshops.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary & Foundational Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-school-900 mb-3">Secondary School (Classes IX & X)</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Building strong analytical foundations in Mathematics, General Science, Social Studies, English, and Second Language (Hindi / Sanskrit / French). Includes life skills, computer applications, and career aptitude profiling.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-school-600" /> 100% CBSE Board Exam Pass Record</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-school-600" /> Continuous and Comprehensive Evaluation (CCE)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-school-600" /> Science Fair & Robotics Club Participation</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-school-900 mb-3">Primary & Middle School (Nursery to Class VIII)</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Activity-based experiential learning designed to ignite natural curiosity. Fosters strong literacy, numeracy, creative expression, environmental consciousness, and physical wellness.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold-600" /> Interactive Smart Classrooms</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold-600" /> Low Student-Teacher Ratio (1:18)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold-600" /> Performing Arts, Music & Martial Arts training</li>
            </ul>
          </div>
        </div>

        {/* Admissions CTA */}
        <div className="bg-school-900 rounded-3xl p-8 sm:p-12 text-white text-center flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Join Our Higher Secondary Batch?</h3>
          <p className="text-slate-300 max-w-xl text-sm mb-6">
            Admissions for Class XI (+2 Streams) are currently open. Enquire today for provisional seat reservation and scholarship eligibility.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gold-400 hover:bg-gold-300 transition shadow-lg shadow-gold-500/20 text-sm flex items-center gap-2"
          >
            <span>Proceed to Admission Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
