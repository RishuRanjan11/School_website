'use client';

import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  GraduationCap 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    class_applying: 'Class XI (+2 Higher Secondary)',
    stream: 'Science (PCM / PCB)',
    message: '',
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
          message: 'Thank you! Your admission inquiry has been received. Our admissions counselor will contact you shortly.',
        });
        setFormData({
          student_name: '',
          parent_name: '',
          email: '',
          phone: '',
          class_applying: 'Class XI (+2 Higher Secondary)',
          stream: 'Science (PCM / PCB)',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to submit inquiry. Please try again or call our office.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please try again or call our admissions helpline directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-100 text-gold-900 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-gold-600" />
            <span>Admissions & Contact Portal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-school-900 tracking-tight">
            Get in Touch with Admissions
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            Whether you are inquiring about Class XI (+2 Streams) admissions or wish to visit our campus, our admissions team is here to guide you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Col: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-school-900">Campus Contact Details</h2>
              <p className="text-sm text-slate-600">
                You are welcome to schedule a campus walk-through with our academic coordinators during official working hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-school-50 text-school-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-school-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Campus Address</h4>
                    <p className="text-sm text-slate-800 font-medium mt-0.5">
                      124 Knowledge Boulevard, Institutional Area, New Delhi - 110001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-school-50 text-school-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-school-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admissions Helpline</h4>
                    <p className="text-sm text-slate-800 font-medium mt-0.5">
                      +91 98765 43210 / 011-23456789
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-school-50 text-school-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-school-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admissions Email</h4>
                    <p className="text-sm text-slate-800 font-medium mt-0.5">
                      admissions@apexacademy.edu.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-school-50 text-school-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-school-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Visiting Hours</h4>
                    <p className="text-sm text-slate-800 font-medium mt-0.5">
                      Monday to Saturday: 9:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Mock/Embed */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800">
              <h4 className="font-bold text-sm text-gold-400 mb-2">Location & Transit</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Conveniently located 500 meters from Central Knowledge Park Metro Station with easy access to major expressways.
              </p>
              <div className="h-44 w-full rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-8 h-8 text-gold-500 mb-2" />
                <span className="text-xs font-semibold text-slate-200">Apex International Academy Campus</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Institutional Sector, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Right Col: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-school-900 mb-2">Submit Online Admission Enquiry</h2>
              <p className="text-sm text-slate-600 mb-8">
                Fill out the form below. Our admissions counselor will schedule an interaction session and share the prospectus.
              </p>

              {status && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>{status.message}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Student's Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. R. K. Sharma"
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Class Applying For *
                    </label>
                    <select
                      value={formData.class_applying}
                      onChange={(e) => setFormData({ ...formData, class_applying: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 bg-white transition"
                    >
                      <option value="Class XI (+2 Higher Secondary)">Class XI (+2 Higher Secondary)</option>
                      <option value="Class XII (+2 Transfer)">Class XII (+2 Transfer)</option>
                      <option value="Class IX - X (Secondary)">Class IX - X (Secondary)</option>
                      <option value="Class VI - VIII (Middle)">Class VI - VIII (Middle)</option>
                      <option value="Primary (Nursery - V)">Primary (Nursery - V)</option>
                    </select>
                  </div>

                  {formData.class_applying.includes('+2') && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Preferred Stream (+2)
                      </label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 bg-white transition"
                      >
                        <option value="Science (PCM - Engineering)">Science (PCM - Engineering / Technology)</option>
                        <option value="Science (PCB - Medical)">Science (PCB - Medical / Life Sciences)</option>
                        <option value="Science (PCMB - Integrated)">Science (PCMB - Math + Bio)</option>
                        <option value="Commerce (with Mathematics)">Commerce (with Mathematics)</option>
                        <option value="Commerce (without Mathematics)">Commerce (Informatics Practices)</option>
                        <option value="Humanities / Arts">Humanities / Arts Stream</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Additional Message or Queries (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mention any queries about transport routes, hostel/day-boarding facilities, or previous academic scores..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-school-900 hover:bg-school-800 disabled:bg-slate-400 transition shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-400" />
                      <span>Submit Admission Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
