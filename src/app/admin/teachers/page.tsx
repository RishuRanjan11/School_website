'use client';

import React, { useState, useEffect } from 'react';
import { Teacher } from '@/types';
import TeacherAvatar from '@/components/TeacherAvatar';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Upload, 
  Check, 
  AlertCircle,
} from 'lucide-react';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const initialForm = {
    name: '',
    subject: '',
    department: 'Higher Secondary (Science)',
    designation: 'Senior PGT',
    experience: '5+ Years',
    classes_taught: '',
    email: '',
    phone: '',
    photo_url: '',
    bio: '',
  };
  const [formData, setFormData] = useState(initialForm);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load teachers
  const loadTeachers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/teachers');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTeachers(json.data);
        }
      }
    } catch (e) {
      console.error('Error fetching teachers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // Handle Photo Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      setFormError(null);
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, photo_url: data.url }));
      } else {
        setFormError(data.message || 'Failed to upload photo');
      }
    } catch {
      setFormError('Upload failed due to network error');
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData(initialForm);
    setFormError(null);
    setIsAddOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      department: teacher.department,
      designation: teacher.designation,
      experience: teacher.experience,
      classes_taught: teacher.classes_taught || '',
      email: teacher.email || '',
      phone: teacher.phone || '',
      photo_url: teacher.photo_url || '',
      bio: teacher.bio || '',
    });
    setFormError(null);
  };

  // Submit Add Teacher
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) {
      setFormError('Please fill in teacher name and subject.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAddOpen(false);
        loadTeachers();
      } else {
        setFormError(data.message || 'Failed to add teacher');
      }
    } catch {
      setFormError('A network error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit Teacher
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    try {
      setSubmitting(true);
      setFormError(null);

      const res = await fetch(`/api/teachers/${editingTeacher.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEditingTeacher(null);
        loadTeachers();
      } else {
        setFormError(data.message || 'Failed to update teacher');
      }
    } catch {
      setFormError('A network error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Teacher
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeletingId(null);
        loadTeachers();
      } else {
        alert('Failed to delete teacher');
      }
    } catch {
      alert('Network error while deleting');
    }
  };

  const departments = [
    'All',
    'Higher Secondary (Science)',
    'Higher Secondary (Commerce)',
    'Higher Secondary (Arts)',
    'Secondary (Classes IX-X)',
  ];

  const filteredTeachers = teachers.filter((t) => {
    const matchesDept = selectedDept === 'All' || t.department.toLowerCase() === selectedDept.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      t.name.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.designation.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-gold-400" />
            <span>Faculty & Teachers Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add new educators, set the classes they teach, and update their photos.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Teacher</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedDept === dept
                  ? 'bg-gold-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {dept === 'All' ? 'All Streams' : dept.replace('Higher Secondary ', '+2 ')}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading teachers directory...
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            No teachers found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Teacher</th>
                  <th className="py-4 px-4">Subject & Stream</th>
                  <th className="py-4 px-4">Designation</th>
                  <th className="py-4 px-4 hidden md:table-cell">Classes Taught</th>
                  <th className="py-4 px-4 hidden lg:table-cell">Contact</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <TeacherAvatar
                          src={teacher.photo_url}
                          alt={teacher.name}
                          className="w-10 h-10 rounded-full shrink-0 border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{teacher.name}</div>
                          <div className="text-[11px] text-slate-400">{teacher.experience} Experience</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded bg-school-900/80 text-gold-300 font-semibold border border-school-700/60 text-xs">
                        {teacher.subject}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-1 truncate max-w-[180px]">
                        {teacher.department}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {teacher.designation}
                    </td>

                    <td className="py-4 px-4 hidden md:table-cell text-slate-400 text-xs">
                      {teacher.classes_taught || 'Not specified'}
                    </td>

                    <td className="py-4 px-4 hidden lg:table-cell text-slate-400 text-xs space-y-0.5">
                      {teacher.email && <div>{teacher.email}</div>}
                      {teacher.phone && <div className="text-slate-500">{teacher.phone}</div>}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(teacher)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gold-400 hover:text-white transition"
                          title="Edit Teacher"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(teacher.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition"
                          title="Delete Teacher"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {(isAddOpen || editingTeacher) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsAddOpen(false);
                setEditingTeacher(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-400" />
              <span>{editingTeacher ? 'Edit Teacher Details' : 'Add New Faculty Member'}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Update information that will appear on the school's public faculty directory.
            </p>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingTeacher ? handleEditSubmit : handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Teacher's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject Taught *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics, Accountancy, History"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Department / Stream *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Higher Secondary (Science)">Higher Secondary (Science)</option>
                    <option value="Higher Secondary (Commerce)">Higher Secondary (Commerce)</option>
                    <option value="Higher Secondary (Arts)">Higher Secondary (Arts / Humanities)</option>
                    <option value="Secondary (Classes IX-X)">Secondary (Classes IX-X)</option>
                    <option value="Middle & Primary">Middle & Primary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Science, Senior PGT"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Teaching Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Classes Taught
                </label>
                <input
                  type="text"
                  placeholder="e.g. Classes 9–10, Physics for Classes 11–12"
                  value={formData.classes_taught}
                  onChange={(e) => setFormData({ ...formData, classes_taught: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Official Email
                  </label>
                  <input
                    type="email"
                    placeholder="teacher@school.edu.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Extension / Contact
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Photo Upload or URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teacher Photo (Upload Image or Paste Image URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="https://... or upload below"
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    className="flex-1 px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                    <span>{uploadingPhoto ? 'Uploading...' : 'Browse File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="mt-2 flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl border border-slate-700">
                    <TeacherAvatar
                      src={formData.photo_url}
                      alt="Teacher photo preview"
                      className="w-10 h-10 rounded-full shrink-0"
                    />
                    {formData.photo_url && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Photo linked successfully
                    </span>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teacher Bio / Specialization Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Guided 15+ students to 99+ percentile in JEE; specialized in modern optics."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingTeacher(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gold-400 hover:bg-gold-300 disabled:opacity-50 transition"
                >
                  {submitting ? 'Saving...' : editingTeacher ? 'Save Changes' : 'Add Teacher'}
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
              <h3 className="text-base font-bold text-white">Delete Teacher?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove this teacher from the directory? This action cannot be undone.
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
