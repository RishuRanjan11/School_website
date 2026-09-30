'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { admissionClasses, getAdmissionStreams } from '@/lib/admissions';

export default function ContactPage() {
  const initialFormData = {
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    class_applying: '',
    stream: '',
    message: '',
  };
  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent to the school office.',
        });
        setFormData(initialFormData);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to submit form. Please contact the school directly.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="inline-block px-3 py-1 rounded bg-school-100 text-school-900 text-xs font-bold">
            School UDISE: 100051603811
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            School Contact & Address
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            UUMV Mahasingh Hasauli, Madhepur, Madhubani, Bihar
          </p>
        </div>

        {/* Address & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">School Details</h2>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Address:</strong>
                  <span className="text-slate-600">Madhepur, Madhubani, Bihar, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Contact Phone:</strong>
                  <span className="text-slate-600">+91 7488929551</span>
                </div>
              </div>

              
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-school-800">
                School UDISE Code: 100051603811
              </span>
            </div>
          </div>

          {/* Simple Contact Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-3">Send a Message / Inquiry</h2>

            {status && (
              <div
                className={`p-3 rounded-lg mb-4 text-xs flex items-center gap-2 ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Student / Sender Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Parent Name"
                  value={formData.parent_name}
                  onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Class Applying For *
                  </label>
                  <select
                    required
                    value={formData.class_applying}
                    onChange={(e) => setFormData({
                      ...formData,
                      class_applying: e.target.value,
                      stream: '',
                    })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
                  >
                    <option value="">Select class</option>
                    {admissionClasses.map((className) => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Stream *
                  </label>
                  <select
                    required
                    disabled={!formData.class_applying}
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">Select stream</option>
                    {getAdmissionStreams(formData.class_applying).map((stream) => (
                      <option key={stream} value={stream}>{stream}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Message / Inquiry Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-school-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg font-bold text-white bg-school-900 hover:bg-school-800 disabled:bg-slate-400 text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-gold-400" />
                <span>{loading ? 'Submitting...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
