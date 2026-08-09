'use client';

import React from 'react';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ConsultationForm from '@/components/home/ConsultationForm';
import { Star } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>4.9 Star Rated in Multan</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Student Feedback & Experience
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Read what students and parents say about their experience with Glontis Visa Consultancy.
          </p>
        </div>
      </section>

      <TestimonialsSection />

      <ConsultationForm />
    </main>
  );
}
