'use client';

import { FormEvent, Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Lock, ShieldCheck } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading password reset...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirmation) {
      setError('The passwords do not match.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/auth/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to reset the password.');
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
          <h1 className="text-xl font-bold text-white">Set a new password</h1>
        </div>

        {error && (
          <div role="alert" className="mb-5 p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-sm flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {message ? (
          <div>
            <p role="status" className="mb-5 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-sm">
              {message}
            </p>
            <Link href="/admin/login" className="text-sm text-gold-400 hover:text-gold-300">Return to sign in</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-400 mb-6">Choose a password of at least 12 characters and no more than 72 UTF-8 bytes.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="new-password" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  New password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="new-password"
                    type="password"
                    minLength={12}
                    maxLength={72}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  minLength={12}
                  maxLength={72}
                  required
                  autoComplete="new-password"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Reset password'}
              </button>
            </form>
            {!token && <p className="mt-4 text-sm text-red-300">This reset link is missing its token. Request a new link.</p>}
          </>
        )}
      </div>
    </div>
  );
}
