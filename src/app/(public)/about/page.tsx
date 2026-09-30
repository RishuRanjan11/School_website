import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  Target, 
  Eye, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-100 text-gold-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-gold-600" />
            <span>Legacy & Values</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-school-900 tracking-tight">
            About Apex International Academy
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            Established in 1998, Apex International Academy has spent over two decades nurturing leaders, scientists, entrepreneurs, and artists through academic distinction and character development.
          </p>
        </div>

        {/* Hero Image & Story */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative h-80 lg:h-auto min-h-[350px]">
              <Image
                src="/images/school-hero.jpg"
                alt="School Campus"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-4">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Our Heritage</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-school-900">
                A Benchmark in Higher Secondary Education
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Apex International Academy is permanently affiliated with the Central Board of Secondary Education (CBSE), New Delhi. Spread across a sprawling lush-green 8-acre campus, our infrastructure combines modern pedagogical architecture with quiet study spaces.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                With a specialized emphasis on Higher Secondary (+2) education, our students consistently rank among the top percentile in CBSE Board Examinations and crack competitive exams like JEE, NEET, CUET, and CLAT.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-school-800">
                <ShieldCheck className="w-4 h-4 text-gold-500" />
                <span>CBSE Affiliation Code: 2130000 | School Code: 60124</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-school-100 text-school-800 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-school-900 mb-2">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To foster intellectual curiosity, analytical thinking, and ethical responsibility in every student. We provide an inclusive environment where students reach their full academic, emotional, and social potential.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-school-900 mb-2">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be an internationally recognized center of academic excellence that empowers youth with lifelong learning habits, cultural empathy, and technological proficiency to succeed in an interconnected world.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-school-900 rounded-3xl p-8 sm:p-12 text-white">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">The Pillars of Apex Academy</h2>
            <p className="text-slate-300 text-sm mt-2">What sets our academic culture and campus community apart.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-school-800/60 border border-school-700/60">
              <h4 className="font-bold text-gold-400 text-base mb-1">Academic Rigour</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Comprehensive CBSE curriculum delivery combined with regular diagnostic tests and Olympiad mentoring.</p>
            </div>
            <div className="p-5 rounded-2xl bg-school-800/60 border border-school-700/60">
              <h4 className="font-bold text-gold-400 text-base mb-1">Expert Faculty</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Over 65 highly qualified PGTs, TGTs, and PhD-holder subject leaders with decades of teaching mastery.</p>
            </div>
            <div className="p-5 rounded-2xl bg-school-800/60 border border-school-700/60">
              <h4 className="font-bold text-gold-400 text-base mb-1">Modern Labs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Physics, Chemistry, Biology, AI & Robotics labs conforming to national research standards.</p>
            </div>
            <div className="p-5 rounded-2xl bg-school-800/60 border border-school-700/60">
              <h4 className="font-bold text-gold-400 text-base mb-1">Holistic Growth</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Debating, arts, martial arts, athletics, football, and music programs integrated into student life.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
