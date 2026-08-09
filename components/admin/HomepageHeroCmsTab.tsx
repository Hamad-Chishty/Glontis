'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Edit2,
  Check,
  ImageIcon,
  Layout,
  Globe,
  GraduationCap,
  Briefcase,
  Users,
  Compass,
  Building2,
  Award,
  Plane,
  X,
  RotateCcw,
} from 'lucide-react';
import { HomeServiceQuickLink, FloatingBadge, HomepageHeroData } from '@/lib/types';

export default function HomepageHeroCmsTab() {
  const { homepageHero, setHomepageHero, updateData } = useData();

  const heroData: HomepageHeroData = homepageHero || {
    eyebrow: 'GLONTIS VISA CONSULTANCY',
    heading: 'Your Journey Abroad Starts Here',
    description:
      'Expert guidance for Study Visa, Work Visa, Visit Visa, Tourist Visa, Business Visa, Immigration & PR, and Overseas Scholarships from Multan\'s premier visa consultancy.',
    primary_cta_text: 'Book Free Consultation',
    primary_cta_url: '/free-consultation',
    secondary_cta_text: 'Explore Our Services',
    secondary_cta_url: '/services',
    hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    hero_image_alt_text: 'Glontis Visa Consultancy - Professional Overseas Guidance',
    hero_image_title: 'Glontis Overseas Consultation',
    mobile_hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    mobile_hero_image_alt_text: 'Glontis Overseas Mobile Banner',
    floating_badges: [
      { id: 'fb-1', title: 'Study Visa', subtitle: 'Top Universities & Grants', icon_name: 'GraduationCap', is_active: true },
      { id: 'fb-2', title: 'Work Visa', subtitle: 'Global Employment Permits', icon_name: 'Briefcase', is_active: true },
      { id: 'fb-3', title: 'Visit Visa', subtitle: 'Family & Sponsor Invites', icon_name: 'Users', is_active: true },
      { id: 'fb-4', title: 'Tourist Visa', subtitle: 'Worldwide Holiday Travel', icon_name: 'Compass', is_active: true },
    ],
    service_quick_links: [
      { id: 'sql-1', title: 'Study Visa', badge: 'Popular', url: '/study-visa', icon_name: 'GraduationCap', description: 'UK, Australia, USA, Canada & EU Top Universities', is_active: true, display_order: 1 },
      { id: 'sql-2', title: 'Work Visa', badge: 'Permits', url: '/work-visa', icon_name: 'Briefcase', description: 'Europe, Middle East & Overseas Job Sponsorships', is_active: true, display_order: 2 },
      { id: 'sql-3', title: 'Visit Visa', badge: 'Sponsor File', url: '/visit-visa', icon_name: 'Users', description: 'Family Visits, Business Meetings & Cover Letters', is_active: true, display_order: 3 },
      { id: 'sql-4', title: 'Tourist Visa', badge: 'Fast Track', url: '/tourist-visa', icon_name: 'Compass', description: 'Schengen, USA, UK & Worldwide Holiday Visas', is_active: true, display_order: 4 },
      { id: 'sql-5', title: 'Business Visa', badge: 'Investors', url: '/services', icon_name: 'Building2', description: 'Corporate Travel, Trade & Investor Entry Permits', is_active: true, display_order: 5 },
      { id: 'sql-6', title: 'Immigration / PR', badge: 'Residency', url: '/services', icon_name: 'Globe', description: 'Express Entry, Skilled Migration & PR Guidance', is_active: true, display_order: 6 },
      { id: 'sql-7', title: 'Scholarships', badge: '100% Funded', url: '/study-destinations', icon_name: 'Award', description: 'Fully Funded & Partial Merit-Based Grants', is_active: true, display_order: 7 },
    ],
  };

  const [formState, setFormState] = useState<HomepageHeroData>(heroData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Service Edit Modal
  const [editingService, setEditingService] = useState<HomeServiceQuickLink | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Badge Edit Modal
  const [editingBadge, setEditingBadge] = useState<FloatingBadge | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const availableIcons = [
    { name: 'GraduationCap', label: 'Study / Education' },
    { name: 'Briefcase', label: 'Work / Job' },
    { name: 'Users', label: 'Visit / Family' },
    { name: 'Compass', label: 'Tourist / Travel' },
    { name: 'Building2', label: 'Business / Investor' },
    { name: 'Globe', label: 'Immigration / PR' },
    { name: 'Award', label: 'Scholarships / Grants' },
    { name: 'Plane', label: 'Flight / Visa' },
  ];

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    setHomepageHero(formState);
    const ok = await updateData('UPDATE_ENTITY', 'homepageHero', formState);

    setIsSaving(false);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Service Quick Link handlers
  const handleOpenAddService = () => {
    const newService: HomeServiceQuickLink = {
      id: `sql-${Date.now()}`,
      title: 'New Visa Service',
      badge: 'New',
      url: '/services',
      icon_name: 'Globe',
      description: 'Professional overseas visa application assistance.',
      is_active: true,
      display_order: (formState.service_quick_links?.length || 0) + 1,
    };
    setEditingService(newService);
    setIsServiceModalOpen(true);
  };

  const handleSaveServiceModal = () => {
    if (!editingService) return;
    const existing = formState.service_quick_links || [];
    const index = existing.findIndex((s) => s.id === editingService.id);

    let updatedList: HomeServiceQuickLink[] = [];
    if (index >= 0) {
      updatedList = existing.map((s) => (s.id === editingService.id ? editingService : s));
    } else {
      updatedList = [...existing, editingService];
    }

    setFormState({ ...formState, service_quick_links: updatedList });
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service link from the hero?')) {
      const updated = (formState.service_quick_links || []).filter((s) => s.id !== id);
      setFormState({ ...formState, service_quick_links: updated });
    }
  };

  const handleToggleServiceVisibility = (id: string) => {
    const updated = (formState.service_quick_links || []).map((s) =>
      s.id === id ? { ...s, is_active: !s.is_active } : s
    );
    setFormState({ ...formState, service_quick_links: updated });
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const list = [...(formState.service_quick_links || [])];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    // Update display orders
    const reordered = list.map((item, idx) => ({ ...item, display_order: idx + 1 }));
    setFormState({ ...formState, service_quick_links: reordered });
  };

  // Badge Handlers
  const handleToggleBadgeVisibility = (id: string) => {
    const updated = (formState.floating_badges || []).map((b) =>
      b.id === id ? { ...b, is_active: !b.is_active } : b
    );
    setFormState({ ...formState, floating_badges: updated });
  };

  const handleSaveBadgeModal = () => {
    if (!editingBadge) return;
    const existing = formState.floating_badges || [];
    const index = existing.findIndex((b) => b.id === editingBadge.id);

    let updatedList: FloatingBadge[] = [];
    if (index >= 0) {
      updatedList = existing.map((b) => (b.id === editingBadge.id ? editingBadge : b));
    } else {
      updatedList = [...existing, editingBadge];
    }

    setFormState({ ...formState, floating_badges: updatedList });
    setIsBadgeModalOpen(false);
    setEditingBadge(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#F07100] text-xs font-black uppercase tracking-wider mb-2">
            <Layout className="w-3.5 h-3.5" />
            <span>Homepage Hero CMS</span>
          </div>
          <h2 className="text-2xl font-black text-[#0A1838]">Homepage Hero & Services Manager</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Customize headings, primary/secondary CTAs, high-res hero images, floating badges, and service quick links.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 disabled:opacity-50"
        >
          {isSaving ? (
            <RotateCcw className="w-4 h-4 animate-spin" />
          ) : saveSuccess ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? 'Saving Changes...' : saveSuccess ? 'Saved Successfully!' : 'Save All Changes'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Homepage Hero section successfully updated and live!</span>
        </div>
      )}

      {/* 1. HERO CONTENT EDITOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-[#0A1838] flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sparkles className="w-5 h-5 text-[#F07100]" />
          <span>1. Hero Headings & Call-to-Action Buttons</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-extrabold uppercase text-slate-700">Hero Eyebrow Text</label>
            <input
              type="text"
              value={formState.eyebrow}
              onChange={(e) => setFormState({ ...formState, eyebrow: e.target.value })}
              placeholder="e.g. GLONTIS VISA CONSULTANCY"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-extrabold uppercase text-slate-700">Main Headline</label>
            <input
              type="text"
              value={formState.heading}
              onChange={(e) => setFormState({ ...formState, heading: e.target.value })}
              placeholder="e.g. Your Journey Abroad Starts Here"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-extrabold uppercase text-slate-700">Supporting Description</label>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              placeholder="Write a compelling overview of Study, Work, Visit, and Tourist Visa services..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black uppercase text-[#0A1838]">Primary CTA Button</h4>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600">Button Text</label>
                <input
                  type="text"
                  value={formState.primary_cta_text}
                  onChange={(e) => setFormState({ ...formState, primary_cta_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600">Button URL</label>
                <input
                  type="text"
                  value={formState.primary_cta_url}
                  onChange={(e) => setFormState({ ...formState, primary_cta_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black uppercase text-[#0A1838]">Secondary CTA Button</h4>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600">Button Text</label>
                <input
                  type="text"
                  value={formState.secondary_cta_text}
                  onChange={(e) => setFormState({ ...formState, secondary_cta_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600">Button URL</label>
                <input
                  type="text"
                  value={formState.secondary_cta_url}
                  onChange={(e) => setFormState({ ...formState, secondary_cta_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO IMAGE MANAGEMENT */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-[#0A1838] flex items-center gap-2 border-b border-slate-100 pb-3">
          <ImageIcon className="w-5 h-5 text-[#F07100]" />
          <span>2. Hero Background / Showcase Image Management</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Desktop Image Uploader */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-[#0A1838]">Desktop Main Image</h4>
            <ImageUploader
              value={formState.hero_image}
              altText={formState.hero_image_alt_text}
              titleText={formState.hero_image_title}
              label="Select or Upload Desktop Hero Banner Image"
              recommendedDimensions="1600 × 1200 px"
              onChange={(url, alt, title) =>
                setFormState({
                  ...formState,
                  hero_image: url,
                  hero_image_alt_text: alt,
                  hero_image_title: title,
                })
              }
            />
          </div>

          {/* Mobile Image Uploader */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-[#0A1838]">Mobile Hero Image (Optional)</h4>
            <ImageUploader
              value={formState.mobile_hero_image || ''}
              altText={formState.mobile_hero_image_alt_text || ''}
              label="Select or Upload Mobile Hero Banner Image"
              recommendedDimensions="800 × 1000 px"
              onChange={(url, alt) =>
                setFormState({
                  ...formState,
                  mobile_hero_image: url,
                  mobile_hero_image_alt_text: alt,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* 3. FLOATING BADGES MANAGEMENT */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-black text-[#0A1838] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F07100]" />
            <span>3. Floating Badge Overlays (Around Hero Image)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(formState.floating_badges || []).map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all ${
                badge.is_active
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#0A1838]">{badge.title}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleBadgeVisibility(badge.id)}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-600"
                    title={badge.is_active ? 'Hide Badge' : 'Show Badge'}
                  >
                    {badge.is_active ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setEditingBadge(badge);
                      setIsBadgeModalOpen(true);
                    }}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-600"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{badge.subtitle || 'No subtitle'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SERVICE QUICK LINKS MANAGER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-[#0A1838] flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#F07100]" />
              <span>4. Service Quick Links Bar (Below Hero)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add, edit, reorder, show/hide primary visa and overseas service cards.
            </p>
          </div>

          <button
            onClick={handleOpenAddService}
            className="px-4 py-2.5 rounded-xl bg-[#0A1838] hover:bg-[#152a5a] text-white font-extrabold text-xs flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4 text-[#F07100]" />
            <span>Add New Service Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {(formState.service_quick_links || []).map((service, index) => (
            <div
              key={service.id}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                service.is_active ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#0A1838] font-black text-xs flex items-center justify-center shrink-0">
                  #{index + 1}
                </span>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#0A1838]">{service.title}</span>
                    {service.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-orange-50 text-[#F07100] text-[10px] font-black uppercase">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                    <span className="text-emerald-700 font-bold">{service.url}</span>
                    <span>• Icon: {service.icon_name}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {/* Reorder Buttons */}
                <button
                  onClick={() => handleMoveService(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMoveService(index, 'down')}
                  disabled={index === (formState.service_quick_links?.length || 0) - 1}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Visibility */}
                <button
                  onClick={() => handleToggleServiceVisibility(service.id)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700"
                  title={service.is_active ? 'Hide Service' : 'Show Service'}
                >
                  {service.is_active ? (
                    <Eye className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {/* Edit */}
                <button
                  onClick={() => {
                    setEditingService(service);
                    setIsServiceModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-blue-600"
                  title="Edit Service"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT SERVICE MODAL */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#0A1838]">
                {editingService.id ? 'Edit Hero Service Quick Link' : 'Add New Hero Service'}
              </h3>
              <button
                onClick={() => {
                  setIsServiceModalOpen(false);
                  setEditingService(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Service Name / Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Study Visa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Badge Tag (Optional)</label>
                <input
                  type="text"
                  value={editingService.badge || ''}
                  onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                  placeholder="e.g. Popular, Hot Permits, 100% Grants"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Target Page Link / URL</label>
                <input
                  type="text"
                  value={editingService.url}
                  onChange={(e) => setEditingService({ ...editingService, url: e.target.value })}
                  placeholder="e.g. /study-visa, /work-visa, /visit-visa, /tourist-visa"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700 mb-1.5 block">Select Service Icon</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableIcons.map((ico) => (
                    <button
                      key={ico.name}
                      type="button"
                      onClick={() => setEditingService({ ...editingService, icon_name: ico.name })}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        editingService.icon_name === ico.name
                          ? 'bg-[#0A1838] text-white border-[#0A1838] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[#F07100]">{ico.name}</span>
                      <span className="truncate">{ico.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Short Description</label>
                <textarea
                  rows={2}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="e.g. UK, Australia, USA & EU University Admissions"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsServiceModalOpen(false);
                  setEditingService(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveServiceModal}
                className="px-5 py-2.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs shadow-md"
              >
                Save Service Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BADGE MODAL */}
      {isBadgeModalOpen && editingBadge && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#0A1838]">Edit Floating Badge Overlay</h3>
              <button
                onClick={() => {
                  setIsBadgeModalOpen(false);
                  setEditingBadge(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Badge Title</label>
                <input
                  type="text"
                  value={editingBadge.title}
                  onChange={(e) => setEditingBadge({ ...editingBadge, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Badge Subtitle</label>
                <input
                  type="text"
                  value={editingBadge.subtitle || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700 mb-1 block">Badge Icon</label>
                <select
                  value={editingBadge.icon_name || 'GraduationCap'}
                  onChange={(e) => setEditingBadge({ ...editingBadge, icon_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                >
                  {availableIcons.map((ico) => (
                    <option key={ico.name} value={ico.name}>
                      {ico.name} ({ico.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsBadgeModalOpen(false);
                  setEditingBadge(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveBadgeModal}
                className="px-5 py-2 rounded-xl bg-[#F07100] text-white font-extrabold text-xs shadow-md"
              >
                Save Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
