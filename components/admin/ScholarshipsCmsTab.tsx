'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import { ScholarshipItem } from '@/lib/types';
import ImageUploader from './ImageUploader';
import {
  Award,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  Edit2,
  X,
  Sparkles,
  Calendar,
  Layers,
  GraduationCap,
} from 'lucide-react';

export default function ScholarshipsCmsTab() {
  const { scholarships, setScholarships, updateData } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [editingScholarship, setEditingScholarship] = useState<ScholarshipItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newScholarship, setNewScholarship] = useState<Partial<ScholarshipItem>>({
    title: '',
    country: 'New Zealand',
    flag_emoji: '🇳🇿',
    award_type: 'Fully Funded Scholarship',
    amount_or_coverage: '100% Tuition Waiver + Annual Living Stipend',
    degree_levels: ["Master's", 'PhD'],
    description: '',
    benefits: ['100% Tuition waiver', 'Living stipend + health insurance'],
    eligibility: ['Strong academic merit', 'Relevant background qualification'],
    deadline: 'Rolling / Intake Specific',
    image_url: 'https://images.unsplash.com/photo-1507699622108-4be3aac6900f?auto=format&fit=crop&w=800&q=80',
    is_featured: false,
    is_active: true,
    display_order: (scholarships?.length || 0) + 1,
  });

  const [newBenefitInput, setNewBenefitInput] = useState('');
  const [newEligibilityInput, setNewEligibilityInput] = useState('');
  const [newDegreeInput, setNewDegreeInput] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleSaveAll = async (updatedList?: ScholarshipItem[]) => {
    setIsSaving(true);
    const listToSave = updatedList || scholarships;
    const ok = await updateData('UPDATE_ENTITY', 'scholarships', listToSave);
    setIsSaving(false);
    if (ok) {
      showNotification('Scholarships CMS updated successfully! Changes are live on Homepage.');
    } else {
      showNotification('Failed to save changes. Please try again.');
    }
  };

  const handleToggleActive = async (id: string) => {
    const updated = scholarships.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s));
    setScholarships(updated);
    await handleSaveAll(updated);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this scholarship entry from CMS?')) return;
    const updated = scholarships.filter((s) => s.id !== id);
    setScholarships(updated);
    await handleSaveAll(updated);
  };

  const handleCreateNew = async () => {
    if (!newScholarship.title || !newScholarship.country) {
      alert('Please provide scholarship title and country.');
      return;
    }

    const item: ScholarshipItem = {
      id: `sch-${Date.now()}`,
      title: newScholarship.title,
      country: newScholarship.country,
      flag_emoji: newScholarship.flag_emoji || '🎓',
      award_type: newScholarship.award_type || 'Merit Scholarship',
      amount_or_coverage: newScholarship.amount_or_coverage || 'Full/Partial Tuition Grant',
      degree_levels: newScholarship.degree_levels || ["Master's", 'PhD'],
      description: newScholarship.description || '',
      benefits: newScholarship.benefits || [],
      eligibility: newScholarship.eligibility || [],
      deadline: newScholarship.deadline || 'Open Annual Cycle',
      image_url: newScholarship.image_url || '',
      image_alt_text: newScholarship.title,
      is_featured: Boolean(newScholarship.is_featured),
      is_active: true,
      display_order: (scholarships?.length || 0) + 1,
    };

    const updated = [...scholarships, item];
    setScholarships(updated);
    setIsAddModalOpen(false);
    setNewScholarship({
      title: '',
      country: 'Italy',
      flag_emoji: '🇮🇹',
      award_type: 'Government Regional Grant',
      amount_or_coverage: '100% Free Tuition + €7,000 / Year Allowance',
      degree_levels: ["Bachelor's", "Master's"],
      description: '',
      benefits: ['Full tuition waiver', 'Campus meal canteen access'],
      eligibility: ['Income document assessment', 'Admission letter'],
      deadline: 'July - September',
      image_url: '',
      is_featured: false,
      is_active: true,
      display_order: updated.length + 1,
    });

    await handleSaveAll(updated);
  };

  const handleUpdateExisting = async () => {
    if (!editingScholarship) return;
    const updated = scholarships.map((s) => (s.id === editingScholarship.id ? editingScholarship : s));
    setScholarships(updated);
    setEditingScholarship(null);
    await handleSaveAll(updated);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-yellow-400/20 text-yellow-800">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Scholarships & Financial Aid CMS</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic Scholarship records feeding the Homepage Scholarships section and study portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Scholarship</span>
          </button>

          <button
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save All Live'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* List of Scholarships */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships?.map((scholarship) => (
          <div
            key={scholarship.id}
            className={`p-6 rounded-2xl border transition-all ${
              scholarship.is_active
                ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
                : 'bg-slate-100/80 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {scholarship.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={scholarship.image_url}
                    alt={scholarship.title}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{scholarship.flag_emoji}</span>
                    <span className="text-xs font-bold text-slate-500">{scholarship.country}</span>
                    {scholarship.is_featured && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1 mt-0.5">
                    {scholarship.title}
                  </h3>
                  <p className="text-[11px] font-bold text-emerald-600 line-clamp-1">
                    {scholarship.amount_or_coverage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleToggleActive(scholarship.id)}
                  title={scholarship.is_active ? 'Disable (Hide from Homepage)' : 'Enable (Show on Homepage)'}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                    scholarship.is_active
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                  }`}
                >
                  {scholarship.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setEditingScholarship(scholarship)}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition-all"
                  title="Edit Scholarship"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(scholarship.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all"
                  title="Delete Scholarship"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
              {scholarship.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                Levels:
              </span>
              {scholarship.degree_levels?.map((lvl, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-medium">
                  {lvl}
                </span>
              ))}
            </div>

            {scholarship.deadline && (
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Deadline: {scholarship.deadline}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingScholarship && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-bold text-slate-900">Edit Scholarship CMS Record</h3>
              </div>
              <button
                onClick={() => setEditingScholarship(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Scholarship Title</label>
                  <input
                    type="text"
                    value={editingScholarship.title}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, title: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Country Name</label>
                  <input
                    type="text"
                    value={editingScholarship.country}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, country: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Flag Emoji</label>
                  <input
                    type="text"
                    value={editingScholarship.flag_emoji || ''}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, flag_emoji: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Award Type</label>
                  <input
                    type="text"
                    value={editingScholarship.award_type}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, award_type: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Amount / Coverage</label>
                  <input
                    type="text"
                    value={editingScholarship.amount_or_coverage}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, amount_or_coverage: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={editingScholarship.description}
                  onChange={(e) => setEditingScholarship({ ...editingScholarship, description: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Deadline / Intake</label>
                <input
                  type="text"
                  value={editingScholarship.deadline || ''}
                  onChange={(e) => setEditingScholarship({ ...editingScholarship, deadline: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Scholarship Image</label>
                <ImageUploader
                  value={editingScholarship.image_url || ''}
                  altText={editingScholarship.image_alt_text || ''}
                  onChange={(url, alt) =>
                    setEditingScholarship({
                      ...editingScholarship,
                      image_url: url,
                      image_alt_text: alt || editingScholarship.image_alt_text,
                    })
                  }
                  label="Scholarship Cover Image"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingScholarship.is_featured}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, is_featured: e.target.checked })}
                    className="rounded text-blue-900"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingScholarship.is_active}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, is_active: e.target.checked })}
                    className="rounded text-blue-900"
                  />
                  <span>Active (Published Live)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setEditingScholarship(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateExisting}
                className="px-6 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md"
              >
                Save Changes Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-900" />
                <h3 className="text-lg font-bold text-slate-900">Add New Scholarship CMS Entry</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Scholarship Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. New Zealand Master's Research Scholarship"
                    value={newScholarship.title || ''}
                    onChange={(e) => setNewScholarship({ ...newScholarship, title: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Country Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. New Zealand, Italy, Turkey"
                    value={newScholarship.country || ''}
                    onChange={(e) => setNewScholarship({ ...newScholarship, country: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Flag Emoji</label>
                  <input
                    type="text"
                    placeholder="🇳🇿"
                    value={newScholarship.flag_emoji || ''}
                    onChange={(e) => setNewScholarship({ ...newScholarship, flag_emoji: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Award Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Fully Funded, Regional Grant"
                    value={newScholarship.award_type || ''}
                    onChange={(e) => setNewScholarship({ ...newScholarship, award_type: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Amount / Coverage</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Tuition + Living Stipend"
                    value={newScholarship.amount_or_coverage || ''}
                    onChange={(e) => setNewScholarship({ ...newScholarship, amount_or_coverage: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide grant scope, covered expenses, stipend and partner institutions..."
                  value={newScholarship.description || ''}
                  onChange={(e) => setNewScholarship({ ...newScholarship, description: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Deadline / Intake Cycle</label>
                <input
                  type="text"
                  placeholder="e.g. July - September Yearly"
                  value={newScholarship.deadline || ''}
                  onChange={(e) => setNewScholarship({ ...newScholarship, deadline: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Image</label>
                <ImageUploader
                  value={newScholarship.image_url || ''}
                  altText={newScholarship.image_alt_text || ''}
                  onChange={(url, alt) =>
                    setNewScholarship({
                      ...newScholarship,
                      image_url: url,
                      image_alt_text: alt || newScholarship.image_alt_text,
                    })
                  }
                  label="Scholarship Cover Image"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNew}
                className="px-6 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md"
              >
                Publish to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
