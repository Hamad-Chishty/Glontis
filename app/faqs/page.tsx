'use client';

import React from 'react';
import FaqSection from '@/components/home/FaqSection';
import ConsultationForm from '@/components/home/ConsultationForm';
import { HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <HelpCircle className="w-4 h-4 text-yellow-400" />
            <span>Student Help Center</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Everything you need to know about bank holding periods, embassy interviews, university deposits, and visa filing in Multan.
          </p>
        </div>
      </section>

      <FaqSection />

      <ConsultationForm />
    </main>
  );
}
