'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import ConsultationForm from '@/components/home/ConsultationForm';
import {
  GraduationCap,
  Clock,
  Briefcase,
  Award,
  DollarSign,
  Calendar,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function CountryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { countries, universities, successStories, settings } = useData();

  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    // Check if it's a non-country path or 404
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <div className="p-4 rounded-full bg-blue-100 text-blue-900 mb-4 font-extrabold text-2xl">404</div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Destination Not Found</h1>
        <p className="text-sm text-slate-600 mb-6 max-w-md">
          The requested study destination guide is unavailable or under construction. Explore all available destinations.
        </p>
        <Link
          href="/study-destinations"
          className="px-6 py-3 rounded-xl bg-blue-900 text-white font-bold text-xs uppercase tracking-wider"
        >
          View All Study Destinations
        </Link>
      </div>
    );
  }

  const countryUnis = universities.filter(
    (u) => u.country.toLowerCase() === country.name.toLowerCase() && u.is_published
  );

  const countryStories = successStories.filter(
    (s) => s.country.toLowerCase() === country.name.toLowerCase() && s.is_published
  );

  const whatsappNum = settings.whatsapp || '03334530456';
  const formattedWa = `92${whatsappNum.replace(/^0/, '').replace(/\s+/g, '')}`;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="relative bg-slate-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={country.hero_image} alt={country.name} className="w-full h-full object-cover opacity-30 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/study-destinations" className="hover:text-white">Destinations</Link>
            <span>/</span>
            <span className="text-yellow-400">{country.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
                <span className="text-base">{country.flag_emoji}</span>
                <span>Study Abroad Guide 2026 Intakes</span>
              </span>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                Study in {country.name}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {country.short_description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <Link
                href="#consultation-form"
                className="px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all text-center"
              >
                Apply for {country.name} Visa
              </Link>
              <a
                href={`https://wa.me/${formattedWa}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20want%20information%20for%20studying%20in%20${country.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Key Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-xs text-white">
            <div className="space-y-0.5">
              <span className="text-slate-400 font-semibold block text-[11px]">Processing Time:</span>
              <span className="font-bold text-sm text-yellow-300">{country.visa_info.processing_time}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 font-semibold block text-[11px]">Work Rights:</span>
              <span className="font-bold text-sm text-yellow-300">{country.visa_info.work_rights}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 font-semibold block text-[11px]">Post-Study Work:</span>
              <span className="font-bold text-sm text-yellow-300">{country.visa_info.post_study_work}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 font-semibold block text-[11px]">Embassy Visa Fee:</span>
              <span className="font-bold text-sm text-yellow-300">{country.visa_info.visa_fee}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Overview of Higher Education in {country.name}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {country.full_description}
                </p>
              </div>

              {/* Benefits Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Top Reasons to Choose {country.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {country.study_benefits.map((benefit, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-blue-100 text-blue-900 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intakes & Tuition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-900 text-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Calendar className="w-5 h-5" />
                    <h4 className="font-bold text-base">Popular Intakes</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {country.visa_info.intakes.map((intake, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span>{intake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <DollarSign className="w-5 h-5" />
                    <h4 className="font-bold text-base">Average Tuition & Expenses</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white">Tuition:</strong> {country.tuition_fees_range}
                    <br />
                    <strong className="text-white">Living Costs:</strong> {country.living_expenses_estimate}
                  </p>
                </div>
              </div>

              {/* Financial & Document Checklist */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-900 text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Required Financial & Visa Documents</h3>
                    <p className="text-xs text-slate-500">Document checklist for Pakistani applicants from Multan</p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {country.visa_info.financial_requirement}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-blue-900">
                  <span className="px-3 py-1 rounded-full bg-blue-100">Passport (Min 18 Months Validity)</span>
                  <span className="px-3 py-1 rounded-full bg-blue-100">Attested Transcripts (HEC / IBCC)</span>
                  <span className="px-3 py-1 rounded-full bg-blue-100">Statement of Purpose (SOP)</span>
                  <span className="px-3 py-1 rounded-full bg-blue-100">Bank Statement / Holding Certificate</span>
                  <span className="px-3 py-1 rounded-full bg-blue-100">IELTS / PTE / English Proficiency Letter</span>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Glontis Value & Direct Apply */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-blue-900 text-white shadow-xl space-y-5 sticky top-28">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">Glontis Multan Services</span>
                  <h3 className="text-2xl font-black">Apply for {country.name}</h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Glontis Visa Consultancy handles your application from CAS/I-20 issuance to visa appointment and embassy interview mock sessions.
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Free Profile Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>University Offer Letter in 3-7 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>100% Document Verification Audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Mock Interview Session for Embassy</span>
                  </div>
                </div>

                <Link
                  href="/free-consultation"
                  className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Book Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Universities in Country */}
      {countryUnis.length > 0 && (
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Partner Institutions</span>
              <h2 className="text-3xl font-black">Top Universities in {country.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {countryUnis.map((uni) => (
                <div key={uni.id} className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white p-1.5 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{uni.name}</h4>
                      <p className="text-[11px] text-slate-400">{uni.city}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{uni.description}</p>
                  <div className="text-xs text-yellow-400 font-bold">{uni.tuition_range}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consultation Form Anchor Section */}
      <ConsultationForm />
    </main>
  );
}
