'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Award, CheckCircle2, Calendar, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

export default function ScholarshipsSection() {
  const { scholarships, settings } = useData();

  const activeScholarships = scholarships
    ? scholarships
        .filter((s) => s.is_active)
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    : [];

  if (activeScholarships.length === 0) {
    return null;
  }

  const primaryPhone = settings.phones?.[0] || '0333-4530456';
  const cleanPhone = primaryPhone.replace(/[^0-9]/g, '');

  return (
    <section id="scholarships-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3.5 py-1 rounded-full border border-yellow-400/20 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>International Scholarships & Financial Grants</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Fully Funded & Merit Scholarships
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Glontis Visa Consultancy helps students secure university tuition waivers, regional government grants, and living expense stipends for overseas studies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/free-consultation"
              className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-yellow-400/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check Eligibility</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {activeScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="group bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700/80 hover:border-yellow-400/60 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header with image & badge */}
                {scholarship.image_url && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={scholarship.image_url}
                      alt={scholarship.image_alt_text || scholarship.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                      {scholarship.flag_emoji && <span className="text-base">{scholarship.flag_emoji}</span>}
                      <span>{scholarship.country}</span>
                    </div>

                    {scholarship.is_featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        Featured Grant
                      </div>
                    )}

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-xs font-semibold text-yellow-300 bg-slate-950/70 px-2.5 py-1 rounded-lg border border-yellow-400/30 inline-block">
                        {scholarship.award_type}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors">
                      {scholarship.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <span>Coverage: {scholarship.amount_or_coverage}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {scholarship.description}
                  </p>

                  {/* Degree Levels */}
                  {scholarship.degree_levels && scholarship.degree_levels.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>Eligible:</span>
                      </span>
                      {scholarship.degree_levels.map((level, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 text-slate-300 text-[11px] font-medium border border-slate-700"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Key Benefits List */}
                  {scholarship.benefits && scholarship.benefits.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Grant Inclusions:
                      </span>
                      {scholarship.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Deadline if available */}
                  {scholarship.deadline && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Intake / Deadline: <strong className="text-slate-200">{scholarship.deadline}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0 border-t border-slate-700/60 mt-4 flex items-center justify-between gap-3">
                <Link
                  href="/free-consultation"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <span>Apply for Scholarship</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello Glontis Visa Consultancy, I want to apply for the ${scholarship.title} in ${scholarship.country}. Please guide me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all border border-emerald-500/30 shrink-0 text-xs font-bold flex items-center gap-1.5"
                  title="WhatsApp Inquiry"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
