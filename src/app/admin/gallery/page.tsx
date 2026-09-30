'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types';
import { 
  Camera, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Upload, 
  Check, 
  AlertCircle,
  Star,
  Calendar,
} from 'lucide-react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const initialForm = {
    title: '',
    description: '',
    image_url: '',
    is_featured: true,
    event_date: new Date().toISOString().split('T')[0],
  };
  const [formData, setFormData] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load Gallery
  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setImages(json.data);
        }
      }
    } catch (e) {
      console.error('Error fetching gallery:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // Handle Image File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setFormError(null);
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
      } else {
        setFormError(data.message || 'Failed to upload image file');
      }
    } catch {
      setFormError('Upload failed due to network error');
    } finally {
      setUploading(false);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData(initialForm);
    setFormError(null);
    setIsAddOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (img: GalleryImage) => {
    setEditingImage(img);
    setFormData({
      title: img.title,
      description: img.description || '',
      image_url: img.image_url,
      is_featured: img.is_featured,
      event_date: img.event_date || new Date().toISOString().split('T')[0],
    });
    setFormError(null);
  };

  // Toggle Featured Status Instantly
  const toggleFeatured = async (img: GalleryImage) => {
    try {
      const res = await fetch(`/api/gallery/${img.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !img.is_featured }),
      });
      if (res.ok) {
        loadGallery();
      }
    } catch (e) {
      console.error('Error toggling featured status:', e);
    }
  };

  // Submit Add
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      setFormError('Please provide a title and select/upload an image.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAddOpen(false);
        loadGallery();
      } else {
        setFormError(data.message || 'Failed to add image');
      }
    } catch {
      setFormError('A network error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      setSubmitting(true);
      setFormError(null);

      const res = await fetch(`/api/gallery/${editingImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEditingImage(null);
        loadGallery();
      } else {
        setFormError(data.message || 'Failed to update image');
      }
    } catch {
      setFormError('A network error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Image
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeletingId(null);
        loadGallery();
      } else {
        alert('Failed to delete image');
      }
    } catch {
      alert('Network error while deleting image');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <Camera className="w-8 h-8 text-gold-400" />
            <span>Homepage Images & Events Control</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload new school photos, edit captions, and choose which event images appear on the homepage.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Image</span>
        </button>
      </div>

      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
        <div className="text-xs text-slate-400">
          Total: <span className="text-white font-bold">{images.length}</span> images ({images.filter(i => i.is_featured).length} featured on homepage)
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading gallery images...
        </div>
      ) : images.length === 0 ? (
        <div className="p-16 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <Camera className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No images found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group"
            >
              {/* Image Preview & Badges */}
              <div className="relative h-56 w-full bg-slate-950">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                  {/* Instant Toggle Featured Button */}
                  <button
                    onClick={() => toggleFeatured(item)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition shadow-sm ${
                      item.is_featured
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                    title="Click to toggle homepage display"
                  >
                    <Star className={`w-3.5 h-3.5 ${item.is_featured ? 'fill-slate-950' : ''}`} />
                    <span>{item.is_featured ? 'Homepage Active' : 'Not on Home'}</span>
                  </button>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-3 left-3 right-3">
                  {item.event_date && (
                    <div className="flex items-center gap-1.5 text-[11px] text-gold-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.event_date}</span>
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                </div>
              </div>

              {/* Description & Action Footer */}
              <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description || 'No description provided.'}
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                    {item.image_url.startsWith('/uploads/') ? 'Local File' : 'External/Cloud'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gold-400 hover:text-white transition"
                      title="Edit Image Metadata"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Image Modal */}
      {(isAddOpen || editingImage) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsAddOpen(false);
                setEditingImage(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Camera className="w-5 h-5 text-gold-400" />
              <span>{editingImage ? 'Edit School / Event Photo' : 'Upload School & Event Photo'}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Photos uploaded here can be shown directly in the homepage showcase or gallery.
            </p>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingImage ? handleEditSubmit : handleAddSubmit} className="space-y-4">
              {/* File upload or URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Image File (or enter direct URL) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="https://... or upload with Browse"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="flex-1 px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                    <span>{uploading ? 'Uploading...' : 'Browse'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.image_url && (
                  <div className="mt-3 relative h-40 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-700">
                    <Image
                      src={formData.image_url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Image Loaded
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Image Title / Event Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Athletic Championship 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Short Description / Caption
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief note about the achievement or event displayed in the image..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Featured toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500 bg-slate-700 border-slate-600"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Showcase in Homepage Highlights Carousel
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      When enabled, this photo will be featured directly on the main homepage gallery section.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingImage(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gold-400 hover:bg-gold-300 disabled:opacity-50 transition"
                >
                  {submitting ? 'Saving...' : editingImage ? 'Save Changes' : 'Upload Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/60 text-red-400 border border-red-800 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Photo?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove this photo? It will disappear from the homepage and gallery.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
