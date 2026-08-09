'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Clock,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Globe,
} from 'lucide-react';
import ConsultationForm from '@/components/home/ConsultationForm';

export default function VisitVisaPage() {
  const { settings, faqs } = useData();

  const visitFaqs = faqs.filter((f) => f.category === 'Visit Visa' || f.category === 'General');
  const whatsappNumber = settings.whatsapp || '03334530456';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner */}
      <div className="relative bg-[#0A1838] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1838] via-[#0A1838]/95 to-slate-900/90 z-10" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#F07100]/15 rounded-full blur-3xl z-0" />

        <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F07100]/20 text-[#F07100] border border-[#F07100]/30 text-xs font-black uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#F07100]" />
              <span>Family Visit & Business Travel Visa Experts</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Family & Business <span className="text-[#F07100]">Visit Visas</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Visit family members abroad, attend business conferences, or explore investment opportunities with complete visa file preparation from Glontis Visa Consultancy in Multan.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/free-consultation"
                className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <span>Book Free Visit Visa Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20want%20information%20about%20a%20Visit%20Visa.`}
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
                <span className="block text-2xl font-black text-[#F07100]">100%</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">File Legal Proofs</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">UK & EU</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Top Destinations</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">Multan</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">In-Person Prep</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-slate-900 border border-slate-100">
            <h3 className="text-xl font-black text-[#0A1838] mb-1">Apply for Visit Visa</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">Get your financial ties & cover letter evaluated.</p>
            <ConsultationForm />
          </div>
        </div>
      </div>

      {/* Popular Visit Visa Destinations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Top Countries
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">
            Popular Visit Visa Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            We assist with sponsor invitation letters, financial tie-proofs, travel insurance, and interview preparation for major embassies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'UK Standard Visitor Visa (6 Months / 2 Years)',
              country: 'United Kingdom',
              desc: 'Visit family, friends, or attend business meetings in London and across the UK with solid financial documentation.',
            },
            {
              title: 'Schengen Business & Family Visit Visa',
              country: 'Germany, France, Italy, Spain',
              desc: 'Travel across 29 Schengen countries. Complete itinerary, invitation verification, and insurance file compilation.',
            },
            {
              title: 'USA B1/B2 Visitor Visa',
              country: 'United States',
              desc: 'DS-160 form filing, fee payment, appointment booking, and mock interview preparation at the US Embassy in Islamabad.',
            },
            {
              title: 'Canada Visitor Visa (TRV)',
              country: 'Canada',
              desc: 'Multiple-entry Canada visitor visa filing for visiting children, relatives, or attending trade exhibitions.',
            },
            {
              title: 'Australia Visitor Visa (Subclass 600)',
              country: 'Australia',
              desc: 'Tourist & Family stream visas with online ImmiAccount submission and genuine temporary entrant (GTE) proofing.',
            },
            {
              title: 'Saudi Arabia & UAE Visit Visas',
              country: 'Middle East',
              desc: 'Fast 24-48 hour e-visa processing for family visits, business exhibitions, and Umrah visits.',
            },
          ].map((dest, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase text-[#F07100] bg-orange-50 px-2.5 py-1 rounded-md inline-block">
                  {dest.country}
                </span>
                <h3 className="text-lg font-extrabold text-[#0A1838]">{dest.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{dest.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/free-consultation"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Apply for {dest.country} Visit Visa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {visitFaqs.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#F07100] mx-auto" />
            <h2 className="text-2xl font-black text-[#0A1838]">Visit Visa FAQs</h2>
            <p className="text-xs text-slate-500">Everything you need to know about visit visa file preparation.</p>
          </div>

          <div className="space-y-4">
            {visitFaqs.map((faq) => (
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
