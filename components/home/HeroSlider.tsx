'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Plane,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  MapPin,
  Play,
  Pause,
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

  // Default 4 Cinematic Slides fallback
  const fallbackSlides = [
    {
      id: 'slide-1',
      badge: '🎓 Study Visa Services',
      title: 'Turn Your Education Goals Into Global Opportunities',
      subheading: 'Gain admission into top-ranked universities in UK, Australia, Canada, USA & Europe with full guidance on scholarships and student visas.',
      primary_cta_text: 'Book Free Consultation',
      primary_cta_link: '/free-consultation',
      secondary_cta_text: 'Explore Study Visas',
      secondary_cta_link: '/study-visa',
      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'Study Abroad International Students',
      is_active: true,
      display_order: 1,
    },
    {
      id: 'slide-2',
      badge: '💼 Work Visa Guidance',
      title: 'Build Your Career Beyond Borders',
      subheading: 'Explore job permit options, skilled work visas, and professional migration pathways in leading global economic centers.',
      primary_cta_text: 'Check Work Eligibility',
      primary_cta_link: '/work-visa',
      secondary_cta_text: 'Explore Services',
      secondary_cta_link: '/services',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'Working Abroad International Career',
      is_active: true,
      display_order: 2,
    },
    {
      id: 'slide-3',
      badge: '✈️ Visit & Tourist Visa',
      title: 'Explore The World With Confidence',
      subheading: 'Seamless visit visa sponsorship files, tourist itineraries, family reunion visas, and hassle-free travel documentation.',
      primary_cta_text: 'Apply For Visit Visa',
      primary_cta_link: '/visit-visa',
      secondary_cta_text: 'Tourist Destinations',
      secondary_cta_link: '/tourist-visa',
      image_url: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'International Travel Destination Landmark',
      is_active: true,
      display_order: 3,
    },
    {
      id: 'slide-4',
      badge: '🌍 Scholarships & Opportunities',
      title: 'Your Future Has No Borders',
      subheading: 'Unlock fully funded scholarships, permanent residency guidance, and VIP counseling for your global mobility.',
      primary_cta_text: 'Book VIP Assessment',
      primary_cta_link: '/free-consultation',
      secondary_cta_text: 'View Scholarships',
      secondary_cta_link: '/scholarships',
      image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
      image_alt_text: 'Global Opportunities City Skyline',
      is_active: true,
      display_order: 4,
    },
  ];

  // Active slides list
  const configuredActiveSlides = (heroSlides || []).filter((s) => s.is_active).sort((a, b) => a.display_order - b.display_order);
  const activeSlides = configuredActiveSlides.length > 0 ? configuredActiveSlides : fallbackSlides;
  const totalSlides = activeSlides.length;

  const currentSlide = activeSlides[currentSlideIndex % totalSlides] || activeSlides[0];

  // Dynamic values
  const eyebrow = homepageHero?.eyebrow || 'GLONTIS VISA CONSULTANCY';
  const slideBadge = currentSlide?.badge || '🎓 Study Visa Services';
  const slideTitle = currentSlide?.title || 'Your Journey Abroad Starts Here';
  const slideSubheading = currentSlide?.subheading || 'Expert guidance for Study, Work, Visit & Tourist Visas, Immigration, Scholarships and overseas opportunities.';
  const primaryCtaText = currentSlide?.primary_cta_text || 'Book Free Consultation';
  const primaryCtaUrl = currentSlide?.primary_cta_link || '/free-consultation';
  const secondaryCtaText = currentSlide?.secondary_cta_text || 'Explore Our Services';
  const secondaryCtaUrl = currentSlide?.secondary_cta_link || '/services';
  const heroImage = currentSlide?.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80';
  const heroImageAlt = currentSlide?.image_alt_text || 'Glontis Overseas Counseling';

  // Floating Badges
  const floatingBadges = homepageHero?.floating_badges || [
    { id: 'fb-1', title: 'Study Visa', subtitle: 'Top Universities', icon_name: 'GraduationCap', is_active: true },
    { id: 'fb-2', title: 'Work Visa', subtitle: 'Job Permits', icon_name: 'Briefcase', is_active: true },
    { id: 'fb-3', title: 'Visit Visa', subtitle: 'Sponsor File', icon_name: 'Users', is_active: true },
    { id: 'fb-4', title: 'Tourist Visa', subtitle: 'Global Travel', icon_name: 'Compass', is_active: true },
  ];
  const activeBadges = floatingBadges.filter((b) => b.is_active);

  // Quick Service Links
  const activeServices = (homepageHero?.service_quick_links || [])
    .filter((s) => s.is_active)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  // Autoplay Effect
  useEffect(() => {
    if (!sliderSettings.autoplay || !isPlaying || totalSlides <= 1) return;
    if (sliderSettings.pause_on_hover && isHovered) return;

    const intervalTime = sliderSettings.autoplay_duration_ms || 5000;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [sliderSettings.autoplay, sliderSettings.autoplay_duration_ms, sliderSettings.pause_on_hover, isHovered, isPlaying, totalSlides]);

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

  const getBadgeHref = (badgeTitle: string) => {
    const t = badgeTitle.toLowerCase();
    if (t.includes('study')) return '/study-visa';
    if (t.includes('work')) return '/work-visa';
    if (t.includes('visit')) return '/visit-visa';
    if (t.includes('tourist')) return '/tourist-visa';
    return '/services';
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

  const whatsappNumber = settings.whatsapp || '03334530456';
  const cleanWhatsapp = whatsappNumber.replace(/^0/, '').replace(/\s+/g, '');

  const handleExploreCountryClick = (e: React.MouseEvent) => {
    if (!selectedCountry) {
      e.preventDefault();
      setCountryError(true);
      setTimeout(() => setCountryError(false), 4000);
    }
  };

  // International Route Highlights
  const routeDestinations = [
    { from: '🇵🇰 Pakistan', to: '🇬🇧 UK', flag: '🇬🇧' },
    { from: '🇵🇰 Pakistan', to: '🇦🇺 Australia', flag: '🇦🇺' },
    { from: '🇵🇰 Pakistan', to: '🇨🇦 Canada', flag: '🇨🇦' },
    { from: '🇵🇰 Pakistan', to: '🇺🇸 USA', flag: '🇺🇸' },
    { from: '🇵🇰 Pakistan', to: '🇪🇺 Europe', flag: '🇪🇺' },
  ];

  return (
    <section
      className="relative w-full bg-[#0A1128] text-white overflow-hidden min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-between group/hero transition-colors duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. CINEMATIC BACKGROUND ATMOSPHERE WITH GLOW & WORLD MAP PATTERN */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#EA580C]/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[130px]" />

        {/* Subtle World Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />

        {/* Animated Flying Particles / Light Glow Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 50,200 C 300,50 600,350 1200,100"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="2"
            className="animate-dash"
          />
          <path
            d="M 100,500 C 400,200 800,600 1400,250"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1.5"
            className="animate-dash"
            style={{ animationDuration: '2.5s' }}
          />
        </svg>

        {/* Dark Navy Gradient Overlay for Uncompromised Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/85 to-transparent z-10" />
      </div>

      {/* 2. HERO NAVIGATION CONTROLS (Floating Arrows) */}
      {totalSlides > 1 && sliderSettings.show_navigation_arrows && (
        <div className="hidden sm:block z-30">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#EA580C] border border-slate-700/80 hover:border-[#EA580C] text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 group/btn"
          >
            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#EA580C] border border-slate-700/80 hover:border-[#EA580C] text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 group/btn"
          >
            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* 3. MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 flex-1 flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: BRANDING & SLIDE TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
            {/* Top Brand Eyebrow & Slide Category Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-black text-white shadow-lg backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#EA580C] animate-spin-slow" />
                <span className="tracking-wider uppercase text-[11px] sm:text-xs">{eyebrow}</span>
              </div>

              <div key={`badge-${currentSlideIndex}`} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-xs font-extrabold text-orange-300 shadow-md animate-in fade-in slide-in-from-left-2 duration-500">
                <span>{slideBadge}</span>
              </div>
            </div>

            {/* Dynamic Animated Heading */}
            <div className="space-y-3">
              <h1
                key={`heading-${currentSlideIndex}`}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-500"
              >
                {slideTitle}
              </h1>

              {/* Dynamic Subheading / Description */}
              <p
                key={`desc-${currentSlideIndex}`}
                className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-2 duration-700"
              >
                {slideSubheading}
              </p>
            </div>

            {/* Country Target Destination Dropdown */}
            {countries?.length > 0 && (
              <div className="pt-1 max-w-xl mx-auto lg:mx-0 space-y-2">
                <div className="p-2 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      if (e.target.value) setCountryError(false);
                    }}
                    className="w-full sm:flex-1 bg-slate-950 text-white text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C] font-bold"
                  >
                    <option value="">Select Target Country Destination...</option>
                    {countries
                      .filter((c) => c.is_published)
                      .map((c) => (
                        <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                          {c.flag_emoji} Study / Visit in {c.name}
                        </option>
                      ))}
                  </select>

                  <Link
                    href={selectedCountry ? `/${selectedCountry}` : '#'}
                    onClick={handleExploreCountryClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-lg active:scale-95"
                  >
                    <span>Explore Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {countryError && (
                  <p className="text-xs font-bold text-amber-400 flex items-center justify-center lg:justify-start gap-1.5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Please select a target country destination from the dropdown list.</span>
                  </p>
                )}
              </div>
            )}

            {/* Hero CTA Action Buttons */}
            <div
              key={`cta-${currentSlideIndex}`}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-700"
            >
              <Link
                href={primaryCtaUrl}
                className="px-7 py-3.5 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-orange-900/30 hover:shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>

              <Link
                href={secondaryCtaUrl}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:border-[#EA580C]"
              >
                <span>{secondaryCtaText}</span>
              </Link>

              <a
                href={`https://wa.me/92${cleanWhatsapp}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20want%20information%20about%20Overseas%20Visa%20Guidance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </div>

            {/* Minimal High-Trust Proof Row */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-300 font-bold border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Professional Guidance</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personalized Counseling</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multan Office</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Assessment Fee</span>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: LARGE CINEMATIC VISUAL CONTAINER & FLOATING BADGES */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 group">
              {/* Active Hero Background Image with Ken Burns Zoom Effect */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={heroImage}
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-full object-cover transition-all duration-1000 ease-out transform scale-100 group-hover:scale-105 animate-in fade-in zoom-in-95 duration-700"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

              {/* Top Right Live Slide Counter */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-black text-white flex items-center gap-2">
                <span className="text-[#EA580C]">0{currentSlideIndex + 1}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">0{totalSlides}</span>
              </div>

              {/* Bottom Glass Caption Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-xl p-3.5 rounded-2xl border border-white/15 text-xs font-bold text-white flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EA580C]/20 border border-[#EA580C]/40 flex items-center justify-center text-[#EA580C]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">Glontis Official File Support</div>
                    <div className="text-[10px] text-slate-400 font-semibold">Authorized Advisory in Multan</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#EA580C] px-2.5 py-1 rounded-full uppercase font-black tracking-wider text-white shrink-0">
                  VIP Counseling
                </span>
              </div>
            </div>

            {/* 4 ELEGANT CONTINUOUS FLOATING VISA BADGES (Gently floating 4-8px) */}
            {activeBadges.length > 0 && (
              <>
                {/* Badge 1: Study Visa */}
                {activeBadges[0] && (
                  <Link
                    href={getBadgeHref(activeBadges[0].title)}
                    className="absolute -top-4 -left-2 sm:-left-6 bg-slate-900/95 hover:bg-[#0A1128] backdrop-blur-xl border border-slate-700/90 hover:border-[#EA580C] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-30 transition-all hover:scale-105 group animate-float-slow"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#EA580C]/20 text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white flex items-center justify-center font-black transition-colors shrink-0">
                      {renderIcon(activeBadges[0].icon_name || 'GraduationCap', 'w-4.5 h-4.5')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-orange-300 transition-colors flex items-center gap-1">
                        <span>{activeBadges[0].title}</span>
                        <span>🎓</span>
                      </div>
                      {activeBadges[0].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[0].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}

                {/* Badge 2: Work Visa */}
                {activeBadges[1] && (
                  <Link
                    href={getBadgeHref(activeBadges[1].title)}
                    className="absolute top-8 -right-2 sm:-right-6 bg-slate-900/95 hover:bg-[#0A1128] backdrop-blur-xl border border-slate-700/90 hover:border-[#EA580C] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-30 transition-all hover:scale-105 group animate-float-reverse"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center font-black transition-colors shrink-0">
                      {renderIcon(activeBadges[1].icon_name || 'Briefcase', 'w-4.5 h-4.5')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1">
                        <span>{activeBadges[1].title}</span>
                        <span>💼</span>
                      </div>
                      {activeBadges[1].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[1].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}

                {/* Badge 3: Visit Visa */}
                {activeBadges[2] && (
                  <Link
                    href={getBadgeHref(activeBadges[2].title)}
                    className="absolute bottom-16 -left-3 sm:-left-8 bg-slate-900/95 hover:bg-[#0A1128] backdrop-blur-xl border border-slate-700/90 hover:border-[#EA580C] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-30 transition-all hover:scale-105 group animate-float-slow"
                    style={{ animationDelay: '1.5s' }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center font-black transition-colors shrink-0">
                      {renderIcon(activeBadges[2].icon_name || 'Users', 'w-4.5 h-4.5')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                        <span>{activeBadges[2].title}</span>
                        <span>✈️</span>
                      </div>
                      {activeBadges[2].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[2].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}

                {/* Badge 4: Tourist Visa */}
                {activeBadges[3] && (
                  <Link
                    href={getBadgeHref(activeBadges[3].title)}
                    className="absolute -bottom-4 -right-2 sm:-right-6 bg-slate-900/95 hover:bg-[#0A1128] backdrop-blur-xl border border-slate-700/90 hover:border-[#EA580C] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-30 transition-all hover:scale-105 group animate-float-reverse"
                    style={{ animationDelay: '2s' }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white flex items-center justify-center font-black transition-colors shrink-0">
                      {renderIcon(activeBadges[3].icon_name || 'Compass', 'w-4.5 h-4.5')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                        <span>{activeBadges[3].title}</span>
                        <span>🌍</span>
                      </div>
                      {activeBadges[3].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[3].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* 4. MODERN PAGINATION DOTS & PLAY/PAUSE CONTROLLER */}
        {totalSlides > 1 && sliderSettings.show_pagination_dots && (
          <div className="mt-8 flex items-center justify-center gap-3 z-30">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-[#EA580C] text-slate-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <div className="flex items-center gap-2">
              {activeSlides.map((slide, idx) => (
                <button
                  key={slide.id || idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    idx === currentSlideIndex % totalSlides
                      ? 'w-9 bg-[#EA580C] shadow-md shadow-orange-500/50'
                      : 'w-2.5 bg-slate-700/80 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 5. DESTINATION ROUTES PILL BANNER */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 z-20">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-300">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#EA580C] mr-1">Global Routes:</span>
            {routeDestinations.map((route, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px] font-semibold hover:border-[#EA580C]/50 hover:text-white transition-all"
              >
                <span>{route.from}</span>
                <span className="text-[#EA580C]">➔</span>
                <span>{route.to}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 6. SERVICE QUICK LINKS BAR BELOW HERO */}
        {activeServices.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800/80 z-20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#EA580C]">Explore Services</span>
                <h3 className="text-base sm:text-lg font-black text-white">Our Premier Visa & Overseas Services</h3>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1"
              >
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x scrollbar-thin scrollbar-thumb-slate-800 lg:grid lg:grid-cols-4 xl:grid-cols-7 lg:overflow-visible">
              {activeServices.map((service) => (
                <Link
                  key={service.id}
                  href={service.url || '/services'}
                  className="min-w-[210px] lg:min-w-0 snap-start bg-slate-900/80 hover:bg-[#EA580C] border border-slate-800 hover:border-[#EA580C] p-3.5 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between shrink-0"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-white/20 text-[#EA580C] group-hover:text-white flex items-center justify-center transition-colors">
                        {renderIcon(service.icon_name, 'w-4.5 h-4.5')}
                      </div>
                      {service.badge && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EA580C]/20 group-hover:bg-white/20 text-[#EA580C] group-hover:text-white">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-white leading-tight">{service.title}</h4>
                      {service.description && (
                        <p className="text-[11px] text-slate-400 group-hover:text-white/90 line-clamp-2 mt-1 font-medium leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-slate-800/60 group-hover:border-white/20 flex items-center justify-between text-[11px] font-extrabold text-[#EA580C] group-hover:text-white">
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
  );
}
