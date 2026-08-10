'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import ServicesSection from '@/components/home/ServicesSection';
import ConsultationForm from '@/components/home/ConsultationForm';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Services';
  }, []);
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <GraduationCap className="w-4 h-4 text-yellow-400" />
            <span>End-to-End Educational Advisory</span>
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Our Visa & University Advisory Services
          </h1>

          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            From free initial profile assessments and university matching to visa file audit, scholarship applications, and post-arrival support in Multan.
          </p>
        </div>
      </section>

      <ServicesSection />

      <ConsultationForm />
    </main>
  );
}
