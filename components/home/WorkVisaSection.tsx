'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Briefcase, CheckCircle2, ArrowRight, MapPin, Building2, ChevronRight, Phone, MessageSquare } from 'lucide-react';

export default function WorkVisaSection() {
  const { workVisaPage, settings } = useData();
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('All');

  if (!workVisaPage) {
    return null;
  }

  const activeCountries = (workVisaPage.countries_available || []).filter((c) => c.is_active);
  const activeJobs = (workVisaPage.job_categories || []).filter((j) => j.is_active);

  if (activeCountries.length === 0 && activeJobs.length === 0) {
    return null;
  }

  const primaryPhone = settings.phones?.[0] || '0333-4530456';
  const cleanPhone = primaryPhone.replace(/[^0-9]/g, '');

  const availableFilterBadges = [
    'All',
    ...Array.from(new Set(activeJobs.map((j) => j.badge).filter(Boolean))),
  ];

  const filteredJobs = activeJobs.filter((job) => {
    if (selectedCountryFilter === 'All') return true;
    return job.badge === selectedCountryFilter || job.title.toLowerCase().includes(selectedCountryFilter.toLowerCase());
  });

  return (
    <section id="work-visa-section" className="py-20 bg-slate-50 relative overflow-hidden border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-100/80 px-3.5 py-1 rounded-full border border-blue-200 inline-flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>International Employment Permits</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Work Visa & Verified Job Categories
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              Official work visa filing and employer contract verification for delivery riders, industrial technicians, drivers, beauticians, and skilled trades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/work-visa"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore All Work Visas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Active Work Visa Destinations Banner Cards */}
        {activeCountries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCountries.map((country) => (
              <div
                key={country.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {country.image_url && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={country.image_url}
                        alt={country.image_alt_text || country.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                        {country.badge || country.name}
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="text-lg font-black">{country.name} Work Visa</h3>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {country.description}
                    </p>

                    {country.points && country.points.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {country.points.slice(0, 3).map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href="/work-visa"
                    className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View {country.name} Requirements</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Job Categories Section */}
        {activeJobs.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Active Verified Job Categories
                </h3>
                <p className="text-xs text-slate-500">
                  Showing legal employer positions currently active in our Multan consultancy system
                </p>
              </div>

              {availableFilterBadges.length > 2 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {availableFilterBadges.map((badge) => (
                    <button
                      key={badge as string}
                      onClick={() => setSelectedCountryFilter(badge as string)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCountryFilter === badge
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {badge as string}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-100">
                        {job.badge || 'Official Category'}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-900 transition-colors line-clamp-2">
                      {job.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    {job.key_requirements && job.key_requirements.length > 0 && (
                      <div className="space-y-1 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Requirements:
                        </span>
                        {job.key_requirements.slice(0, 2).map((req, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <span className="text-blue-600 font-bold">•</span>
                            <span className="line-clamp-1">{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href="/free-consultation"
                      className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Apply at Multan Office</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello Glontis Visa Consultancy, I want to apply for ${job.title}. Please provide document details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-[11px] transition-colors border border-emerald-200"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
