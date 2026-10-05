'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GalleryImage } from '@/types';
import { Camera, Calendar, Lock, X } from 'lucide-react';
import { useSchoolAddress } from '@/lib/use-school-address';
import { SCHOOL_UDISE_CODE } from '@/lib/school-address';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const schoolAddress = useSchoolAddress();

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setImages(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedImage]);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded bg-school-100 text-school-900 text-xs font-bold mb-1">
              School UDISE: {SCHOOL_UDISE_CODE}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              School & Events Photo Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              UUMV Mahasingh Hasauli, {schoolAddress}
            </p>
          </div>

          <Link
            href="/admin/gallery"
            className="px-4 py-2 rounded-lg bg-school-900 hover:bg-school-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>Admin: Upload / Edit Photos</span>
          </Link>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No photos uploaded yet.</p>
            <Link
              href="/admin/gallery"
              className="text-xs text-school-700 font-bold hover:underline mt-2 inline-block"
            >
              Upload School Photos in Admin Panel →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="relative h-60 w-full bg-slate-100 overflow-hidden text-left"
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </button>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.event_date && (
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.event_date}</span>
                      </span>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-gold-400"
              aria-label="Close image"
            >
              <X className="w-7 h-7" />
            </button>
            <figure className="max-w-6xl max-h-full" onClick={(event) => event.stopPropagation()}>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-h-[80vh] max-w-full object-contain mx-auto"
              />
              <figcaption className="text-center text-white mt-3">
                <div className="font-semibold">{selectedImage.title}</div>
                {selectedImage.description && (
                  <div className="text-sm text-slate-300 mt-1">{selectedImage.description}</div>
                )}
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </div>
  );
}
