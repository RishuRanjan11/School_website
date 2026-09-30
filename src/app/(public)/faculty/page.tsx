'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Teacher } from '@/types';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Award, 
  Briefcase, 
  BookOpen, 
  Filter
} from 'lucide-react';

export default function FacultyPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

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

  const departments = [
    'All',
    'Higher Secondary (Science)',
    'Higher Secondary (Commerce)',
    'Higher Secondary (Arts)',
    'Secondary (Classes IX-X)',
  ];

  const filteredTeachers = teachers.filter((t) => {
    const matchesDept = selectedDept === 'All' || t.department.toLowerCase() === selectedDept.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      t.name.toLowerCase().includes(query) ||
      t.subject.toLowerCase().includes(query) ||
      t.designation.toLowerCase().includes(query) ||
      t.qualification.toLowerCase().includes(query);
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-100 text-school-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-4 h-4" />
            <span>Academic Faculty & Mentors</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-school-900 tracking-tight">
            Meet Our Distinguished Educators
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            Our experienced post-graduate teachers (PGTs & TGTs) provide individualized guidance, academic excellence, and competitive entrance exam preparation up to Senior Secondary (+2).
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by teacher name, subject, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:bg-white transition"
            />
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Department:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedDept === dept
                    ? 'bg-school-900 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept === 'All' ? 'All Departments' : dept.replace('Higher Secondary ', '+2 ')}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No teachers found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria or department filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-school-500/30 transition-all duration-300 flex flex-col group"
              >
                {/* Photo & Badge */}
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={teacher.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-school-900/90 text-white backdrop-blur-sm text-xs font-semibold border border-school-700/50">
                      {teacher.subject}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-bold leading-tight">{teacher.name}</h3>
                    <p className="text-xs text-gold-300 font-medium mt-0.5">{teacher.designation}</p>
                  </div>
                </div>

                {/* Teacher Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <BookOpen className="w-4 h-4 text-school-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Stream:</span>
                      <span className="truncate">{teacher.department}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Award className="w-4 h-4 text-gold-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Qualification:</span>
                      <span className="truncate">{teacher.qualification}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Experience:</span>
                      <span>{teacher.experience}</span>
                    </div>

                    {teacher.bio && (
                      <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100 line-clamp-2">
                        "{teacher.bio}"
                      </p>
                    )}
                  </div>

                  {/* Contact Badges */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    {teacher.email ? (
                      <a
                        href={`mailto:${teacher.email}`}
                        className="hover:text-school-700 transition flex items-center gap-1"
                        title={teacher.email}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[140px]">{teacher.email}</span>
                      </a>
                    ) : <span />}
                    {teacher.phone && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Phone className="w-3 h-3" />
                        <span>{teacher.phone}</span>
                      </span>
                    )}
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
