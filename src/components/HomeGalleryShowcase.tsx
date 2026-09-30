'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GalleryImage } from '@/types';
import { Camera, Calendar, ChevronRight } from 'lucide-react';

export default function HomeGalleryShowcase() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setImages(json.data);
          }
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-50 text-school-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-school-700" />
              <span>School Photos & Events</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Campus Photos & Events Showcase
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Photos of UUMV Mahasingh Hasauli campus and school activities (Controlled by Admin).
            </p>
          </div>

          <Link
            href="/gallery"
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1"
          >
            <span>View All Photos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No photos added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                {/* Image Container with standard img tag to ensure 100% reliable rendering */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      // Fallback to school.jpg if local path has an issue
                      (e.target as HTMLImageElement).src = '/school.jpg';
                    }}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.event_date && (
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1 text-slate-700">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.event_date}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
