'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  Layout,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Edit2,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  Layers,
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { HomepageSectionConfig, HeroSlide, HeroSliderSettings } from '@/lib/types';
import { defaultHomepageSections } from '@/lib/data-store';

export default function HomepageSectionsCmsTab() {
  const {
    homepageSections,
    setHomepageSections,
    heroSlides,
    setHeroSlides,
    homepageHero,
    setHomepageHero,
    updateData,
  } = useData();

  // Local state for Homepage Sections
  const [sections, setSections] = useState<HomepageSectionConfig[]>(
    homepageSections && homepageSections.length > 0 ? homepageSections : defaultHomepageSections
  );

  // Local state for Hero Slides
  const [slides, setSlides] = useState<HeroSlide[]>(heroSlides || []);

  // Local state for Slider Settings
  const [sliderSettings, setSliderSettings] = useState<HeroSliderSettings>(
    homepageHero?.slider_settings || {
      animation_type: 'fade',
      autoplay: true,
      autoplay_duration_ms: 5000,
      transition_speed_ms: 700,
      pause_on_hover: true,
      show_navigation_arrows: true,
      show_pagination_dots: true,
    }
  );

  const [activeSubTab, setActiveSubTab] = useState<'sections' | 'slides' | 'animation'>('sections');
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotify, setSaveNotify] = useState('');

  // Editing state for section details
  const [editingSection, setEditingSection] = useState<HomepageSectionConfig | null>(null);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);

  // Editing state for Hero Slide
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  // Section Handlers
  const handleToggleSection = (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, is_enabled: !s.is_enabled } : s));
    setSections(updated);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const list = [...sections];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }

    const reordered = list.map((sec, idx) => ({ ...sec, display_order: idx + 1 }));
    setSections(reordered);
  };

  const handleSaveSections = async () => {
    setIsSaving(true);
    setHomepageSections(sections);
    const ok = await updateData('UPDATE_ENTITY', 'homepageSections', sections);
    setIsSaving(false);
    if (ok) {
      setSaveNotify('Homepage section order & visibility saved successfully!');
      setTimeout(() => setSaveNotify(''), 3500);
    }
  };

  // Hero Slide Handlers
  const handleOpenAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,
      title: 'New Visa Counseling & Overseas Slide',
      subheading: 'Expert guidance for study visa, work visa, visit visa and tourist visa applications in Multan.',
      badge: '✨ Glontis Visa Consultation',
      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      primary_cta_text: 'Book Free Consultation',
      primary_cta_link: '/free-consultation',
      secondary_cta_text: 'Explore Services',
      secondary_cta_link: '/services',
      display_order: slides.length + 1,
      is_active: true,
    };
    setEditingSlide(newSlide);
    setIsSlideModalOpen(true);
  };

  const handleSaveSlideModal = () => {
    if (!editingSlide) return;
    const index = slides.findIndex((s) => s.id === editingSlide.id);
    let updated: HeroSlide[] = [];
    if (index >= 0) {
      updated = slides.map((s) => (s.id === editingSlide.id ? editingSlide : s));
    } else {
      updated = [...slides, editingSlide];
    }

    setSlides(updated);
    setIsSlideModalOpen(false);
    setEditingSlide(null);
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm('Are you sure you want to delete this hero slide?')) {
      const updated = slides.filter((s) => s.id !== id);
      setSlides(updated);
    }
  };

  const handleToggleSlide = (id: string) => {
    const updated = slides.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s));
    setSlides(updated);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const list = [...slides];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }

    const reordered = list.map((item, idx) => ({ ...item, display_order: idx + 1 }));
    setSlides(reordered);
  };

  const handleSaveSlidesAndAnimation = async () => {
    setIsSaving(true);
    setHeroSlides(slides);
    const updatedHero = { ...homepageHero, slider_settings: sliderSettings };
    setHomepageHero(updatedHero);

    const ok1 = await updateData('UPDATE_ENTITY', 'heroSlides', slides);
    const ok2 = await updateData('UPDATE_ENTITY', 'homepageHero', updatedHero);

    setIsSaving(false);
    if (ok1 && ok2) {
      setSaveNotify('Hero slides & animation configuration saved successfully!');
      setTimeout(() => setSaveNotify(''), 3500);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#F07100] text-xs font-black uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete CMS Section Manager</span>
          </div>
          <h2 className="text-2xl font-black text-[#0A1838]">Homepage Sections & Hero Slider Control</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Enable/Disable, reorder homepage sections, manage multi-banner hero slides, and configure slider animations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (activeSubTab === 'sections') {
                void handleSaveSections();
              } else {
                void handleSaveSlidesAndAnimation();
              }
            }}
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 disabled:opacity-50"
          >
            {isSaving ? (
              <RotateCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving Changes...' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>

      {saveNotify && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{saveNotify}</span>
        </div>
      )}

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-2xl">
        <button
          onClick={() => setActiveSubTab('sections')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'sections'
              ? 'bg-[#0A1838] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Layout className="w-4 h-4 text-[#F07100]" />
          <span>Homepage Sections Order & Visibility</span>
        </button>

        <button
          onClick={() => setActiveSubTab('slides')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'slides'
              ? 'bg-[#0A1838] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#F07100]" />
          <span>Hero Slides Manager ({slides.filter((s) => s.is_active).length} Active)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('animation')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'animation'
              ? 'bg-[#0A1838] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Sliders className="w-4 h-4 text-[#F07100]" />
          <span>Slider Animation Settings</span>
        </button>
      </div>

      {/* SUB TAB 1: HOMEPAGE SECTIONS MANAGER */}
      {activeSubTab === 'sections' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#0A1838]">1. Homepage Section Order & Visibility</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Toggle sections ON or OFF. Disabled sections will immediately be hidden from the public website.
              </p>
            </div>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              {sections.filter((s) => s.is_enabled).length} of {sections.length} Sections Active
            </span>
          </div>

          <div className="space-y-3">
            {sections.map((sec, index) => (
              <div
                key={sec.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  sec.is_enabled
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-slate-50/80 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-[#0A1838]">{sec.title}</h4>
                      {sec.is_enabled ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase">
                          VISIBLE ON HOMEPAGE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase">
                          HIDDEN
                        </span>
                      )}
                    </div>
                    {sec.description && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{sec.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  {/* Reorder Buttons */}
                  <button
                    onClick={() => handleMoveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Button */}
                  <button
                    onClick={() => handleToggleSection(sec.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      sec.is_enabled
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                  >
                    {sec.is_enabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Enabled (ON)</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Disabled (OFF)</span>
                      </>
                    )}
                  </button>

                  {/* Edit Title/Description */}
                  <button
                    onClick={() => {
                      setEditingSection(sec);
                      setIsSectionModalOpen(true);
                    }}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-blue-600"
                    title="Edit Section Details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: HERO SLIDES MANAGER */}
      {activeSubTab === 'slides' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#0A1838]">2. Multi-Banner Hero Slides Manager</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Add, edit, reorder, or toggle active status of slides in the animated Hero slider.
              </p>
            </div>

            <button
              onClick={handleOpenAddSlide}
              className="px-4 py-2.5 rounded-xl bg-[#0A1838] hover:bg-[#152a5a] text-white font-extrabold text-xs flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4 text-[#F07100]" />
              <span>Add New Hero Slide</span>
            </button>
          </div>

          {slides.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-extrabold text-slate-700">No Hero Slides Added Yet</p>
              <p className="text-xs text-slate-500 mt-1">Click "Add New Hero Slide" to create multi-banner slides.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                    slide.is_active ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Slide Thumbnail */}
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.image_url}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-slate-950/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#0A1838]">{slide.title}</h4>
                        {slide.is_active ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                            Active Slide
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-black uppercase">
                            Inactive
                          </span>
                        )}
                      </div>
                      {slide.subheading && (
                        <p className="text-xs text-slate-500 line-clamp-1 font-medium">{slide.subheading}</p>
                      )}
                      {slide.badge && (
                        <span className="inline-block text-[10px] font-bold text-[#F07100]">
                          {slide.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleMoveSlide(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveSlide(index, 'down')}
                      disabled={index === slides.length - 1}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleToggleSlide(slide.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700"
                      title={slide.is_active ? 'Hide Slide' : 'Show Slide'}
                    >
                      {slide.is_active ? (
                        <Eye className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setEditingSlide(slide);
                        setIsSlideModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-blue-600"
                      title="Edit Slide"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB TAB 3: SLIDER ANIMATION SETTINGS */}
      {activeSubTab === 'animation' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-[#0A1838]">3. Hero Slider Animation & Controls Configuration</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Configure transition animation types, autoplay timer intervals, pause-on-hover, and visual controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 mb-1.5 block">
                Transition Animation Type
              </label>
              <select
                value={sliderSettings.animation_type}
                onChange={(e) =>
                  setSliderSettings({
                    ...sliderSettings,
                    animation_type: e.target.value as HeroSliderSettings['animation_type'],
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              >
                <option value="fade">Fade Transition (Smooth & Professional)</option>
                <option value="slide">Horizontal Slide (Dynamic Sweep)</option>
                <option value="zoom">Zoom / Scale (Luxurious Depth)</option>
                <option value="crossfade">Crossfade Blend (Soft Dissolve)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 mb-1.5 block">
                Autoplay Duration (Milliseconds)
              </label>
              <select
                value={sliderSettings.autoplay_duration_ms}
                onChange={(e) =>
                  setSliderSettings({
                    ...sliderSettings,
                    autoplay_duration_ms: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
              >
                <option value={3000}>3 Seconds (Fast)</option>
                <option value={5000}>5 Seconds (Recommended Standard)</option>
                <option value={7000}>7 Seconds (Relaxed)</option>
                <option value={10000}>10 Seconds (Slow Reading)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-[#0A1838]">Autoplay Banner Slides</h4>
                <p className="text-[11px] text-slate-500 font-medium">Automatically rotate slides after timer duration.</p>
              </div>
              <input
                type="checkbox"
                checked={sliderSettings.autoplay}
                onChange={(e) => setSliderSettings({ ...sliderSettings, autoplay: e.target.checked })}
                className="w-5 h-5 accent-[#F07100] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-[#0A1838]">Pause Autoplay on Mouse Hover</h4>
                <p className="text-[11px] text-slate-500 font-medium">Pauses slider timer when user hovers mouse over banner.</p>
              </div>
              <input
                type="checkbox"
                checked={sliderSettings.pause_on_hover}
                onChange={(e) => setSliderSettings({ ...sliderSettings, pause_on_hover: e.target.checked })}
                className="w-5 h-5 accent-[#F07100] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-[#0A1838]">Show Navigation Arrows</h4>
                <p className="text-[11px] text-slate-500 font-medium">Display Previous and Next chevron arrow buttons.</p>
              </div>
              <input
                type="checkbox"
                checked={sliderSettings.show_navigation_arrows}
                onChange={(e) => setSliderSettings({ ...sliderSettings, show_navigation_arrows: e.target.checked })}
                className="w-5 h-5 accent-[#F07100] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-[#0A1838]">Show Pagination Dots</h4>
                <p className="text-[11px] text-slate-500 font-medium">Display indicator dots bar at the bottom of the hero.</p>
              </div>
              <input
                type="checkbox"
                checked={sliderSettings.show_pagination_dots}
                onChange={(e) => setSliderSettings({ ...sliderSettings, show_pagination_dots: e.target.checked })}
                className="w-5 h-5 accent-[#F07100] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* EDIT SECTION DETAILS MODAL */}
      {isSectionModalOpen && editingSection && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#0A1838]">Edit Section Title & Description</h3>
              <button
                onClick={() => {
                  setIsSectionModalOpen(false);
                  setEditingSection(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Section Label / Title</label>
                <input
                  type="text"
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Description / Subtitle</label>
                <textarea
                  rows={3}
                  value={editingSection.description || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsSectionModalOpen(false);
                  setEditingSection(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = sections.map((s) => (s.id === editingSection.id ? editingSection : s));
                  setSections(updated);
                  setIsSectionModalOpen(false);
                  setEditingSection(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#F07100] text-white font-extrabold text-xs shadow-md"
              >
                Save Section Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT HERO SLIDE MODAL */}
      {isSlideModalOpen && editingSlide && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#0A1838]">
                {editingSlide.id ? 'Edit Hero Banner Slide' : 'Add New Hero Slide'}
              </h3>
              <button
                onClick={() => {
                  setIsSlideModalOpen(false);
                  setEditingSlide(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Slide Headline / Title</label>
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  placeholder="e.g. Study in UK, Australia, Canada & USA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Badge Text (Eyebrow)</label>
                <input
                  type="text"
                  value={editingSlide.badge || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                  placeholder="e.g. 🎓 Multan's Premier Visa Consultancy"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700">Subheading / Description</label>
                <textarea
                  rows={3}
                  value={editingSlide.subheading || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subheading: e.target.value })}
                  placeholder="Detailed counseling overview..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700 mb-1 block">Hero Banner Image</label>
                <ImageUploader
                  value={editingSlide.image_url}
                  altText={editingSlide.image_alt_text || ''}
                  label="Select or Upload Hero Slide Image"
                  recommendedDimensions="1600 × 1200 px"
                  onChange={(url, alt) =>
                    setEditingSlide({ ...editingSlide, image_url: url, image_alt_text: alt })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-700">Primary CTA Text</label>
                  <input
                    type="text"
                    value={editingSlide.primary_cta_text || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primary_cta_text: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-700">Primary CTA Link</label>
                  <input
                    type="text"
                    value={editingSlide.primary_cta_link || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primary_cta_link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsSlideModalOpen(false);
                  setEditingSlide(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSlideModal}
                className="px-5 py-2 rounded-xl bg-[#F07100] text-white font-extrabold text-xs shadow-md"
              >
                Save Slide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
