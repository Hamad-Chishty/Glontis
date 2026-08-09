'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { ChevronLeft, ChevronRight, Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSlider() {
  const { heroSlides, countries } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');

  const activeSlides = heroSlides.filter((s) => s.is_active).sort((a, b) => a.display_order - b.display_order);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const slide = activeSlides[currentSlide] || activeSlides[0];

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] bg-slate-950 text-white overflow-hidden flex flex-col justify-between">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.image_url}
          alt={slide.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-8 space-y-6">
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-400/30 backdrop-blur-md text-xs font-bold text-yellow-300 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>{slide.badge}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {slide.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              {slide.subheading}
            </p>

            {/* Quick Country Destination Selector */}
            <div className="pt-2 max-w-xl">
              <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col sm:flex-row items-center gap-2 shadow-2xl">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full sm:flex-1 bg-slate-900/90 text-white text-xs sm:text-sm py-3 px-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-semibold"
                >
                  <option value="">Select Target Country Destination...</option>
                  {countries.filter((c) => c.is_published).map((c) => (
                    <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                      {c.flag_emoji} Study in {c.name}
                    </option>
                  ))}
                </select>

                <Link
                  href={selectedCountry ? `/${selectedCountry}` : '/study-destinations'}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-lg"
                >
                  <span>Explore Info</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={slide.primary_cta_link || '/free-consultation'}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2 group"
              >
                <span>{slide.primary_cta_text || 'Book Free Consultation'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={slide.secondary_cta_link || '/study-destinations'}
                className="px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                {slide.secondary_cta_link?.includes('wa.me') && <MessageCircle className="w-4 h-4 text-emerald-400" />}
                <span>{slide.secondary_cta_text || 'Explore Destinations'}</span>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Assessment Fee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>200+ Partner Universities</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bosan Road, Multan Office</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators & Controls */}
      {activeSlides.length > 1 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-yellow-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
              className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-white border border-slate-700/60 backdrop-blur-md transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length)}
              className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-white border border-slate-700/60 backdrop-blur-md transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
