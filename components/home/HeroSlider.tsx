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
      {/* 1. MAIN HERO SECTION — WORDPRESS-STYLE PREMIUM IMMIGRATION THEME LAYOUT */}
      {/* ========================================================================= */}
      <section
        id="hero-slider"
        className="relative w-full bg-[#0A1838] text-white overflow-hidden py-8 sm:py-10 lg:py-14 border-b border-slate-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Background Pattern & Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-36 -left-36 w-[500px] h-[500px] bg-[#F07100]/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[160px]" />
          <div
            className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
            }}
          />
        </div>

        {/* Navigation Arrow Controls (Desktop Sleek Hover Arrows) */}
        {totalSlides > 1 && sliderSettings.show_navigation_arrows && (
          <div className="hidden xl:block">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-[#F07100] border border-slate-700/80 hover:border-[#F07100] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 z-30 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-[#F07100] border border-slate-700/80 hover:border-[#F07100] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 z-30 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Main Hero Grid Container */}
        <div className="relative z-20 w-[92%] max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* ======================================================= */}
            {/* LEFT COLUMN: HERO CONTENT & IMMIGRATION CALLS-TO-ACTION */}
            {/* ======================================================= */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Brand Eyebrow & Service Slide Category Pill */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F07100]/15 border border-[#F07100]/40 text-[#F07100] text-[11px] font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {eyebrow}
                </span>

                <span
                  key={`badge-${currentSlideIndex}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-bold transition-all duration-300"
                >
                  {slideBadge}
                </span>
              </div>

              {/* Headline Title */}
              <h1
                key={`title-${currentSlideIndex}`}
                className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] xl:text-[52px] font-black text-white tracking-tight leading-[1.12] drop-shadow-sm transition-all duration-500"
              >
                {slideTitle}
              </h1>

              {/* Subheading / Description */}
              <p
                key={`desc-${currentSlideIndex}`}
                className="text-slate-300 text-sm sm:text-base lg:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal transition-all duration-500"
              >
                {slideSubheading}
              </p>

              {/* Country Destination Selector Box */}
              {countries?.length > 0 && (
                <div className="pt-1 max-w-xl mx-auto lg:mx-0 space-y-1.5">
                  <div className="p-1.5 sm:p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-lg flex flex-col sm:flex-row items-center gap-2">
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
                    <p className="text-xs font-bold text-amber-400 flex items-center justify-center lg:justify-start gap-1.5 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Please select a target country from the dropdown above.</span>
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons Row */}
              <div
                key={`cta-${currentSlideIndex}`}
                className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                <Link
                  href={primaryCtaUrl}
                  className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-950/40 hover:shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-95"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={secondaryCtaUrl}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 font-bold text-sm flex items-center gap-2 transition-all hover:border-slate-500"
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

              {/* Trust Indicators Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-300 font-semibold border-t border-slate-800/80">
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
            </div>

            {/* ================================================================= */}
            {/* RIGHT COLUMN: SINGLE CLEAN, CRISP PROFESSIONAL HERO IMAGE */}
            {/* (NO excessive floating cards covering or cluttering the image) */}
            {/* ================================================================= */}
            <div className="lg:col-span-5 relative flex flex-col justify-center items-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={heroImage}
                  src={heroImage}
                  alt={heroImageAlt}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Subtle, Natural Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top-Right Slide Number Indicator */}
                <div className="absolute top-4 right-4 bg-[#0A1838]/85 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-black text-white flex items-center gap-1.5 shadow-md">
                  <span className="text-[#F07100]">0{currentSlideIndex + 1}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">0{totalSlides}</span>
                </div>

                {/* Single Bottom Status Banner (Clean, Professional Theme Style) */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A1838]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/90 text-white flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#F07100]/20 border border-[#F07100]/40 flex items-center justify-center text-[#F07100] shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white">Glontis Multan Office</div>
                      <div className="text-[10px] text-slate-400 font-medium">Chaze Up Plaza, Bosan Road</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-full shrink-0">
                    Open Mon - Sat
                  </span>
                </div>
              </div>

              {/* Slider Dots & Autoplay Toggle Controls */}
              {totalSlides > 1 && sliderSettings.show_pagination_dots && (
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-[#F07100] text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentSlideIndex % totalSlides
                            ? 'w-8 bg-[#F07100] shadow-sm'
                            : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
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

