import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Heart
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-school-700 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6 text-gold-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Apex Academy
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering students through holistic education, state-of-the-art facilities, and distinguished faculty. Recognized for outstanding CBSE +2 Board results across Science, Commerce & Arts.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-gold-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Affiliated to CBSE, New Delhi | Affil. No: 2130000</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4 tracking-wide uppercase text-xs">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Senior Secondary (+2) Streams
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Faculty & Teaching Staff
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Campus Events & Gallery
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Laboratories & Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  Admissions Inquiry 2026-27
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Programs */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4 tracking-wide uppercase text-xs">
              Academic Streams (+2)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="font-semibold text-white block text-xs">Science Stream</span>
                <span className="text-xs text-slate-400">Physics, Chemistry, Maths, Biology, Computer Science</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="font-semibold text-white block text-xs">Commerce Stream</span>
                <span className="text-xs text-slate-400">Accountancy, Business Studies, Economics, Applied Maths</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="font-semibold text-white block text-xs">Arts / Humanities</span>
                <span className="text-xs text-slate-400">History, Political Science, Psychology, Sociology, English</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Office Info */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4 tracking-wide uppercase text-xs">
              Contact & Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-1 shrink-0" />
                <span className="text-slate-400 leading-snug">
                  124 Knowledge Boulevard, Institutional Area, New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-slate-400">+91 98765 43210 / 011-2345678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-slate-400">info@apexacademy.edu.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-xs">
                  Mon - Sat: 8:00 AM - 3:30 PM<br />
                  Visiting Hours: 10:00 AM - 1:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and admin shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Apex International Academy. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/admin/login" className="hover:text-gold-400 transition font-medium">
              Administrator Login
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
