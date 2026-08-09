'use client';

import React from 'react';
import ConsultationForm from '@/components/home/ConsultationForm';
import TrustSection from '@/components/home/TrustSection';
import { Sparkles } from 'lucide-react';

export default function FreeConsultationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>100% Free Initial Assessment</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Book Your Free Study Abroad Assessment
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Our experienced Multan counselors will review your academic qualifications, gap years, budget, and target countries to recommend the best university options.
          </p>
        </div>
      </section>

      <ConsultationForm />

      <TrustSection />
    </main>
  );
}
