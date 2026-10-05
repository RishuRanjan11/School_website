'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { DEFAULT_SCHOOL_ADDRESS } from '@/lib/school-address';

export default function SchoolAddressPage() {
  const [address, setAddress] = useState(DEFAULT_SCHOOL_ADDRESS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/school-settings', { cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Unable to load school address.');
        if (active) setAddress(data.address);
      })
      .catch((loadError: unknown) => {
        console.error('Unable to load school address:', loadError);
        if (active) setError(loadError instanceof Error ? loadError.message : 'Unable to load school address.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/school-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to save school address.');
        return;
      }
      setAddress(data.address);
      setMessage('School address updated successfully.');
    } catch (saveError) {
      console.error('Unable to save school address:', saveError);
      setError('A connection error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <MapPin className="w-6 h-6 text-gold-400" />
          School Address
        </h1>
        <p className="text-sm text-slate-400 mt-2">Edit the address shown on the public website.</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <label htmlFor="school-address" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Address
          </label>
          <textarea
            id="school-address"
            required
            maxLength={500}
            rows={4}
            disabled={loading}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-60"
          />
        </div>

        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        {message && <p role="status" className="text-sm text-emerald-300">{message}</p>}

        <button
          type="submit"
          disabled={loading || saving}
          className="px-5 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 disabled:opacity-50"
        >
          {loading ? 'Loading address...' : saving ? 'Saving...' : 'Save address'}
        </button>
      </form>
    </div>
  );
}
