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
} from 'lucide-react';

export default function HeroSlider() {
  const { homepageHero, heroSlides, settings, countries } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryError, setCountryError] = useState(false);

  // Slider settings with defaults
  const sliderSettings = homepageHero?.slider_settings || {
    animation_type: 'fade',
    autoplay: true,
    autoplay_duration_ms: 5000,
    transition_speed_ms: 700,
    pause_on_hover: true,
    show_navigation_arrows: true,
    show_pagination_dots: true,
  };

  // Active slides array
  const activeSlides = (heroSlides || []).filter((s) => s.is_active).sort((a, b) => a.display_order - b.display_order);

  // Fallback single slide from homepageHero if no heroSlides exist
  const currentHero = activeSlides.length > 0 ? activeSlides[currentSlideIndex % activeSlides.length] : null;

  // Single default slide
  const fallbackHero = homepageHero || {
    eyebrow: 'GLONTIS VISA CONSULTANCY',
    heading: 'Your Journey Abroad Starts Here',
    description:
      'Expert guidance for Study, Work, Visit & Tourist Visas, Immigration, Scholarships and overseas opportunities.',
    primary_cta_text: 'Book Free Consultation',
    primary_cta_url: '/free-consultation',
    secondary_cta_text: 'Explore Our Services',
    secondary_cta_url: '/services',
    hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    hero_image_alt_text: 'Glontis Visa Consultancy - Overseas Visa Counseling',
  };

  const eyebrow = currentHero?.badge || fallbackHero.eyebrow || 'GLONTIS VISA CONSULTANCY';
  const heading = currentHero?.title || fallbackHero.heading || 'Your Journey Abroad Starts Here';
  const description = currentHero?.subheading || fallbackHero.description || 'Expert guidance for Study, Work, Visit & Tourist Visas, Immigration, Scholarships and overseas opportunities.';
  const primaryCtaText = currentHero?.primary_cta_text || fallbackHero.primary_cta_text || 'Book Free Consultation';
  const primaryCtaUrl = currentHero?.primary_cta_link || fallbackHero.primary_cta_url || '/free-consultation';
  const secondaryCtaText = currentHero?.secondary_cta_text || fallbackHero.secondary_cta_text || 'Explore Our Services';
  const secondaryCtaUrl = currentHero?.secondary_cta_link || fallbackHero.secondary_cta_url || '/services';
  const heroImage = currentHero?.image_url || fallbackHero.hero_image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80';
  const heroImageAlt = currentHero?.image_alt_text || fallbackHero.hero_image_alt_text || 'Glontis Overseas Counseling';

  const floatingBadges = homepageHero?.floating_badges || [
    { id: 'fb-1', title: 'Study Visa', subtitle: 'Top Universities', icon_name: 'GraduationCap', is_active: true },
    { id: 'fb-2', title: 'Work Visa', subtitle: 'Job Permits', icon_name: 'Briefcase', is_active: true },
    { id: 'fb-3', title: 'Visit Visa', subtitle: 'Sponsor File', icon_name: 'Users', is_active: true },
    { id: 'fb-4', title: 'Tourist Visa', subtitle: 'Global Travel', icon_name: 'Compass', is_active: true },
  ];

  const activeBadges = floatingBadges.filter((b) => b.is_active);

  const activeServices = (homepageHero?.service_quick_links || [])
    .filter((s) => s.is_active)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  // Handle Autoplay Timer
  const totalSlides = activeSlides.length;
  useEffect(() => {
    if (!sliderSettings.autoplay || totalSlides <= 1) return;
    if (sliderSettings.pause_on_hover && isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, sliderSettings.autoplay_duration_ms || 5000);

    return () => clearInterval(timer);
  }, [sliderSettings.autoplay, sliderSettings.autoplay_duration_ms, sliderSettings.pause_on_hover, isHovered, totalSlides]);

  const handlePrev = () => {
    if (totalSlides === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    if (totalSlides === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const getBadgeHref = (badge: { title: string }) => {
    const t = badge.title.toLowerCase();
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

  // Determine transition animation class
  const getAnimationClasses = () => {
    switch (sliderSettings.animation_type) {
      case 'slide':
        return 'transition-all duration-700 ease-in-out transform';
      case 'zoom':
        return 'transition-all duration-700 ease-out transform hover:scale-[1.02]';
      case 'crossfade':
        return 'transition-opacity duration-1000 ease-in-out';
      case 'fade':
      default:
        return 'transition-opacity duration-500 ease-in-out';
    }
  };

  return (
    <div
      className="relative bg-[#0A1838] text-white overflow-hidden group/hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F07100]/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Slide Index Badge & Navigation Arrows */}
      {totalSlides > 1 && sliderSettings.show_navigation_arrows && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#F07100] border border-slate-700 hover:border-[#F07100] text-white flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#F07100] border border-slate-700 hover:border-[#F07100] text-white flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${getAnimationClasses()}`}>
          
          {/* LEFT SIDE: Headline & Branding */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow / Main Branding */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F07100]/15 border border-[#F07100]/30 text-xs font-black text-[#F07100] uppercase tracking-wider shadow-sm transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-[#F07100]" />
              <span>{eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] transition-all duration-500">
              {heading}
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>

            {/* Country Destination Selector */}
            {countries?.length > 0 && (
              <div className="pt-1 max-w-xl mx-auto lg:mx-0 space-y-2">
                <div className="p-2 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      if (e.target.value) setCountryError(false);
                    }}
                    className="w-full sm:flex-1 bg-slate-950 text-white text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F07100] font-bold"
                  >
                    <option value="">Select Target Country Destination...</option>
                    {countries
                      .filter((c) => c.is_published)
                      .map((c) => (
                        <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                          {c.flag_emoji} Study in {c.name}
                        </option>
                      ))}
                  </select>

                  <Link
                    href={selectedCountry ? `/${selectedCountry}` : '#'}
                    onClick={handleExploreCountryClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md active:scale-95"
                  >
                    <span>Explore Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {countryError && (
                  <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Please select a target country destination from the dropdown list.</span>
                  </p>
                )}
              </div>
            )}

            {/* Hero CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <Link
                href={primaryCtaUrl}
                className="px-7 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl hover:shadow-orange-500/25 transition-all hover:scale-[1.02]"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={secondaryCtaUrl}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:border-[#F07100]"
              >
                <span>{secondaryCtaText}</span>
              </Link>

              <a
                href={`https://wa.me/92${cleanWhatsapp}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20want%20information%20about%20Overseas%20Visa%20Guidance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-semibold border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Assessment Fee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>200+ Partner Universities</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official Multan Office</span>
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: High-Quality Professional Travel Image & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

              {/* Bottom Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F07100]" />
                  <span>Glontis Overseas File Guidance</span>
                </span>
                <span className="text-[10px] bg-[#F07100] px-2.5 py-0.5 rounded-full uppercase font-black">
                  VIP Support
                </span>
              </div>
            </div>

            {/* CLICKABLE FLOATING VISA BADGES */}
            {activeBadges.length > 0 && (
              <>
                {activeBadges[0] && (
                  <Link
                    href={getBadgeHref(activeBadges[0])}
                    className="absolute -top-4 -left-2 sm:-left-6 bg-slate-900/95 hover:bg-[#0A1838] backdrop-blur-xl border border-slate-700 hover:border-[#F07100] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-20 transition-all hover:scale-105 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#F07100]/20 text-[#F07100] group-hover:bg-[#F07100] group-hover:text-white flex items-center justify-center font-black transition-colors">
                      {renderIcon(activeBadges[0].icon_name || 'GraduationCap', 'w-4 h-4')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-[#F07100] transition-colors">{activeBadges[0].title}</div>
                      {activeBadges[0].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[0].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}

                {activeBadges[1] && (
                  <Link
                    href={getBadgeHref(activeBadges[1])}
                    className="absolute top-6 -right-2 sm:-right-6 bg-slate-900/95 hover:bg-[#0A1838] backdrop-blur-xl border border-slate-700 hover:border-[#F07100] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-20 transition-all hover:scale-105 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center font-black transition-colors">
                      {renderIcon(activeBadges[1].icon_name || 'Briefcase', 'w-4 h-4')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-blue-300 transition-colors">{activeBadges[1].title}</div>
                      {activeBadges[1].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[1].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}

                {activeBadges[2] && (
                  <Link
                    href={getBadgeHref(activeBadges[2])}
                    className="absolute bottom-12 -left-3 sm:-left-8 bg-slate-900/95 hover:bg-[#0A1838] backdrop-blur-xl border border-slate-700 hover:border-[#F07100] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-20 transition-all hover:scale-105 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center font-black transition-colors">
                      {renderIcon(activeBadges[2].icon_name || 'Users', 'w-4 h-4')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition-colors">{activeBadges[2].title}</div>
                      {activeBadges[2].subtitle && (
                        <div className="text-[10px] text-slate-400 font-semibold">{activeBadges[2].subtitle}</div>
                      )}
                    </div>
                  </Link>
                )}

                {activeBadges[3] && (
                  <Link
                    href={getBadgeHref(activeBadges[3])}
                    className="absolute -bottom-4 -right-2 sm:-right-6 bg-slate-900/95 hover:bg-[#0A1838] backdrop-blur-xl border border-slate-700 hover:border-[#F07100] p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-20 transition-all hover:scale-105 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white flex items-center justify-center font-black transition-colors">
                      {renderIcon(activeBadges[3].icon_name || 'Compass', 'w-4 h-4')}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-purple-300 transition-colors">{activeBadges[3].title}</div>
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

        {/* Pagination Dots */}
        {totalSlides > 1 && sliderSettings.show_pagination_dots && (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {activeSlides.map((slide, idx) => (
              <button
                key={slide.id || idx}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex % totalSlides
                    ? 'w-8 bg-[#F07100]'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        )}

        {/* SERVICE QUICK LINKS BAR BELOW HERO CONTENT */}
        {activeServices.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-800/80">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F07100]">Explore Services</span>
                <h3 className="text-lg font-black text-white">Our Premier Visa & Overseas Services</h3>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-[#F07100] hover:underline flex items-center gap-1"
              >
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Horizontal Scroll / Responsive Grid for Quick Links */}
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-slate-800 lg:grid lg:grid-cols-4 xl:grid-cols-7 lg:overflow-visible">
              {activeServices.map((service) => (
                <Link
                  key={service.id}
                  href={service.url || '/services'}
                  className="min-w-[220px] lg:min-w-0 snap-start bg-slate-900/80 hover:bg-[#F07100] border border-slate-800 hover:border-[#F07100] p-4 rounded-2xl transition-all duration-300 group shadow-md flex flex-col justify-between shrink-0"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-white/20 text-[#F07100] group-hover:text-white flex items-center justify-center transition-colors">
                        {renderIcon(service.icon_name, 'w-5 h-5')}
                      </div>
                      {service.badge && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F07100]/20 group-hover:bg-white/20 text-[#F07100] group-hover:text-white">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-white group-hover:text-white">{service.title}</h4>
                      {service.description && (
                        <p className="text-[11px] text-slate-400 group-hover:text-white/90 line-clamp-2 mt-1 font-medium">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-800/60 group-hover:border-white/20 flex items-center justify-between text-[11px] font-extrabold text-[#F07100] group-hover:text-white">
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
