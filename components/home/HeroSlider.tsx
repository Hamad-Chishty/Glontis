'use client';

import React, { useState } from 'react';
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
  AlertCircle,
} from 'lucide-react';

export default function HeroSlider() {
  const { homepageHero, settings, countries } = useData();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryError, setCountryError] = useState(false);

  const hero = homepageHero || {
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
    floating_badges: [
      { id: 'fb-1', title: 'Study Visa', subtitle: 'Top Universities', icon_name: 'GraduationCap', is_active: true },
      { id: 'fb-2', title: 'Work Visa', subtitle: 'Job Permits', icon_name: 'Briefcase', is_active: true },
      { id: 'fb-3', title: 'Visit Visa', subtitle: 'Sponsor File', icon_name: 'Users', is_active: true },
      { id: 'fb-4', title: 'Tourist Visa', subtitle: 'Global Travel', icon_name: 'Compass', is_active: true },
    ],
    service_quick_links: [
      { id: 'sql-1', title: 'Study Visa', badge: 'Popular', url: '/study-visa', icon_name: 'GraduationCap', description: 'UK, Australia, USA, Canada & EU Top Universities', is_active: true, display_order: 1 },
      { id: 'sql-2', title: 'Work Visa', badge: 'Permits', url: '/work-visa', icon_name: 'Briefcase', description: 'Europe, Middle East & Overseas Work Sponsorships', is_active: true, display_order: 2 },
      { id: 'sql-3', title: 'Visit Visa', badge: 'Sponsor File', url: '/visit-visa', icon_name: 'Users', description: 'Family Visits, Business Meetings & Cover Letters', is_active: true, display_order: 3 },
      { id: 'sql-4', title: 'Tourist Visa', badge: 'Fast Track', url: '/tourist-visa', icon_name: 'Compass', description: 'Schengen, USA, UK & Worldwide Holiday Visas', is_active: true, display_order: 4 },
      { id: 'sql-5', title: 'Business Visa', badge: 'Investors', url: '/services/business-visa', icon_name: 'Building2', description: 'Corporate Travel, Trade & Investor Entry Permits', is_active: true, display_order: 5 },
      { id: 'sql-6', title: 'Immigration / PR', badge: 'Residency', url: '/services/immigration', icon_name: 'Globe', description: 'Express Entry, Skilled Migration & PR Guidance', is_active: true, display_order: 6 },
      { id: 'sql-7', title: 'Scholarships', badge: '100% Grants', url: '/scholarships', icon_name: 'Award', description: 'Fully Funded & Partial Merit-Based Academic Grants', is_active: true, display_order: 7 },
    ],
  };

  const activeBadges = (hero.floating_badges || []).filter((b) => b.is_active);
  const activeServices = (hero.service_quick_links || [])
    .filter((s) => s.is_active)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  const getBadgeHref = (badge: { title: string }) => {
    const t = badge.title.toLowerCase();
    if (t.includes('study')) return '/study-visa';
    if (t.includes('work')) return '/work-visa';
    if (t.includes('visit')) return '/visit-visa';
    if (t.includes('tourist')) return '/tourist-visa';
    return '/services';
  };

  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
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

  return (
    <div className="relative bg-[#0A1838] text-white overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F07100]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Main Headline & Branding */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow / Main Branding */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F07100]/15 border border-[#F07100]/30 text-xs font-black text-[#F07100] uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F07100]" />
              <span>{hero.eyebrow || 'GLONTIS VISA CONSULTANCY'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Your Journey Abroad <br className="hidden sm:inline" />
              <span className="text-[#F07100]">Starts Here</span>
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              {hero.description ||
                'Expert guidance for Study, Work, Visit & Tourist Visas, Immigration, Scholarships and overseas opportunities.'}
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
                href={hero.primary_cta_url || '/free-consultation'}
                className="px-7 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl hover:shadow-orange-500/25 transition-all hover:scale-[1.02]"
              >
                <span>{hero.primary_cta_text || 'Book Free Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={hero.secondary_cta_url || '/services'}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:border-[#F07100]"
              >
                <span>{hero.secondary_cta_text || 'Explore Our Services'}</span>
              </Link>

              <a
                href={`https://wa.me/92${cleanWhatsapp}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20want%20information%20about%20Overseas%20Visa%20Guidance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md"
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

          {/* RIGHT SIDE: High-Quality Professional Travel Image & Clickable Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.hero_image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80'}
                alt={hero.hero_image_alt_text || hero.heading || 'Glontis Visa Consultancy'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Bottom Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F07100]" />
                  <span>Glontis Overseas File Guidance</span>
                </span>
                <span className="text-[10px] bg-[#F07100] px-2.5 py-0.5 rounded-full uppercase font-black">
                  VIP Support
                </span>
              </div>
            </div>

            {/* 4 CLICKABLE FLOATING VISA BADGES AROUND THE IMAGE */}
            {activeBadges.length > 0 && (
              <>
                {/* Badge 1: Top Left */}
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

                {/* Badge 2: Top Right */}
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

                {/* Badge 3: Bottom Left */}
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

                {/* Badge 4: Bottom Right */}
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

        {/* ================================================== */}
        {/* SERVICE QUICK LINKS BAR BELOW HERO CONTENT */}
        {/* ================================================== */}
        {activeServices.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800/80">
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

