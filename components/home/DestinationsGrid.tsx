'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { ArrowRight, Check, Clock, Briefcase, Award } from 'lucide-react';

export default function DestinationsGrid() {
  const { countries } = useData();

  const publishedCountries = countries.filter((c) => c.is_published);

  if (publishedCountries.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-100/80 px-3.5 py-1 rounded-full border border-blue-200">
            Top Study Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Popular Countries for Higher Education
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Glontis Visa Consultancy assists you with admissions, visa processing, financial documentation, and post-study work permits across leading global study hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedCountries.map((country) => (
            <div
              key={country.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={country.hero_image}
                    alt={`Study in ${country.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                    <span className="text-base">{country.flag_emoji}</span>
                    <span>{country.name}</span>
                  </div>

                  {country.is_featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      Top Choice
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {country.visa_info.post_study_work}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors flex items-center gap-2">
                    <span>Study in {country.name}</span>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {country.short_description}
                  </p>

                  {/* Highlights Pill Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{country.visa_info.processing_time}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{country.visa_info.work_rights}</span>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </span>
                    {country.study_benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                <Link
                  href={`/${country.slug}`}
                  className="w-full mt-4 py-3 rounded-xl bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <span>{country.name} Admission Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
