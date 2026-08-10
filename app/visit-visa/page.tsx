'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Award,
  Calendar,
  Sparkles,
  Briefcase,
  Check,
} from 'lucide-react';
import ConsultationForm from '@/components/home/ConsultationForm';

export default function VisitVisaPage() {
  const { visitVisaPage, settings } = useData();

  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Visit Visa';
  }, []);

  const page = visitVisaPage;
  const whatsappNumber = settings.whatsapp || '03334530456';
  const cleanWhatsapp = whatsappNumber.replace(/^0/, '').replace(/\s+/g, '');

  const visibility = page?.section_visibility || {
    hero: true,
    introduction: true,
    overview: true,
    who_can_apply: true,
    destinations: true,
    eligibility: true,
    documents: true,
    process: true,
    processing_info: true,
    benefits: true,
    faqs: true,
    cta: true,
  };

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'hero':
        if (!visibility.hero) return null;
        return (
          <div key="hero" className="relative bg-[#0A1838] text-white py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1838] via-[#0A1838]/95 to-slate-900/90 z-10" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#F07100]/15 rounded-full blur-3xl z-0" />

            <div className="relative z-20 w-[92%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-7 space-y-3.5 text-center lg:text-left">
                {page.hero_subheading && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F07100]/20 text-[#F07100] border border-[#F07100]/30 text-xs font-black uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-[#F07100]" />
                    <span>{page.hero_subheading}</span>
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-black text-white tracking-tight leading-[1.15]">
                  {page.hero_heading}
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {page.hero_description}
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    href={page.primary_cta_url || '/free-consultation'}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all"
                  >
                    <span>{page.primary_cta_text || 'Book Free Assessment'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/92${cleanWhatsapp}?text=Hello%20Glontis,%20I%20want%20information%20about%20a%20Visit%20Visa.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{page.whatsapp_button_text || 'Chat on WhatsApp'}</span>
                  </a>
                </div>

                <div className="pt-2.5 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-left">
                  <div>
                    <span className="block text-lg sm:text-xl font-black text-[#F07100]">High Rate</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Approval Support</span>
                  </div>
                  <div>
                    <span className="block text-lg sm:text-xl font-black text-white">UK, EU, US</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Key Embassies</span>
                  </div>
                  <div>
                    <span className="block text-lg sm:text-xl font-black text-white">Multan</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Official Office</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xl text-slate-900 border border-slate-100">
                <h3 className="text-lg font-black text-[#0A1838] mb-0.5">Apply for Visit Visa</h3>
                <p className="text-xs text-slate-500 mb-3 font-medium">Get your financial ties & cover letter evaluated.</p>
                <ConsultationForm />
              </div>
            </div>
          </div>
        );

      case 'introduction':
        if (!visibility.introduction || !page.introduction) return null;
        return (
          <div key="introduction" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Welcome to Visit Visa Services
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A1838]">
                  Professional Guidance for Visiting Relatives & Overseas Travel
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {page.introduction}
                </p>
              </div>

              {page.hero_image && (
                <div className="md:col-span-4 relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src={page.hero_image}
                    alt={page.hero_image_alt_text || 'Visit Visa Consultancy'}
                    title={page.hero_image_title || 'Visit Visa Consultancy'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'overview':
        if (!visibility.overview || !page.visa_overview) return null;
        return (
          <div key="overview" className="bg-slate-100/70 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-[#0A1838] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F07100]" />
                  <span>Visit Visa Overview & Advisory</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {page.visa_overview}
                </p>
              </div>
            </div>
          </div>
        );

      case 'who_can_apply':
        if (!visibility.who_can_apply || !page.who_can_apply?.length) return null;
        return (
          <div key="who_can_apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Eligibility Criteria
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A1838]">Who Can Apply for a Visit Visa?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.who_can_apply.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-orange-200 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-[#F07100] flex items-center justify-center shrink-0 font-black text-sm">
                      ✓
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'destinations':
        if (!visibility.destinations || !page.destinations?.length) return null;
        const activeDestinations = page.destinations.filter((d) => d.is_active !== false);
        return (
          <div key="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {dest.image_url && (
                      <div className="relative h-48 w-full bg-slate-100">
                        <Image
                          src={dest.image_url}
                          alt={dest.image_alt_text || dest.title}
                          title={dest.image_title || dest.title}
                          fill
                          className="object-cover"
                        />
                        {dest.badge && (
                          <div className="absolute top-3 right-3 bg-[#0A1838] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                            {dest.badge}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <span className="text-[11px] font-black uppercase text-[#F07100] bg-orange-50 px-2.5 py-1 rounded-md inline-block">
                        {dest.country}
                      </span>
                      <h3 className="text-lg font-extrabold text-[#0A1838]">{dest.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{dest.description}</p>

                      {dest.key_highlights?.length > 0 && (
                        <div className="pt-2 space-y-1.5">
                          {dest.key_highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
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
        );

      case 'eligibility':
        if (!visibility.eligibility || !page.eligibility_requirements?.length) return null;
        return (
          <div key="eligibility" className="bg-slate-100/60 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <h3 className="text-xl font-black text-[#0A1838] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F07100]" />
                <span>Eligibility Requirements & Profile Guidelines</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.eligibility_requirements.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'documents':
        if (!visibility.documents || !page.required_documents?.length) return null;
        return (
          <div key="documents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Document Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A1838]">Required Documents for Visit Visa</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {page.required_documents.map((doc, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0A1838] text-[#F07100] flex items-center justify-center font-black text-xs">
                    #{idx + 1}
                  </div>
                  <p className="text-xs font-bold text-[#0A1838] leading-relaxed">{doc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'process':
        if (!visibility.process || !page.application_process?.length) return null;
        return (
          <div key="process" className="bg-[#0A1838] text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-[#F07100]/10 px-3 py-1 rounded-full border border-[#F07100]/20">
                  Step-by-Step
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white">Visit Visa Application Process</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {page.application_process.map((step, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
                    <span className="w-9 h-9 rounded-xl bg-[#F07100] text-white flex items-center justify-center font-black text-sm shadow-md">
                      {step.step || idx + 1}
                    </span>
                    <h4 className="text-base font-extrabold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'processing_info':
        if (!visibility.processing_info || !page.processing_information) return null;
        const info = page.processing_information;
        return (
          <div key="processing_info" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-[#0A1838]">Processing & Duration Specifications</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-black uppercase text-slate-400">Processing Time</span>
                  <span className="text-xs font-black text-[#0A1838] mt-1 block">{info.processing_time}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-black uppercase text-slate-400">Visa Duration</span>
                  <span className="text-xs font-black text-[#0A1838] mt-1 block">{info.visa_duration}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-black uppercase text-slate-400">Entry Type</span>
                  <span className="text-xs font-black text-[#0A1838] mt-1 block">{info.entry_type}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-black uppercase text-slate-400">Stay Duration</span>
                  <span className="text-xs font-black text-[#0A1838] mt-1 block">{info.stay_duration}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="block text-[10px] font-black uppercase text-slate-400">Fee Estimate</span>
                  <span className="text-xs font-black text-[#0A1838] mt-1 block">{info.fee_estimate}</span>
                </div>
              </div>

              {info.important_info && (
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs font-bold text-slate-800">
                  <span className="text-[#F07100] font-black uppercase mr-1">Note:</span>
                  {info.important_info}
                </div>
              )}
            </div>
          </div>
        );

      case 'benefits':
        if (!visibility.benefits || !page.benefits?.length) return null;
        return (
          <div key="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
            <h3 className="text-xl font-black text-[#0A1838]">Why Choose Glontis for Visit Visa Assistance?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.benefits.map((b, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F07100] shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-700 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faqs':
        if (!visibility.faqs || !page.faqs?.length) return null;
        return (
          <div key="faqs" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            <div className="text-center space-y-2">
              <HelpCircle className="w-8 h-8 text-[#F07100] mx-auto" />
              <h2 className="text-2xl font-black text-[#0A1838]">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">Everything you need to know about visit visa file preparation.</p>
            </div>

            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h4 className="text-sm font-extrabold text-[#0A1838]">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        if (!visibility.cta) return null;
        return (
          <div key="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-r from-[#0A1838] to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#F07100]/20 rounded-full blur-2xl" />

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{page.cta_heading}</h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium">{page.cta_description}</p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href={page.primary_cta_url || '/free-consultation'}
                  className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-black text-xs flex items-center gap-2 shadow-lg"
                >
                  <span>{page.primary_cta_text || 'Book Assessment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {page.secondary_cta_text && (
                  <Link
                    href={page.secondary_cta_url || '/visit-visa'}
                    className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                  >
                    <span>{page.secondary_cta_text}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const order = page?.section_order || [
    'hero',
    'introduction',
    'overview',
    'who_can_apply',
    'destinations',
    'eligibility',
    'documents',
    'process',
    'processing_info',
    'benefits',
    'faqs',
    'cta',
  ];

  return <div className="min-h-screen bg-slate-50 pb-20">{order.map((key) => renderSection(key))}</div>;
}
