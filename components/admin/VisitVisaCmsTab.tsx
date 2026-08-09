'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import { VisitVisaPageData, VisitVisaDestination } from '@/lib/types';
import ImageUploader from './ImageUploader';
import {
  Users,
  Globe,
  FileText,
  HelpCircle,
  Eye,
  Clock,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Search,
  ArrowUp,
  ArrowDown,
  Layers,
  Link as LinkIcon,
  MessageCircle,
} from 'lucide-react';

export default function VisitVisaCmsTab() {
  const { visitVisaPage, setVisitVisaPage, updateData } = useData();
  const [formData, setFormData] = useState<VisitVisaPageData>(visitVisaPage);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeSectionTab, setActiveSectionTab] = useState<
    'hero' | 'content' | 'who_can_apply' | 'destinations' | 'requirements' | 'process' | 'faqs' | 'buttons' | 'seo'
  >('hero');

  const handleSave = async () => {
    setSaving(true);
    setVisitVisaPage(formData);
    const success = await updateData('UPDATE_ENTITY', 'visitVisaPage', formData);
    setSaving(false);
    if (success) {
      setNotification('Visit Visa CMS updated successfully!');
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification('Failed to update Visit Visa CMS');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const toggleVisibility = (key: keyof VisitVisaPageData['section_visibility']) => {
    setFormData((prev) => ({
      ...prev,
      section_visibility: {
        ...prev.section_visibility,
        [key]: !prev.section_visibility[key],
      },
    }));
  };

  const updateArrayString = (
    field: 'who_can_apply' | 'eligibility_requirements' | 'required_documents' | 'benefits',
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayString = (field: 'who_can_apply' | 'eligibility_requirements' | 'required_documents' | 'benefits') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], 'New Entry Item'],
    }));
  };

  const removeArrayString = (
    field: 'who_can_apply' | 'eligibility_requirements' | 'required_documents' | 'benefits',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const currentOrder = formData.section_order || [
      'hero',
      'introduction',
      'overview',
      'who_can_apply',
      'destinations',
      'eligibility',
      'documents',
      'process',
      'processing_info',
      'benefits',
      'faqs',
      'cta',
    ];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;
    const updated = [...currentOrder];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setFormData((prev) => ({ ...prev, section_order: updated }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F07100] bg-orange-50 px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>CMS Page Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0A1838]">Visit Visa Page Management</h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage family visits, business travel specs, sponsor invitations, destinations, FAQs, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/visit-visa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Live Preview</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-black text-xs flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'hero', label: 'Hero & Images' },
          { id: 'content', label: 'Intro & Overview' },
          { id: 'who_can_apply', label: 'Who Can Apply' },
          { id: 'destinations', label: 'Popular Destinations' },
          { id: 'requirements', label: 'Requirements & Documents' },
          { id: 'process', label: 'Process & Duration' },
          { id: 'faqs', label: 'Page FAQs' },
          { id: 'buttons', label: 'Buttons & CTA' },
          { id: 'seo', label: 'SEO & Sections' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSectionTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSectionTab === tab.id
                ? 'bg-[#0A1838] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* HERO & IMAGES SECTION */}
      {activeSectionTab === 'hero' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F07100]" />
            <span>Hero Banner Content & Images</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#0A1838] mb-1">Page Title</label>
              <input
                type="text"
                value={formData.page_title}
                onChange={(e) => setFormData({ ...formData, page_title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A1838] mb-1">URL Slug</label>
              <input
                type="text"
                value={formData.url_slug}
                onChange={(e) => setFormData({ ...formData, url_slug: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A1838] mb-1">Hero Subheading (Badge)</label>
              <input
                type="text"
                value={formData.hero_subheading || ''}
                onChange={(e) => setFormData({ ...formData, hero_subheading: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-[#F07100]"
                placeholder="Visit Visa Assistance"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A1838] mb-1">Hero Main Heading</label>
              <input
                type="text"
                value={formData.hero_heading}
                onChange={(e) => setFormData({ ...formData, hero_heading: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#0A1838] mb-1">Hero Description</label>
              <textarea
                rows={3}
                value={formData.hero_description}
                onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#F07100]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div>
              <ImageUploader
                label="Desktop Hero Image (Recommended: 1920 × 800 px)"
                value={formData.hero_image}
                altText={formData.hero_image_alt_text}
                titleText={formData.hero_image_title}
                onChange={(url, alt, title) =>
                  setFormData({
                    ...formData,
                    hero_image: url,
                    hero_image_alt_text: alt !== undefined ? alt : formData.hero_image_alt_text,
                    hero_image_title: title !== undefined ? title : formData.hero_image_title,
                  })
                }
                recommendedDimensions="1920 × 800 px"
              />
            </div>

            <div>
              <ImageUploader
                label="Mobile Hero Image (Recommended: 800 × 800 px)"
                value={formData.mobile_hero_image || ''}
                altText={formData.mobile_hero_image_alt_text}
                titleText={formData.mobile_hero_image_title}
                onChange={(url, alt, title) =>
                  setFormData({
                    ...formData,
                    mobile_hero_image: url,
                    mobile_hero_image_alt_text: alt !== undefined ? alt : formData.mobile_hero_image_alt_text,
                    mobile_hero_image_title: title !== undefined ? title : formData.mobile_hero_image_title,
                  })
                }
                recommendedDimensions="800 × 800 px"
              />
            </div>
          </div>
        </div>
      )}

      {/* INTRO & OVERVIEW SECTION */}
      {activeSectionTab === 'content' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#F07100]" />
            <span>Introduction & Overview Copy</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#0A1838] mb-1">Introduction Paragraph</label>
              <textarea
                rows={4}
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A1838] mb-1">Visit Visa Detailed Overview</label>
              <textarea
                rows={5}
                value={formData.visa_overview}
                onChange={(e) => setFormData({ ...formData, visa_overview: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#F07100]"
              />
            </div>
          </div>
        </div>
      )}

      {/* WHO CAN APPLY SECTION */}
      {activeSectionTab === 'who_can_apply' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-[#0A1838] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F07100]" />
              <span>Who Can Apply</span>
            </h3>
            <button
              onClick={() => addArrayString('who_can_apply')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#F07100]" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {formData.who_can_apply.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateArrayString('who_can_apply', idx, e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-[#F07100]"
                />
                <button
                  onClick={() => removeArrayString('who_can_apply', idx)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POPULAR DESTINATIONS SECTION */}
      {activeSectionTab === 'destinations' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-[#0A1838] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#F07100]" />
                <span>Popular Visit Visa Destinations</span>
              </h3>
              <p className="text-xs text-slate-500">Manage visit visa country cards displayed on page.</p>
            </div>

            <button
              onClick={() => {
                const newDest: VisitVisaDestination = {
                  id: `vv-dest-${Date.now()}`,
                  title: 'New Visit Visa Country',
                  country: 'Destination Country',
                  badge: '6 Months',
                  description: 'Description of family visit or business travel specs.',
                  key_highlights: ['Fast Processing', 'Invitation Letter Prep'],
                  image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
                  is_active: true,
                };
                setFormData({ ...formData, destinations: [...formData.destinations, newDest] });
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#F07100]" />
              <span>Add Destination</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.destinations.map((item, idx) => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-[#0A1838]">#{idx + 1}</span>
                    <span className="font-extrabold text-xs text-[#F07100]">{item.country}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 text-xs font-bold text-slate-600">
                      <input
                        type="checkbox"
                        checked={item.is_active}
                        onChange={(e) => {
                          const updated = [...formData.destinations];
                          updated[idx].is_active = e.target.checked;
                          setFormData({ ...formData, destinations: updated });
                        }}
                        className="rounded text-[#F07100]"
                      />
                      <span>Active</span>
                    </label>

                    <button
                      onClick={() => {
                        const updated = formData.destinations.filter((_, i) => i !== idx);
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country Name</label>
                    <input
                      type="text"
                      value={item.country}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].country = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={item.badge || ''}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].badge = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold"
                      placeholder="e.g. 6 Months / 2 Years"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-slate-700 mb-1">
                      Key Highlights (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={item.key_highlights.join(', ')}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].key_highlights = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-3 pt-2">
                    <ImageUploader
                      label="Destination Image"
                      value={item.image_url || ''}
                      altText={item.image_alt_text}
                      titleText={item.image_title}
                      onChange={(url, alt, title) => {
                        const updated = [...formData.destinations];
                        updated[idx].image_url = url;
                        if (alt !== undefined) updated[idx].image_alt_text = alt;
                        if (title !== undefined) updated[idx].image_title = title;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      recommendedDimensions="800 × 500 px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REQUIREMENTS & DOCUMENTS SECTION */}
      {activeSectionTab === 'requirements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-[#0A1838]">Eligibility Requirements</h3>
              <button
                onClick={() => addArrayString('eligibility_requirements')}
                className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-[11px]"
              >
                + Add
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {formData.eligibility_requirements.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayString('eligibility_requirements', idx, e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-slate-200 font-medium"
                  />
                  <button
                    onClick={() => removeArrayString('eligibility_requirements', idx)}
                    className="text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-[#0A1838]">Required Documents Checklist</h3>
              <button
                onClick={() => addArrayString('required_documents')}
                className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-[11px]"
              >
                + Add
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {formData.required_documents.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayString('required_documents', idx, e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-slate-200 font-medium"
                  />
                  <button
                    onClick={() => removeArrayString('required_documents', idx)}
                    className="text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-[#0A1838]">Visit Visa Key Benefits</h3>
              <button
                onClick={() => addArrayString('benefits')}
                className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-[11px]"
              >
                + Add Benefit
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {formData.benefits.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayString('benefits', idx, e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-slate-200 font-medium"
                  />
                  <button onClick={() => removeArrayString('benefits', idx)} className="text-red-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROCESS & DURATION SECTION */}
      {activeSectionTab === 'process' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#0A1838] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F07100]" />
                <span>Application Steps</span>
              </h3>

              <button
                onClick={() => {
                  const newStep = {
                    step: formData.application_process.length + 1,
                    title: 'New Process Step',
                    description: 'Step explanation text...',
                  };
                  setFormData({
                    ...formData,
                    application_process: [...formData.application_process, newStep],
                  });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
              >
                + Add Step
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {formData.application_process.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#0A1838] text-white flex items-center justify-center font-black shrink-0">
                    {idx + 1}
                  </span>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...formData.application_process];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, application_process: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold"
                    />

                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...formData.application_process];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, application_process: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const updated = formData.application_process.filter((_, i) => i !== idx);
                      setFormData({ ...formData, application_process: updated });
                    }}
                    className="text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3">
              Processing & Visa Duration Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Processing Time</label>
                <input
                  type="text"
                  value={formData.processing_information.processing_time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_information: {
                        ...formData.processing_information,
                        processing_time: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Visa Duration / Validity</label>
                <input
                  type="text"
                  value={formData.processing_information.visa_duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_information: {
                        ...formData.processing_information,
                        visa_duration: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Entry Type</label>
                <input
                  type="text"
                  value={formData.processing_information.entry_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_information: {
                        ...formData.processing_information,
                        entry_type: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Stay Duration</label>
                <input
                  type="text"
                  value={formData.processing_information.stay_duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_information: {
                        ...formData.processing_information,
                        stay_duration: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fee Estimate</label>
                <input
                  type="text"
                  value={formData.processing_information.fee_estimate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_information: {
                        ...formData.processing_information,
                        fee_estimate: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block font-bold text-slate-700 mb-1">Important Information Note</label>
                <textarea
                  rows={2}
                  value={formData.processing_information.important_info}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_information: {
                        ...formData.processing_information,
                        important_info: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQS SECTION */}
      {activeSectionTab === 'faqs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-[#0A1838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F07100]" />
              <span>Visit Visa FAQs</span>
            </h3>

            <button
              onClick={() => {
                const newFaq = {
                  id: `vv-faq-${Date.now()}`,
                  question: 'New Question?',
                  answer: 'Answer text details...',
                };
                setFormData({ ...formData, faqs: [...formData.faqs, newFaq] });
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
            >
              + Add FAQ
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {formData.faqs.map((faq, idx) => (
              <div key={faq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[idx].question = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-slate-200 font-bold"
                  />
                  <button
                    onClick={() => {
                      const updated = formData.faqs.filter((_, i) => i !== idx);
                      setFormData({ ...formData, faqs: updated });
                    }}
                    className="text-red-600 ml-2 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...formData.faqs];
                    updated[idx].answer = e.target.value;
                    setFormData({ ...formData, faqs: updated });
                  }}
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUTTONS & CTA SECTION */}
      {activeSectionTab === 'buttons' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-[#F07100]" />
            <span>Buttons & CTA Section</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary CTA Button Text</label>
              <input
                type="text"
                value={formData.primary_cta_text}
                onChange={(e) => setFormData({ ...formData, primary_cta_text: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary CTA Button Link URL</label>
              <input
                type="text"
                value={formData.primary_cta_url}
                onChange={(e) => setFormData({ ...formData, primary_cta_url: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button Text</label>
              <input
                type="text"
                value={formData.secondary_cta_text}
                onChange={(e) => setFormData({ ...formData, secondary_cta_text: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button Link URL</label>
              <input
                type="text"
                value={formData.secondary_cta_url}
                onChange={(e) => setFormData({ ...formData, secondary_cta_url: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">WhatsApp CTA Button Text</label>
              <input
                type="text"
                value={formData.whatsapp_button_text}
                onChange={(e) => setFormData({ ...formData, whatsapp_button_text: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div className="sm:col-span-2 pt-4 border-t border-slate-100">
              <label className="block font-bold text-slate-700 mb-1">Bottom CTA Heading</label>
              <input
                type="text"
                value={formData.cta_heading}
                onChange={(e) => setFormData({ ...formData, cta_heading: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Bottom CTA Description</label>
              <textarea
                rows={2}
                value={formData.cta_description}
                onChange={(e) => setFormData({ ...formData, cta_description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* SEO & SECTION VISIBILITY / ORDER */}
      {activeSectionTab === 'seo' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#F07100]" />
              <span>SEO Meta Tags</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F07100]" />
              <span>Section Visibility Toggles & Order</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { key: 'hero', label: 'Hero Section' },
                { key: 'introduction', label: 'Introduction' },
                { key: 'overview', label: 'Overview' },
                { key: 'who_can_apply', label: 'Who Can Apply' },
                { key: 'destinations', label: 'Destinations' },
                { key: 'eligibility', label: 'Eligibility' },
                { key: 'documents', label: 'Required Documents' },
                { key: 'process', label: 'Application Process' },
                { key: 'processing_info', label: 'Processing Info' },
                { key: 'benefits', label: 'Benefits' },
                { key: 'faqs', label: 'FAQs' },
                { key: 'cta', label: 'CTA Banner' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleVisibility(key as any)}
                  className={`p-3 rounded-xl border text-left font-bold flex items-center justify-between transition-all ${
                    formData.section_visibility[key as keyof VisitVisaPageData['section_visibility']]
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-[10px] uppercase font-black">
                    {formData.section_visibility[key as keyof VisitVisaPageData['section_visibility']]
                      ? 'Visible'
                      : 'Hidden'}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="block font-extrabold text-xs text-[#0A1838]">Reorder Section Layout</span>
              <div className="space-y-1.5 text-xs">
                {(
                  formData.section_order || [
                    'hero',
                    'introduction',
                    'overview',
                    'who_can_apply',
                    'destinations',
                    'eligibility',
                    'documents',
                    'process',
                    'processing_info',
                    'benefits',
                    'faqs',
                    'cta',
                  ]
                ).map((secKey, idx, arr) => (
                  <div
                    key={secKey}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between font-bold text-slate-700 capitalize"
                  >
                    <span>
                      {idx + 1}. {secKey.replace(/_/g, ' ')}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveSection(idx, 'up')}
                        className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === arr.length - 1}
                        onClick={() => moveSection(idx, 'down')}
                        className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
