'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import {
  GraduationCap,
  Briefcase,
  Users,
  Compass,
  Building2,
  Globe,
  Award,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Plane,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Play,
  Pause,
  MapPin,
  Clock,
} from 'lucide-react';

export default function HeroSlider() {
  const { homepageHero, heroSlides, settings, countries } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Slider settings with defaults
  const sliderSettings = homepageHero?.slider_settings || {
    animation_type: 'crossfade',
    autoplay: true,
    autoplay_duration_ms: 5000,
    transition_speed_ms: 800,
    pause_on_hover: true,
    show_navigation_arrows: true,
    show_pagination_dots: true,
  };

  // Default 4 Professional Service-Focused Slides
  const fallbackSlides = [
    {
      id: 'slide-1',
      badge: '🎓 Study Visa Services',
      title: 'Turn Your Education Goals Into Global Opportunities',
      subheading:
        'Gain admission into top-ranked universities in UK, Australia, Canada, USA & Europe with comprehensive guidance on scholarships, admissions, and student visas.',
      primary_cta_text: 'Book Free Consultation',
      primary_cta_link: '/free-consultation',
      secondary_cta_text: 'Explore Study Visa',
      secondary_cta_link: '/study-visa',
      image_url:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'Study Abroad International Students',
      image_title: 'Study Visa Counseling',
      is_active: true,
      display_order: 1,
    },
    {
      id: 'slide-2',
      badge: '💼 Work Visa Guidance',
      title: 'Build Your Career Beyond Borders',
      subheading:
        'Explore skilled worker permits, job seeker visas, and professional immigration pathways in leading global economies with end-to-end file preparation.',
      primary_cta_text: 'Check Work Eligibility',
      primary_cta_link: '/work-visa',
      secondary_cta_text: 'Explore Work Visa',
      secondary_cta_link: '/work-visa',
      image_url:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'Working Abroad International Career',
      image_title: 'Work Visa Assessment',
      is_active: true,
      display_order: 2,
    },
    {
      id: 'slide-3',
      badge: '✈️ Visit Visa Advisory',
      title: 'Visit Family & Travel With Complete Peace of Mind',
      subheading:
        'Thorough visit visa sponsorship file compilation, sponsor invitation verification, cover letters, and financial ties documentation for UK, USA, Canada & Schengen.',
      primary_cta_text: 'Apply For Visit Visa',
      primary_cta_link: '/visit-visa',
      secondary_cta_text: 'Explore Visit Visa',
      secondary_cta_link: '/visit-visa',
      image_url:
        'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'International Travel and Family Visits',
      image_title: 'Visit Visa Processing',
      is_active: true,
      display_order: 3,
    },
    {
      id: 'slide-4',
      badge: '🌍 Tourist & Holiday Visa',
      title: 'Discover Iconic Destinations Worldwide',
      subheading:
        'Fast and transparent tourist visa processing for individuals and families. Get assistance with flight reservations, hotel bookings, and embassy appointments.',
      primary_cta_text: 'Explore Tourist Visa',
      primary_cta_link: '/tourist-visa',
      secondary_cta_text: 'Holiday Destinations',
      secondary_cta_link: '/tourist-visa',
      image_url:
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'Global Travel and Tourism Destinations',
      image_title: 'Tourist Visa Guidance',
      is_active: true,
      display_order: 4,
    },
  ];

  // Active slides list from CMS or fallback
  const configuredActiveSlides = (heroSlides || [])
    .filter((s) => s.is_active)
    .sort((a, b) => a.display_order - b.display_order);
  const activeSlides = configuredActiveSlides.length > 0 ? configuredActiveSlides : fallbackSlides;
  const totalSlides = activeSlides.length;

  const currentSlide = activeSlides[currentSlideIndex % totalSlides] || activeSlides[0];

  // Dynamic values
  const eyebrow = homepageHero?.eyebrow || 'GLONTIS VISA CONSULTANCY';
  const slideBadge = currentSlide?.badge || '🎓 Study Visa Services';
  const slideTitle = currentSlide?.title || 'Turn Your Education Goals Into Global Opportunities';
  const slideSubheading =
    currentSlide?.subheading ||
    'Gain admission into top-ranked universities in UK, Australia, Canada, USA & Europe with full guidance on scholarships and student visas.';
  const primaryCtaText = currentSlide?.primary_cta_text || 'Book Free Consultation';
  const primaryCtaUrl = currentSlide?.primary_cta_link || '/free-consultation';
  const secondaryCtaText = currentSlide?.secondary_cta_text || 'Explore Study Visa';
  const secondaryCtaUrl = currentSlide?.secondary_cta_link || '/study-visa';
  const heroImage =
    currentSlide?.image_url ||
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80';
  const heroImageAlt = currentSlide?.image_alt_text || 'Glontis Visa Consultancy';

  // Quick Service Links
  const activeServices = (homepageHero?.service_quick_links || [])
    .filter((s) => s.is_active)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  // Autoplay Effect
  useEffect(() => {
    if (!sliderSettings.autoplay || !isPlaying || totalSlides <= 1) return;
    if (sliderSettings.pause_on_hover && isHovered) return;

    const intervalTime = sliderSettings.autoplay_duration_ms || 5500;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [
    sliderSettings.autoplay,
    sliderSettings.autoplay_duration_ms,
    sliderSettings.pause_on_hover,
    isHovered,
    isPlaying,
    totalSlides,
  ]);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const renderIcon = (iconName?: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Plane':
        return <Plane className={className} />;
      default:
        return <Globe className={className} />;
    }
  };

  const whatsappNumber = settings?.whatsapp || '03334530456';
  const cleanWhatsapp = whatsappNumber.replace(/^0/, '').replace(/\s+/g, '');

  const handleExploreCountryClick = (e: React.MouseEvent) => {
    if (!selectedCountry) {
      e.preventDefault();
      setCountryError(true);
      setTimeout(() => setCountryError(false), 4000);
    }
  };

  // Global Migration Routes Bar
  const routeDestinations = [
    { from: 'Pakistan', to: 'United Kingdom', flag: '🇬🇧' },
    { from: 'Pakistan', to: 'Australia', flag: '🇦🇺' },
    { from: 'Pakistan', to: 'Canada', flag: '🇨🇦' },
    { from: 'Pakistan', to: 'USA', flag: '🇺🇸' },
    { from: 'Pakistan', to: 'Europe / Schengen', flag: '🇪🇺' },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MAIN HERO SECTION — FULL-WIDTH BACKGROUND WITH LEFT GRADIENT OVERLAY */}
      {/* ========================================================================= */}
      <section
        id="hero-slider"
        className="relative w-full text-white overflow-hidden min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-center border-b border-slate-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* =================================================================== */}
        {/* FULL-WIDTH BACKGROUND IMAGES WITH SMOOTH SLIDE / FADE TRANSITION   */}
        {/* =================================================================== */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#0A1838]">
          {activeSlides.map((slide, idx) => {
            const isCurrent = idx === currentSlideIndex % totalSlides;
            return (
              <div
                key={slide.id || idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isCurrent ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image_url}
                  alt={slide.image_alt_text || slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}

          {/* ================================================================= */}
          {/* LEFT-SIDE DARK NAVY GRADIENT OVERLAY FOR CRISP TEXT READABILITY    */}
          {/* (Strong dark on left, smooth transition, 100% clear on the right)  */}
          {/* ================================================================= */}
          
          {/* Desktop/Tablet Horizontal Gradient */}
          <div
            className="hidden sm:block absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(10, 24, 56, 0.96) 0%, rgba(10, 24, 56, 0.92) 32%, rgba(10, 24, 56, 0.65) 55%, rgba(10, 24, 56, 0.20) 75%, rgba(10, 24, 56, 0.0) 100%)',
            }}
          />

          {/* Mobile Vertical + Horizontal Gradient to ensure text legibility on small screens */}
          <div
            className="sm:hidden absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10, 24, 56, 0.96) 0%, rgba(10, 24, 56, 0.90) 65%, rgba(10, 24, 56, 0.45) 85%, rgba(10, 24, 56, 0.15) 100%)',
            }}
          />

          {/* Subtle Glontis Orange Glow Accent on Top-Left */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#F07100]/15 rounded-full blur-[100px] pointer-events-none z-10" />
        </div>

        {/* =================================================================== */}
        {/* SLIDER NAVIGATION CONTROLS (Desktop Previous / Next Arrows)         */}
        {/* =================================================================== */}
        {totalSlides > 1 && sliderSettings.show_navigation_arrows && (
          <div className="hidden lg:block z-30 pointer-events-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A1838]/80 hover:bg-[#F07100] border border-slate-700/80 hover:border-[#F07100] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A1838]/80 hover:bg-[#F07100] border border-slate-700/80 hover:border-[#F07100] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* =================================================================== */}
        {/* MAIN HERO CONTENT (Left-Aligned Clean Layout)                       */}
        {/* =================================================================== */}
        <div className="relative z-20 w-[92%] max-w-[1360px] mx-auto py-10 sm:py-14 lg:py-16">
          <div className="max-w-2xl lg:max-w-[720px] space-y-5 text-left">
            
            {/* Brand Eyebrow & Active Service Slide Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F07100]/20 border border-[#F07100]/40 text-[#F07100] text-[11px] font-black uppercase tracking-wider backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                {eyebrow}
              </span>

              <span
                key={`badge-${currentSlideIndex}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-bold shadow-md transition-all duration-300 backdrop-blur-md"
              >
                {slideBadge}
              </span>
            </div>

            {/* Headline Title */}
            <h1
              key={`title-${currentSlideIndex}`}
              className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] xl:text-[54px] font-black text-white tracking-tight leading-[1.12] drop-shadow-md transition-all duration-500"
            >
              {slideTitle}
            </h1>

            {/* Subheading / Description */}
            <p
              key={`desc-${currentSlideIndex}`}
              className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-sm transition-all duration-500"
            >
              {slideSubheading}
            </p>

            {/* Target Destination Dropdown Box */}
            {countries?.length > 0 && (
              <div className="pt-1 max-w-xl space-y-1.5">
                <div className="p-1.5 sm:p-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-700/80 shadow-xl flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full sm:flex-1 relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        if (e.target.value) setCountryError(false);
                      }}
                      className="w-full bg-[#0A1838] text-white text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-700/90 focus:outline-none focus:ring-2 focus:ring-[#F07100] font-semibold cursor-pointer"
                    >
                      <option value="">Select Target Country Destination...</option>
                      {countries
                        .filter((c) => c.is_published)
                        .map((c) => (
                          <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                            {c.flag_emoji} {c.name} (Admissions & Visa)
                          </option>
                        ))}
                    </select>
                  </div>

                  <Link
                    href={selectedCountry ? `/${selectedCountry}` : '#'}
                    onClick={handleExploreCountryClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md active:scale-95"
                  >
                    <span>Explore Info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {countryError && (
                  <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5 animate-in fade-in bg-amber-950/60 border border-amber-800/80 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Please select a target country destination from the list.</span>
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons Row */}
            <div
              key={`cta-${currentSlideIndex}`}
              className="pt-1 flex flex-wrap items-center gap-3"
            >
              <Link
                href={primaryCtaUrl}
                className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-950/50 hover:shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-95"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={secondaryCtaUrl}
                className="px-5 py-3.5 rounded-xl bg-[#0A1838]/85 hover:bg-[#0A1838] text-white border border-slate-600/80 font-bold text-sm flex items-center gap-2 transition-all hover:border-slate-400 backdrop-blur-md"
              >
                <span>{secondaryCtaText}</span>
              </Link>

              <a
                href={`https://wa.me/92${cleanWhatsapp}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20want%20information%20about%20Visa%20Guidance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:scale-[1.01] active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Indicators Row */}
            <div className="pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300 font-semibold border-t border-slate-700/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>98% Visa Success Rate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Assessment Fee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multan Office Advisory</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Process</span>
              </span>
            </div>

            {/* Slider Dots & Autoplay Toggle Controls (Positioned cleanly under content) */}
            {totalSlides > 1 && sliderSettings.show_pagination_dots && (
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full bg-[#0A1838]/80 border border-slate-700/80 hover:border-[#F07100] text-slate-300 hover:text-white transition-colors cursor-pointer backdrop-blur-sm"
                  title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
                  aria-label={isPlaying ? 'Pause Slider' : 'Play Slider'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-2">
                  {activeSlides.map((slide, idx) => (
                    <button
                      key={slide.id || idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlideIndex % totalSlides
                          ? 'w-9 bg-[#F07100] shadow-sm'
                          : 'w-2.5 bg-slate-600/80 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-bold text-slate-400 ml-1">
                  0{currentSlideIndex + 1} / 0{totalSlides}
                </span>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GLOBAL ROUTES & QUICK SERVICE SHORTCUTS (Professional Theme Section) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#F8FAFC] py-6 sm:py-8 border-b border-slate-200/80">
        <div className="w-[92%] max-w-[1360px] mx-auto space-y-6">
          
          {/* Global Migration Routes Bar */}
          <div className="bg-white border border-slate-200/90 shadow-sm p-3.5 sm:p-4 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F07100] animate-pulse" />
                <span className="text-[11px] uppercase font-black tracking-widest text-[#F07100]">
                  Global Visa Destinations
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {routeDestinations.map((route, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold hover:border-[#F07100] hover:bg-orange-50 hover:text-[#F07100] transition-all"
                  >
                    <span>{route.flag}</span>
                    <span>{route.from}</span>
                    <span className="text-[#F07100] font-black">➔</span>
                    <span>{route.to}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Services Directory */}
          {activeServices.length > 0 && (
            <div className="pt-1">
              <div className="mb-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#F07100]">
                    Core Categories
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-900">
                    Our Premier Visa & Overseas Advisory
                  </h3>
                </div>
                <Link
                  href="/services"
                  className="text-xs font-bold text-[#F07100] hover:underline flex items-center gap-1"
                >
                  <span>View All Services</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {activeServices.map((service) => (
                  <Link
                    key={service.id}
                    href={service.url || '/services'}
                    className="bg-white hover:bg-slate-900 border border-slate-200/90 hover:border-slate-800 p-3.5 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 group-hover:bg-white/10 text-[#F07100] group-hover:text-orange-400 flex items-center justify-center transition-colors">
                          {renderIcon(service.icon_name, 'w-4 h-4')}
                        </div>
                        {service.badge && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 group-hover:bg-white/20 text-[#F07100] group-hover:text-white">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-white leading-tight">
                          {service.title}
                        </h4>
                        {service.description && (
                          <p className="text-[11px] text-slate-500 group-hover:text-slate-300 line-clamp-2 mt-1 font-medium leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 mt-2.5 border-t border-slate-100 group-hover:border-slate-800 flex items-center justify-between text-[11px] font-extrabold text-[#F07100] group-hover:text-orange-400">
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

