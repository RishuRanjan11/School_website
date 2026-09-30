import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-school-900">Terms of Use</h1>
        <p className="text-sm text-slate-500">Last updated: October 2026</p>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            By accessing and utilizing the UUMV Mahasingh Hasauli official website, you agree to comply with the terms and conditions outlined herein.
          </p>
          <h2 className="text-lg font-bold text-slate-800 pt-2">1. Use of Content</h2>
          <p>
            All photographs, curriculum documents, faculty profiles, and school logos published on this website are the intellectual property of UUMV Mahasingh Hasauli. Unauthorized reproduction or commercial use is prohibited without prior written permission.
          </p>
          <h2 className="text-lg font-bold text-slate-800 pt-2">2. Accuracy of Information</h2>
          <p>
            While the administration strives to maintain current information regarding academic curricula, admission dates, and event schedules, the school reserves the right to amend academic calendars and policies according to CBSE and educational directives.
          </p>
        </div>
      </div>
    </div>
  );
}
