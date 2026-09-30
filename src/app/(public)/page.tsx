import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Bell, 
  Compass, 
  Sparkles,
  Shield,
  FlaskConical,
  Briefcase,
  Palette
} from 'lucide-react';
import HomeGalleryShowcase from '@/components/HomeGalleryShowcase';
import { getNotices } from '@/lib/db';

export const revalidate = 0; // Fresh updates for dynamic notices & images

export default async function HomePage() {
  const notices = await getNotices();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-school-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3c79ff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-800/80 border border-school-700 text-gold-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Admissions Open for Class XI (+2 Streams) & Nursery-IX (2026-27)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Shaping Global Minds, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500">
                  Inspiring Excellence.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Welcome to Apex International Academy — an esteemed institution dedicated to holistic education from foundational stages up to Higher Secondary (+2) with specialized Science, Commerce, and Humanities tracks.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/academics"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition"
                >
                  Explore +2 Streams
                </Link>

                <Link
                  href="/faculty"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-300 hover:text-white transition"
                >
                  Meet Faculty →
                </Link>
              </div>

              {/* Accreditations badge */}
              <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-school-300">
                  <Shield className="w-4 h-4 text-gold-400" />
                  <span>Affiliated to CBSE, New Delhi</span>
                </div>
                <span>•</span>
                <span>Code: 2130000</span>
                <span>•</span>
                <span>100% Board Results</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-500 to-school-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900">
                  <div className="relative h-80 sm:h-96 w-full">
                    <Image
                      src="/images/school-hero.jpg"
                      alt="Apex Academy School Campus"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  {/* Overlaid stats pill */}
                  <div className="p-5 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">Campus Highlights</p>
                      <h4 className="text-base font-bold text-white">Innovation Labs & Sports Complex</h4>
                    </div>
                    <Link
                      href="/gallery"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-school-800 text-school-200 hover:text-white transition"
                    >
                      View Campus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY STATS STRIP */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-school-900">100%</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Board Exam Pass Rate</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-school-900">3 Streams</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">+2 Science, Commerce & Arts</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-school-900">65+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Distinguished Faculty</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-school-900">28+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Years of Academic Legacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST NOTICES & ANNOUNCEMENTS */}
      {notices && notices.length > 0 && (
        <section className="bg-amber-50/60 border-b border-amber-200/60 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="p-2 rounded-lg bg-gold-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                <Bell className="w-3.5 h-3.5" />
                Latest Notices
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
                {notices.slice(0, 2).map((notice) => (
                  <div key={notice.id} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-600 shrink-0" />
                    <span className="font-semibold text-slate-900">{notice.title}</span>
                    <span className="text-xs text-slate-700">({notice.date})</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/contact" className="text-xs font-bold text-school-800 hover:text-school-900 shrink-0">
              Inquire for Admission →
            </Link>
          </div>
        </section>
      )}

      {/* 4. SENIOR SECONDARY (+2) CURRICULUM HIGHLIGHT */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-100 text-school-800 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Higher Secondary (+2) Specializations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-school-900">
              Comprehensive Career Pathways for Classes XI & XII
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Our Senior Secondary program provides rigorous academic training, practical laboratory mentorship, and competitive entrance exam foundation (JEE, NEET, CUET, CA Foundation).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stream 1: Science */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <FlaskConical className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Science Stream (PCM / PCB)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Designed for aspiring engineers, doctors, data scientists, and researchers. Features hands-on experiments in dedicated laboratories.
                </p>

                <div className="space-y-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Physics, Chemistry & Advanced Mathematics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Biology & Biotechnology Specialization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Computer Science (Python, AI & Data Science)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Integrated JEE / NEET Guidance Modules</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-8">
                <Link
                  href="/academics"
                  className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center justify-between"
                >
                  <span>View Science Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stream 2: Commerce */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Commerce & Finance Stream</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Empowering future chartered accountants, corporate leaders, investment bankers, and entrepreneurs with strong business acumen.
                </p>

                <div className="space-y-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Accountancy & Financial Accounting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Business Studies & Corporate Ethics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Economics (Micro, Macro & Indian Economy)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Applied Mathematics & Financial Markets</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-8">
                <Link
                  href="/academics"
                  className="text-amber-600 hover:text-amber-800 font-bold text-sm flex items-center justify-between"
                >
                  <span>View Commerce Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stream 3: Humanities / Arts */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Palette className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Humanities / Arts Stream</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Fostering critical thinking, civic understanding, and expression for civil services, law, journalism, diplomacy, and academia.
                </p>

                <div className="space-y-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Modern & World History</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Political Science & International Relations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Psychology & Behavioral Studies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Sociology, English Literature & Media</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-8">
                <Link
                  href="/academics"
                  className="text-purple-600 hover:text-purple-800 font-bold text-sm flex items-center justify-between"
                >
                  <span>View Humanities Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOMEPAGE EVENT & GALLERY SHOWCASE (ADMIN CONTROLLED) */}
      <HomeGalleryShowcase />

      {/* 6. PRINCIPAL'S WELCOME */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <div className="relative h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                    alt="Principal Apex Academy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-school-900 text-white text-center">
                  <h4 className="font-bold text-lg">Dr. Pratibha Saxena</h4>
                  <p className="text-xs text-gold-400">Principal & Academic Director (Ph.D., M.Ed., M.Sc.)</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider">
                Leadership & Vision
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-school-900 leading-tight">
                "Education is not merely preparing for exams, but nurturing character for life."
              </h2>
              <blockquote className="text-slate-600 leading-relaxed text-base italic border-l-4 border-gold-500 pl-4">
                At Apex International Academy, we foster an environment where inquiry thrives and curiosity is celebrated. Our dedicated faculty tirelessly mentors students through their crucial +2 formative years, giving them both deep foundational knowledge and moral fortitude.
              </blockquote>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h5 className="font-bold text-school-900 text-sm mb-1">Our Mission</h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    To deliver experiential education that equips students for global universities and purposeful careers.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h5 className="font-bold text-school-900 text-sm mb-1">Our Vision</h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    To remain a benchmark of academic distinction, technological innovation, and compassionate leadership.
                  </p>
                </div>
              </div>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-school-900 font-bold text-sm hover:text-school-700"
                >
                  <span>Read Full Principal's Message</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS INQUIRY CTA */}
      <section className="py-16 school-gradient text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Begin Your Child's Journey of Excellence
          </h2>
          <p className="text-school-100 max-w-2xl mx-auto text-base">
            Provisional registration and merit scholarship forms are now being accepted for Class XI (+2 Science, Commerce & Arts) and Classes Nursery through IX for the 2026-27 session.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold text-slate-950 bg-gold-400 hover:bg-gold-300 shadow-xl transition-all transform hover:-translate-y-0.5 text-base"
            >
              Submit Admission Inquiry
            </Link>
            <Link
              href="/faculty"
              className="px-8 py-4 rounded-xl font-semibold text-white bg-school-800/80 hover:bg-school-800 border border-school-700 transition text-base"
            >
              Explore Faculty Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
