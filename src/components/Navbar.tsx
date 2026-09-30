'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Lock, 
  ChevronRight,
  BookOpen,
  Award,
  Users,
  Image as ImageIcon,
  Building,
  Send
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isCurrent = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: GraduationCap },
    { name: 'About Us', href: '/about', icon: Award },
    { name: 'Academics (+2)', href: '/academics', icon: BookOpen },
    { name: 'Faculty', href: '/faculty', icon: Users },
    { name: 'Gallery & Events', href: '/gallery', icon: ImageIcon },
    { name: 'Facilities', href: '/facilities', icon: Building },
    { name: 'Contact & Admissions', href: '/contact', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Notification Bar */}
      <div className="bg-school-900 text-slate-100 text-xs py-2 px-4 border-b border-school-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-school-200">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+91 98765 43210</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-school-200">
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>admissions@apexacademy.edu.in</span>
            </span>
            <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 font-medium">
              CBSE Affiliated No: 2130000 | Nursery to Class XII (+2)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              href="/contact" 
              className="hover:text-gold-400 transition font-medium"
            >
              Admissions Open (2026-27)
            </Link>
            <span className="text-school-700">|</span>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 text-slate-200 hover:text-white bg-school-800/80 hover:bg-school-800 px-2.5 py-0.5 rounded text-xs transition"
            >
              <Lock className="w-3 h-3 text-gold-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & School Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-school-900 to-school-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition transform">
              <GraduationCap className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-school-900 flex items-center gap-1.5">
                Apex International Academy
              </div>
              <p className="text-xs text-slate-700 font-medium tracking-wide">
                Higher Secondary School (+2 Science • Commerce • Arts)
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isCurrent(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-school-900 bg-school-50 font-semibold'
                      : 'text-slate-600 hover:text-school-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gold-600 hover:bg-gold-500 shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              Enquire Now
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-school-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isCurrent(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-school-50 text-school-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-school-700' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-school-900 hover:bg-school-800 transition"
            >
              Admission Enquiry (+2 & Primary)
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
            >
              <Lock className="w-3.5 h-3.5" />
              Teacher & Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
