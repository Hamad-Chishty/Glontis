'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Clock,
  ShieldCheck,
  Building2,
  ChevronRight,
  HelpCircle,
  MapPin,
  DollarSign,
} from 'lucide-react';
import ConsultationForm from '@/components/home/ConsultationForm';

export default function WorkVisaPage() {
  const { settings, faqs } = useData();

  const workFaqs = faqs.filter((f) => f.category === 'Work Visa' || f.category === 'General');
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
              <Briefcase className="w-4 h-4 text-[#F07100]" />
              <span>International Work Permits & Job Seeker Visas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Work Abroad with <span className="text-[#F07100]">Glontis Visa Consultancy</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Expand your career globally. We offer complete guidance for UK Health & Care Visas, EU Blue Cards, Germany Opportunity Cards (Chancenkarte), Gulf Work Permits, and skilled migration files.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/free-consultation"
                className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <span>Book Work Visa Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20want%20information%20about%20Work%20Visa%20opportunities.`}
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
                <span className="block text-2xl font-black text-[#F07100]">EU & UK</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Key Regions</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">100%</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">File Compliance</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">Multan</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Direct Office</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-slate-900 border border-slate-100">
            <h3 className="text-xl font-black text-[#0A1838] mb-1">Apply for Work Visa</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">Free eligibility check with our Multan team.</p>
            <ConsultationForm />
          </div>
        </div>
      </div>

      {/* Popular Work Visa Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            In-Demand Sectors
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">
            Popular Work Permit & Skilled Pathways
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            We guide professionals in Healthcare, IT, Engineering, Trades, and Hospitality toward official employer sponsorship and work permit visas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'UK Health & Care Worker Visa',
              country: 'United Kingdom',
              badge: 'Fast-Track Visa',
              desc: 'Specialized visa route for doctors, nurses, and healthcare professionals with NHS and care provider sponsorship.',
              points: ['Reduced visa application fees', 'Exemption from Immigration Health Surcharge', 'Family dependent rights'],
            },
            {
              title: 'Germany Opportunity Card (Chancenkarte)',
              country: 'Germany',
              badge: 'Points-Based Visa',
              desc: 'Job seeker visa allowing skilled Pakistani workers to live in Germany while searching for full-time employment.',
              points: ['No employer sponsorship required initially', 'Part-time work permitted during job search', 'Pathway to EU Blue Card'],
            },
            {
              title: 'EU Blue Card & Work Permits',
              country: 'Romania, Poland, Czechia',
              badge: 'Direct Work Permit',
              desc: 'Official European work permit processing for engineers, IT specialists, construction workers, and hotel staff.',
              points: ['Employer contract assistance', 'Family reunification options', 'PR eligible after qualifying period'],
            },
            {
              title: 'GCC Work Visas',
              country: 'Saudi Arabia, UAE, Qatar',
              badge: 'Employment Visa',
              desc: 'Immediate employment visa processing and document attestation for Middle Eastern corporate roles.',
              points: ['Quick processing turnaround', 'MOFA & Chamber attestation guidance', 'Tax-free salary packages'],
            },
            {
              title: 'Canada Job Seeker & Express Entry',
              country: 'Canada',
              badge: 'Skilled Migration',
              desc: 'Federal Skilled Worker Program (FSWP) and Provincial Nominee Program (PNP) assessment and file processing.',
              points: ['Comprehensive WES credential evaluation', 'CRS score calculation & optimization', 'Direct Permanent Residency route'],
            },
            {
              title: 'Australia Employer Nomination (Subclass 482)',
              country: 'Australia',
              badge: 'Temporary Skill Shortage',
              desc: 'Sponsorship visa route for qualified tradespeople, technical leads, and medical experts.',
              points: ['Skill assessment with VETASSESS/TRA', '2 to 4 year visa duration', 'Pathway to PR Subclass 186'],
            },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-[#F07100] bg-orange-50 px-2.5 py-1 rounded-md">
                    {cat.country}
                  </span>
                  <span className="bg-[#0A1838] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0A1838]">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{cat.desc}</p>

                <ul className="space-y-1.5 pt-2 text-xs text-slate-700 font-medium">
                  {cat.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/free-consultation"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Inquire About {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {workFaqs.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#F07100] mx-auto" />
            <h2 className="text-2xl font-black text-[#0A1838]">Work Visa FAQs</h2>
            <p className="text-xs text-slate-500">Essential answers for job seekers and skilled professionals.</p>
          </div>

          <div className="space-y-4">
            {workFaqs.map((faq) => (
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
