'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import ConsultationForm from '@/components/home/ConsultationForm';
import TrustSection from '@/components/home/TrustSection';
import { GraduationCap, ShieldCheck, Award, Users, MapPin, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { settings } = useData();

  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | About Us';
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-20 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <GraduationCap className="w-4 h-4 text-yellow-400" />
            <span>About Glontis Visa Consultancy</span>
          </span>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
            Empowering Pakistani Students to Excel Globally
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Headquartered in Multan, Punjab, Glontis Visa Consultancy is dedicated to providing transparent, honest, and result-oriented study abroad advisory services.
          </p>
        </div>
      </section>

      {/* Main Mission & Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
                Our Purpose
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Dedicated to High Approval Rates & Transparent Processing
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                At Glontis Visa Consultancy, we understand that studying abroad is a life-changing milestone for students and their families. Our experienced counselors in Multan analyze every transcript, gap statement, financial asset, and English proficiency test to craft a compelling visa application.
              </p>

              <div className="space-y-3 pt-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transparent fee structures with zero surprise charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct application tracking with official CAS/I-20 portals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thorough mock credibility interview prep for embassy visits</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
              <h3 className="text-2xl font-extrabold text-yellow-400">Glontis Multan Branch Highlights</h3>
              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-bold text-white text-sm">Strategic Location</h4>
                  <p className="mt-0.5">{settings.address}</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Recognized Institutional Ties</h4>
                  <p className="mt-0.5">Partnered with over 200+ universities in UK, Canada, USA, Australia, and Europe.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Advisors with Proven Experience</h4>
                  <p className="mt-0.5">Our senior counselors have handled thousands of visa cases since inception.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />

      <ConsultationForm />
    </main>
  );
}
