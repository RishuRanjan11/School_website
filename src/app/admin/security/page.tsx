'use client';

import { FormEvent, useState } from 'react';
import { AlertCircle, LockKeyhole } from 'lucide-react';

export default function AdminSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (newPassword !== confirmation) {
      setError('The new passwords do not match.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/auth/password/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to change the password.');
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmation('');
      setMessage(data.message);
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <LockKeyhole className="w-6 h-6 text-gold-400" />
          Change Password
        </h1>
        <p className="text-sm text-slate-400 mt-2">Update the password used to access the admin dashboard.</p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
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
            <label htmlFor="current-password" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              minLength={12}
              maxLength={72}
              required
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
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
            disabled={loading}
            className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  );
}
