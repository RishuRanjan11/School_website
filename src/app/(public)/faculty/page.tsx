'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Teacher } from '@/types';
import { Users, Search, Lock, BookOpen, Briefcase } from 'lucide-react';
import TeacherAvatar from '@/components/TeacherAvatar';

export default function FacultyPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadTeachers() {
      try {
        const res = await fetch('/api/teachers');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setTeachers(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load teachers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTeachers();
  }, []);

  const filteredTeachers = teachers.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded bg-school-100 text-school-900 text-xs font-bold mb-1">
              School UDISE: 100051603811
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Teachers Details
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              UUMV Mahasingh Hasauli, Madhepur, Madhubani, Bihar
            </p>
          </div>

          <Link
            href="/admin/teachers"
            className="px-4 py-2 rounded-lg bg-school-900 hover:bg-school-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>Admin: Control Teachers</span>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teacher by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
            />
          </div>
        </div>

        {/* Teachers Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl h-48 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No teachers found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <TeacherAvatar
                    src={teacher.photo_url}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-lg border border-slate-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h3 className="text-base font-bold text-slate-900 truncate">{teacher.name}</h3>
                    <div className="text-xs font-semibold text-school-800 mt-0.5 truncate">
                      {teacher.designation}
                    </div>
                    <div className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-semibold mt-1">
                      {teacher.subject}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Experience:</span>
                    <span>{teacher.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-school-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Classes:</span>
                    <span className="truncate">{teacher.classes_taught || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-800">Stream:</span>
                    <span className="truncate">{teacher.department}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
