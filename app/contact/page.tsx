'use client';

import React from 'react';
import OfficeLocationMap from '@/components/home/OfficeLocationMap';
import ConsultationForm from '@/components/home/ConsultationForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Contact Us';
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <Mail className="w-4 h-4 text-yellow-400" />
            <span>Get In Touch</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Contact Glontis Visa Consultancy
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Visit our office on Bosan Road, Multan or send us a message online to schedule your free study abroad profile evaluation.
          </p>
        </div>
      </section>

      <OfficeLocationMap />

      <ConsultationForm />
    </main>
  );
}
