import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-school-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: October 2026</p>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            UUMV Mahasingh Hasauli is committed to respecting the privacy of students, parents, faculty, and website visitors. This Privacy Policy details the types of information we collect and how we utilize it.
          </p>
          <h2 className="text-lg font-bold text-slate-800 pt-2">1. Information We Collect</h2>
          <p>
            When you submit an admission inquiry or contact our school office through this website, we collect your name, email address, phone number, and details regarding the candidate seeking admission.
          </p>
          <h2 className="text-lg font-bold text-slate-800 pt-2">2. How We Use Information</h2>
          <p>
            The collected information is used solely for processing admission inquiries, communicating official school schedules, and facilitating prospective student counseling. We do not sell or lease personal details to third parties.
          </p>
          <h2 className="text-lg font-bold text-slate-800 pt-2">3. Data Security</h2>
          <p>
            We implement administrative and technical security measures to protect the integrity and confidentiality of all records stored within our administrative databases.
          </p>
        </div>
      </div>
    </div>
  );
}
