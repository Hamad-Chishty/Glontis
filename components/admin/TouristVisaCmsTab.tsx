'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import { TouristVisaPageData } from '@/lib/types';
import ImageUploader from './ImageUploader';
import {
  Compass,
  Globe,
  FileText,
  HelpCircle,
  Eye,
  EyeOff,
  Clock,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Search,
} from 'lucide-react';

export default function TouristVisaCmsTab() {
  const { touristVisaPage, setTouristVisaPage, updateData } = useData();
  const [formData, setFormData] = useState<TouristVisaPageData>(touristVisaPage);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeSectionTab, setActiveSectionTab] = useState<'hero' | 'content' | 'destinations' | 'requirements' | 'process' | 'faqs' | 'seo'>('hero');

  const handleSave = async () => {
    setSaving(true);
    setTouristVisaPage(formData);
    const success = await updateData('UPDATE_ENTITY', 'touristVisaPage', formData);
    setSaving(false);
    if (success) {
      setNotification('Tourist Visa CMS updated successfully!');
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification('Failed to update Tourist Visa CMS');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const toggleVisibility = (key: keyof TouristVisaPageData['section_visibility']) => {
    setFormData((prev) => ({
      ...prev,
      section_visibility: {
        ...prev.section_visibility,
        [key]: !prev.section_visibility[key],
      },
    }));
  };

  const updateArrayString = (field: 'eligibility_requirements' | 'required_documents' | 'benefits', index: number, value: string) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayString = (field: 'eligibility_requirements' | 'required_documents' | 'benefits') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], 'New Requirement Entry'],
    }));
  };

  const removeArrayString = (field: 'eligibility_requirements' | 'required_documents' | 'benefits', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F07100] bg-orange-50 px-3 py-1 rounded-full">
            <Compass className="w-3.5 h-3.5" />
            <span>CMS Page Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0A1838]">Tourist Visa Page Management</h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage holiday destinations, e-visa processing specs, hotel itineraries, FAQs, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/tourist-visa"
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
          { id: 'destinations', label: 'Holiday Destinations' },
          { id: 'requirements', label: 'Requirements & Documents' },
          { id: 'process', label: 'Process & Validity' },
          { id: 'faqs', label: 'Page FAQs' },
          { id: 'seo', label: 'SEO & Visibility' },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700">Page Main Title</label>
              <input
                type="text"
                value={formData.page_title}
                onChange={(e) => setFormData({ ...formData, page_title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700">Hero Main Heading</label>
              <input
                type="text"
                value={formData.hero_heading}
                onChange={(e) => setFormData({ ...formData, hero_heading: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-extrabold text-slate-700">Hero Description Paragraph</label>
              <textarea
                rows={3}
                value={formData.hero_description}
                onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            {/* Desktop Hero Image */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0A1838]">Desktop Hero Image</h4>
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

            {/* Mobile Hero Image */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0A1838]">Mobile Hero Image</h4>
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
            <span>Introduction & Visa Overview</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700">Introduction Summary</label>
              <textarea
                rows={3}
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700">Detailed Tourist Visa Services Overview</label>
              <textarea
                rows={5}
                value={formData.visa_overview}
                onChange={(e) => setFormData({ ...formData, visa_overview: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              />
            </div>
          </div>
        </div>
      )}

      {/* HOLIDAY DESTINATIONS SECTION */}
      {activeSectionTab === 'destinations' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-[#0A1838] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#F07100]" />
              <span>Popular Holiday Destinations ({formData.destinations.length})</span>
            </h3>

            <button
              onClick={() => {
                const newItem = {
                  id: `tv-${Date.now()}`,
                  title: 'New Destination E-Visa',
                  country: 'Destination Country',
                  badge: 'Fast E-Visa',
                  description: 'Brief overview of tourist visa package.',
                  key_highlights: ['Highlight 1', 'Highlight 2'],
                  image_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
                  is_active: true,
                };
                setFormData({ ...formData, destinations: [...formData.destinations, newItem] });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Destination</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.destinations.map((item, idx) => (
              <div key={item.id || idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#F07100]">Destination #{idx + 1}</span>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        destinations: formData.destinations.filter((_, i) => i !== idx),
                      });
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Package Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Country / Region</label>
                    <input
                      type="text"
                      value={item.country}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].country = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Badge Tag</label>
                    <input
                      type="text"
                      value={item.badge || ''}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].badge = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Highlights (Comma Separated)</label>
                    <input
                      type="text"
                      value={item.key_highlights ? item.key_highlights.join(', ') : ''}
                      onChange={(e) => {
                        const updated = [...formData.destinations];
                        updated[idx].key_highlights = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        setFormData({ ...formData, destinations: updated });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="pt-2">
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
            ))}
          </div>
        </div>
      )}

      {/* REQUIREMENTS & DOCUMENTS SECTION */}
      {activeSectionTab === 'requirements' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-[#0A1838]">Eligibility Criteria</h3>
              <button
                onClick={() => addArrayString('eligibility_requirements')}
                className="text-xs font-bold text-[#F07100] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Criterion</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.eligibility_requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateArrayString('eligibility_requirements', idx, e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                  <button
                    onClick={() => removeArrayString('eligibility_requirements', idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-[#0A1838]">Required Documents Checklist</h3>
              <button
                onClick={() => addArrayString('required_documents')}
                className="text-xs font-bold text-[#F07100] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Document</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.required_documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={doc}
                    onChange={(e) => updateArrayString('required_documents', idx, e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                  <button
                    onClick={() => removeArrayString('required_documents', idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROCESS & VALIDITY SECTION */}
      {activeSectionTab === 'process' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F07100]" />
            <span>Processing Times & Visa Specifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Turnaround Speed / Processing Time</label>
              <input
                type="text"
                value={formData.processing_information.processing_time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processing_information: { ...formData.processing_information, processing_time: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Validity Period</label>
              <input
                type="text"
                value={formData.processing_information.validity_period}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processing_information: { ...formData.processing_information, validity_period: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Entry Type</label>
              <input
                type="text"
                value={formData.processing_information.entry_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processing_information: { ...formData.processing_information, entry_type: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Allowed Stay Duration</label>
              <input
                type="text"
                value={formData.processing_information.stay_duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processing_information: { ...formData.processing_information, stay_duration: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Fee Estimate Overview</label>
              <input
                type="text"
                value={formData.processing_information.fee_estimate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processing_information: { ...formData.processing_information, fee_estimate: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* PAGE FAQS SECTION */}
      {activeSectionTab === 'faqs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-[#0A1838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F07100]" />
              <span>Tourist Visa FAQs ({formData.faqs.length})</span>
            </h3>

            <button
              onClick={() => {
                const newFaq = {
                  id: `tv-faq-${Date.now()}`,
                  question: 'New Question?',
                  answer: 'Detailed explanation.',
                };
                setFormData({ ...formData, faqs: [...formData.faqs, newFaq] });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.faqs.map((faq, idx) => (
              <div key={faq.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#F07100]">FAQ #{idx + 1}</span>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, faqs: formData.faqs.filter((_, i) => i !== idx) });
                    }}
                    className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[idx].question = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300"
                  />

                  <textarea
                    rows={2}
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[idx].answer = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO & VISIBILITY SECTION */}
      {activeSectionTab === 'seo' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-[#0A1838] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#F07100]" />
            <span>Search Engine Optimization (SEO) & Visibility</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">URL Slug</label>
              <input
                type="text"
                value={formData.url_slug}
                onChange={(e) => setFormData({ ...formData, url_slug: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">SEO Meta Title</label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Meta Description</label>
              <textarea
                rows={3}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0A1838]">Section Visibility Controls</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(formData.section_visibility).map(([key, isVisible]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleVisibility(key as any)}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    isVisible
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                  }`}
                >
                  <span className="capitalize">{key.replace('_', ' ')}</span>
                  {isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
