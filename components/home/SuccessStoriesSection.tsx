'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Award, CheckCircle, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';

export default function SuccessStoriesSection() {
  const { successStories } = useData();

  const publishedStories = successStories.filter((s) => s.is_published);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            Real Visa Approvals
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Glontis Success Stories & Visa Grants
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            See real student visa grants secured for Pakistani students in Multan with full guidance from Glontis Visa Consultancy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedStories.map((story) => (
            <div
              key={story.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Profile & Badge */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-emerald-500/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={story.student_image} alt={story.student_name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{story.student_name}</h3>
                    <p className="text-xs font-semibold text-blue-900 flex items-center gap-1">
                      <span>{story.country}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{story.university}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{story.visa_type}</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{story.grant_date}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">Program: {story.program}</p>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;{story.story_text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">Verified Visa Grant</span>
                <Link
                  href="/free-consultation"
                  className="text-xs font-extrabold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Start Your File</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>Explore All Student Approvals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
