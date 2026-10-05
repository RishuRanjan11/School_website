'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSchoolAddress } from '@/lib/use-school-address';
import { SCHOOL_UDISE_CODE } from '@/lib/school-address';
import { 
  GraduationCap, 
  MapPin, 
  Menu, 
  X, 
  Lock, 
  Users, 
  Image as ImageIcon, 
  Phone,
  Info
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const schoolAddress = useSchoolAddress();

  const isCurrent = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About School', href: '/about' },
    { name: 'Teachers Details', href: '/faculty' },
    { name: 'School & Events Photos', href: '/gallery' },
    { name: 'Contact Info', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      {/* Top Banner with UDISE and Address */}
      <div className="bg-school-900 text-white text-xs py-2 px-4 border-b border-school-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-slate-200">
            <span className="font-bold text-gold-400 bg-school-800 px-2 py-0.5 rounded border border-school-700">
              School UDISE: {SCHOOL_UDISE_CODE}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>{schoolAddress}</span>
            </span>
            <span className="hidden md:inline text-school-300">
              • Education up to Class 12th (+2)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 text-xs text-gold-300 hover:text-white bg-school-800 hover:bg-school-700 px-2.5 py-0.5 rounded transition font-medium"
            >
              <Lock className="w-3 h-3 text-gold-400" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-school-900 text-gold-400 flex items-center justify-center font-bold shadow group-hover:scale-105 transition">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-school-950 tracking-tight">
                UUMV Mahasingh Hasauli
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {schoolAddress} • Senior Secondary (+2) School
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isCurrent(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                    active
                      ? 'text-school-900 bg-school-50 font-bold'
                      : 'text-slate-700 hover:text-school-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/admin/login"
              className="ml-3 px-4 py-2 rounded-lg text-xs font-bold text-white bg-school-900 hover:bg-school-800 transition shadow-sm"
            >
              Admin Dashboard
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/admin/login"
              className="px-3 py-1.5 text-xs font-bold text-white bg-school-900 rounded-lg"
            >
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                isCurrent(link.href)
                  ? 'bg-school-50 text-school-900'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-lg text-sm font-bold text-white bg-school-900"
            >
              Admin Control Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
