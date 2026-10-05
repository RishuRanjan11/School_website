'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  Inbox, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  ShieldCheck,
  LockKeyhole
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isPublicAuthPage = [
    '/admin/login',
    '/admin/forgot-password',
  ].includes(pathname);

  useEffect(() => {
    if (isPublicAuthPage) {
      setCheckingAuth(false);
      return;
    }

    // Check auth status
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setCheckingAuth(false);
      }
    }
    checkSession();
  }, [pathname, isPublicAuthPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
      router.push('/admin/login');
    }
  };

  if (isPublicAuthPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Teachers Directory', href: '/admin/teachers', icon: Users },
    { name: 'Homepage Images & Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Admission Inquiries', href: '/admin/inquiries', icon: Inbox },
    { name: 'Change Password', href: '/admin/security', icon: LockKeyhole },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-school-700 flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5 text-gold-400" />
          </div>
          <span className="font-bold text-sm text-white">Admin Console</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen p-5 z-20`}
      >
        <div className="space-y-6">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-school-700 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight leading-snug">
                UUMV Mahasingh Hasauli
              </h2>
              <div className="flex items-center gap-1 text-[11px] text-gold-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Console</span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
              Management Modules
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${
                    active
                      ? 'bg-gold-500 text-slate-950 font-bold shadow-md shadow-gold-500/20'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Open ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
