'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to send a password reset email.');
        return;
      }
      setMessage(data.message);
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-7 h-7 text-gold-400" />
          <h1 className="text-xl font-bold text-white">Forgot password</h1>
        </div>
        <p className="text-sm text-slate-400 mb-6">
          Enter the administrator email address. If it matches, we’ll send a reset link.
        </p>

        {error && (
          <div role="alert" className="mb-5 p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-sm flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {message && (
          <p role="status" className="mb-5 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-sm">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Admin email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <Link href="/admin/login" className="inline-flex items-center gap-2 mt-6 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          Back to admin login
        </Link>
      </div>
    </div>
  );
}
