'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import ConsultationForm from '@/components/home/ConsultationForm';
import { Globe, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function StudyDestinationsPage() {
  const { countries } = useData();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <Globe className="w-3.5 h-3.5 text-yellow-400" />
            <span>Study Abroad Destinations 2026</span>
          </span>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Choose Your Destination for Higher Studies
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Glontis Visa Consultancy offers comprehensive study abroad advisory and visa processing services for top international destinations.
          </p>
        </div>
      </section>

      <DestinationsGrid />

      <ConsultationForm />
    </main>
  );
}
