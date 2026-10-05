import React from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, ShieldCheck, Lock } from 'lucide-react';
import SchoolAddressText from '@/components/SchoolAddressText';
import { SCHOOL_UDISE_CODE } from '@/lib/school-address';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-school-800 text-gold-400 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                UUMV Mahasingh Hasauli
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utkramit Uccha Madhyamik Vidyalaya providing education from foundational classes up to Class 12th (+2).
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-bold text-gold-400">
              School UDISE: {SCHOOL_UDISE_CODE}
            </div>
          </div>

          {/* Col 2: Simple links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-gold-400 transition">
                  • Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition">
                  • About School & Profile
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-gold-400 transition">
                  • Teachers Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition">
                  • School & Events Photos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition">
                  • Contact School Office
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gold-400 hover:text-white transition flex items-center gap-1 font-semibold pt-1">
                  <Lock className="w-3 h-3" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              School Location & Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <SchoolAddressText />
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 7488929551</span>
              </p>
              
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} UUMV Mahasingh Hasauli, <SchoolAddressText />.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">School UDISE: {SCHOOL_UDISE_CODE}</span>
            <span>•</span>
            <Link href="/admin/login" className="text-gold-400 hover:underline">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
