'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  Building2,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import ConsultationForm from '@/components/home/ConsultationForm';

export default function StudyVisaPage() {
  const { countries, settings, faqs, successStories } = useData();

  const publishedCountries = countries.filter((c) => c.is_published);
  const studentFaqs = faqs.filter((f) => f.category === 'Study Visa' || f.category === 'General');
  const whatsappNumber = settings.whatsapp || '03334530456';
  const primaryPhone = settings.phones[0] || '03334301456';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner */}
      <div className="relative bg-[#0A1838] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1838] via-[#0A1838]/95 to-slate-900/90 z-10" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#F07100]/15 rounded-full blur-3xl z-0" />

        <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F07100]/20 text-[#F07100] border border-[#F07100]/30 text-xs font-black uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#F07100]" />
              <span>Official Student Visa Consultancy Multan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Study Abroad with <span className="text-[#F07100]">Glontis Visa Consultancy</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Turn your international education dream into reality. From university selection and scholarship guidance to complete visa file preparation and embassy interview prep, Glontis provides end-to-end expert support in Multan.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/free-consultation"
                className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <span>Book Free Student Counseling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20want%20to%20apply%20for%20a%20Study%20Visa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div>
                <span className="block text-2xl font-black text-[#F07100]">98%</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Visa Success</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">50+</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Top Universities</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">100%</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Transparent Fees</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-slate-900 border border-slate-100">
            <h3 className="text-xl font-black text-[#0A1838] mb-1">Apply for Study Visa</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">Get a call back from our senior counselor in Multan.</p>
            <ConsultationForm />
          </div>
        </div>
      </div>

      {/* Top Study Destinations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Global Educational Hubs
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">
            Popular Study Abroad Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Explore country-specific admission requirements, tuition fee estimates, post-study work rights, and intake deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={country.hero_image}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-[#0A1838]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-2 border border-slate-700">
                  <span className="text-base">{country.flag_emoji}</span>
                  <span>{country.name}</span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {country.short_description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Processing Time</span>
                      <span className="font-extrabold text-[#0A1838]">{country.visa_info.processing_time}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Work Rights</span>
                      <span className="font-extrabold text-emerald-700">{country.visa_info.work_rights}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/${country.slug}`}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>View Study in {country.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Study Visa Process */}
      <div className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full">
              Seamless Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">
              6 Steps to Your Student Visa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Free Profile Evaluation', desc: 'Counseling based on academic background, budget, and career goals.' },
              { step: '02', title: 'University & Course Selection', desc: 'Choosing accredited universities matching your preferred country and intake.' },
              { step: '03', title: 'Offer Letter & CAS Processing', desc: 'Document compilation, Statement of Purpose (SOP) review, and admission submission.' },
              { step: '04', title: 'Scholarship & Fee Deposit', desc: 'Securing automatic tuition discounts and receiving official confirmation of acceptance.' },
              { step: '05', title: 'Bank Statement & Visa File', desc: 'Accurate financial proof compilation and embassy file preparation.' },
              { step: '06', title: 'Embassy Submission & Flight', desc: 'Biometric scheduling, interview prep, visa approval, and pre-departure briefing.' },
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 relative overflow-hidden">
                <span className="text-3xl font-black text-[#F07100]/20 absolute top-4 right-4">{s.step}</span>
                <span className="w-8 h-8 rounded-xl bg-[#0A1838] text-white font-black text-xs flex items-center justify-center">
                  {s.step}
                </span>
                <h3 className="text-base font-extrabold text-[#0A1838]">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      {studentFaqs.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#F07100] mx-auto" />
            <h2 className="text-2xl font-black text-[#0A1838]">Student Visa FAQs</h2>
            <p className="text-xs text-slate-500">Common questions asked by Pakistani students applying for study visas.</p>
          </div>

          <div className="space-y-4">
            {studentFaqs.map((faq) => (
              <div key={faq.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-sm font-extrabold text-[#0A1838]">{faq.question}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
