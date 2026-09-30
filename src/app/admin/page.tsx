import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  Image as ImageIcon, 
  Inbox, 
  Sparkles, 
  PlusCircle, 
  ArrowUpRight, 
  Database, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { getTeachers, getGalleryImages, getInquiries } from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const teachers = await getTeachers();
  const gallery = await getGalleryImages();
  const inquiries = await getInquiries();

  const featuredImagesCount = gallery.filter((img) => img.is_featured).length;
  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'New').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
        <div>
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome to School Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your faculty directory, update homepage event photos, and review student admissions.
          </p>
        </div>

        {/* Database Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
          <Database className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-slate-300">Data Mode:</span>
          {isSupabaseConfigured ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Supabase Cloud DB
            </span>
          ) : (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> Local DB (Active)
            </span>
          )}
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link 
          href="/admin/teachers"
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </div>
          <div className="text-3xl font-extrabold text-white">{teachers.length}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1">Active Faculty Members</div>
        </Link>

        <Link 
          href="/admin/gallery"
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-gold-400 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </div>
          <div className="text-3xl font-extrabold text-white">{gallery.length}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1">Gallery & Event Photos</div>
        </Link>

        <Link 
          href="/admin/gallery"
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </div>
          <div className="text-3xl font-extrabold text-white">{featuredImagesCount}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1">Showcased on Homepage</div>
        </Link>

        <Link 
          href="/admin/inquiries"
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </div>
          <div className="text-3xl font-extrabold text-white">{inquiries.length}</div>
          <div className="text-xs font-semibold text-slate-400 mt-1">
            Admission Inquiries ({newInquiriesCount} new)
          </div>
        </Link>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-400" />
              <span>Teachers Management</span>
            </h3>
            <Link
              href="/admin/teachers"
              className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Update teacher designations, classes taught, subject mappings, and contact information displayed on the website.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/teachers"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-school-800 hover:bg-school-700 text-white text-xs font-bold transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add / Edit Teachers</span>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gold-400" />
              <span>Homepage Photos & Events</span>
            </h3>
            <Link
              href="/admin/gallery"
              className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload school and event photos, add captions, and select which appear on the homepage.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/gallery"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-slate-950 text-xs font-bold transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Upload School & Event Photos</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Showcase Images Preview */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-white">Live Showcase Photos</h3>
            <p className="text-xs text-slate-400">Photos currently active on the school website and homepage.</p>
          </div>
          <Link
            href="/admin/gallery"
            className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
          >
            Upload More Photos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {gallery.slice(0, 6).map((item) => (
            <div key={item.id} className="relative h-28 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2">
                <span className="text-[10px] text-white font-medium truncate block">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
