'use client';

import React from 'react';
import UniversitiesSection from '@/components/home/UniversitiesSection';
import ConsultationForm from '@/components/home/ConsultationForm';
import { Building2 } from 'lucide-react';

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <Building2 className="w-4 h-4 text-yellow-400" />
            <span>200+ Recognized Global Universities</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Explore Partner Institutions & Campuses
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Direct university admissions, tuition fee deposit guidance, and CAS/I-20 issuance with Glontis Visa Consultancy Multan.
          </p>
        </div>
      </section>

      <UniversitiesSection />

      <ConsultationForm />
    </main>
  );
}
