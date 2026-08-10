'use client';

import React from 'react';
import { useData } from '@/lib/context/DataContext';
import { GraduationCap, Award, Building2, Globe, ShieldCheck, CheckCircle, FileText, UserCheck } from 'lucide-react';

export default function TrustSection() {
  const { trustStats } = useData();

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-8 h-8 text-blue-600" />,
    Award: <Award className="w-8 h-8 text-yellow-500" />,
    Building2: <Building2 className="w-8 h-8 text-indigo-600" />,
    Globe: <Globe className="w-8 h-8 text-emerald-600" />,
  };

  const corePillars = [
    {
      title: 'Transparent Admissions',
      description: 'Zero hidden fees. Full disclosure of tuition deposits, university refund policies, and visa requirements.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Financial Document Audit',
      description: 'Strict 28-day bank holding period checks, sponsor wealth verification, and source-of-funds documentation.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Mock Interview Prep',
      description: '1-on-1 embassy credibility mock interview sessions for USA F1, UK, and German student visa applicants.',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Scholarship Search',
      description: 'Identify tuition waivers, merit discounts, and Italian DSU regional need-based scholarship grants.',
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 relative border-b border-slate-200/80">
      <div className="w-[92%] max-w-[1400px] mx-auto">
        {/* Editable Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[#0A1838] text-white shadow-xl relative overflow-hidden z-20 border border-slate-800">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />

          {trustStats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-3 sm:p-4 space-y-2 border-r border-slate-800/80 last:border-0">
              <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 mb-1">
                {iconMap[stat.icon] || <GraduationCap className="w-7 h-7 text-[#EA580C]" />}
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#EA580C]">
                {stat.label}
              </span>
              <p className="text-[11px] text-slate-300 hidden sm:block max-w-[200px] font-medium leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="mt-16 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Why Multan Students Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built on Integrity, Professionalism & Proven Results
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Glontis Visa Consultancy provides comprehensive, step-by-step guidance to turn your international education dreams into reality.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-lg hover:border-blue-200 transition-all space-y-3"
            >
              <div className="p-3 rounded-xl bg-white shadow-sm inline-block border border-slate-100">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
