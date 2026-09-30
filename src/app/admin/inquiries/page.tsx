'use client';

import React, { useState, useEffect } from 'react';
import { AdmissionInquiry } from '@/types';
import { 
  Inbox, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  Filter 
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setInquiries(json.data);
        }
      }
    } catch (e) {
      console.error('Error fetching inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: AdmissionInquiry['status']) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        loadInquiries();
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      inq.student_name.toLowerCase().includes(q) ||
      inq.parent_name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      (inq.stream && inq.stream.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Inbox className="w-8 h-8 text-gold-400" />
          <span>Online Admission Inquiries</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review submissions from prospective students and parents for Class XI (+2 Streams) and general classes.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, parent, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {['All', 'New', 'Contacted', 'Enrolled', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                statusFilter === st
                  ? 'bg-gold-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm">No admission inquiries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Student & Parent</th>
                  <th className="py-4 px-4">Class & Stream</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-white text-sm">{item.student_name}</div>
                      <div className="text-xs text-slate-400">Parent: {item.parent_name}</div>
                      {item.message && (
                        <div className="text-[11px] text-slate-500 italic mt-1 max-w-xs truncate">
                          "{item.message}"
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-200">{item.class_applying}</div>
                      {item.stream && (
                        <div className="text-xs text-gold-400 mt-0.5">{item.stream}</div>
                      )}
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-300 space-y-1">
                      <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-gold-400">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.email}</span>
                      </a>
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-gold-400">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.phone}</span>
                      </a>
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-400">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                          item.status === 'New'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : item.status === 'Contacted'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : item.status === 'Enrolled'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value as AdmissionInquiry['status'])
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
