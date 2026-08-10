'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Clock,
  ShieldCheck,
  Globe,
  HelpCircle,
  Plane,
} from 'lucide-react';
import ConsultationForm from '@/components/home/ConsultationForm';

export default function TouristVisaPage() {
  const { settings, touristVisaPage } = useData();

  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Tourist Visa';
  }, []);
  const whatsappNumber = settings.whatsapp || '03334530456';
  const data = touristVisaPage;
  const vis = data.section_visibility || {
    hero: true,
    introduction: true,
    overview: true,
    destinations: true,
    eligibility: true,
    documents: true,
    process: true,
    benefits: true,
    faqs: true,
    cta: true,
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      {/* Hero Banner Section */}
      {vis.hero && (
        <div className="relative bg-[#0A1838] text-white py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {data.hero_image && (
            <div className="absolute inset-0 z-0 opacity-20">
              <picture>
                {data.mobile_hero_image && (
                  <source media="(max-width: 640px)" srcSet={data.mobile_hero_image} />
                )}
                <img
                  src={data.hero_image}
                  alt={data.hero_image_alt_text || 'Tourist Visa Banner'}
                  title={data.hero_image_title}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1838] via-[#0A1838]/95 to-slate-900/90 z-10" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#F07100]/15 rounded-full blur-3xl z-0" />

          <div className="relative z-20 w-[92%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-3.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F07100]/20 text-[#F07100] border border-[#F07100]/30 text-xs font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#F07100]" />
                <span>{data.page_title || 'Tourist & Visit Visa Consultancy'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-black text-white tracking-tight leading-[1.15]">
                {data.hero_heading}
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {data.hero_description}
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/free-consultation"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  <span>{data.cta_button_text || 'Plan Your Holiday Visa'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20want%20information%20about%20Tourist%20Visa%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{data.whatsapp_button_text || 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xl text-slate-900 border border-slate-100">
              <h3 className="text-lg font-black text-[#0A1838] mb-0.5">Apply for Tourist Visa</h3>
              <p className="text-xs text-slate-500 mb-3 font-medium">Fast processing for individuals and families.</p>
              <ConsultationForm />
            </div>
          </div>
        </div>
      )}

      {/* Introduction & Overview */}
      {(vis.introduction || vis.overview) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#F07100] bg-orange-50 px-3 py-1 rounded-full">
              <FileText className="w-3.5 h-3.5" />
              <span>Holiday Visa Services</span>
            </div>
            {vis.introduction && (
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A1838]">
                {data.introduction}
              </h2>
            )}
            {vis.overview && (
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                {data.visa_overview}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Popular Tourist Destinations */}
      {vis.destinations && data.destinations && data.destinations.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Popular Holiday Destinations
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">Fast-Track Tourist Visa Packages</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Hassle-free e-visas and sticker visa support for your next vacation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.destinations.map((dest, idx) => (
              <div key={dest.id || idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  {dest.image_url && (
                    <div className="h-44 w-full overflow-hidden relative">
                      <img
                        src={dest.image_url}
                        alt={dest.image_alt_text || dest.title}
                        title={dest.image_title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {dest.badge && (
                        <span className="absolute top-3 right-3 bg-[#F07100] text-white text-[10px] font-black px-3 py-1 rounded-full shadow">
                          {dest.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <span className="text-[11px] font-black uppercase text-[#F07100] bg-orange-50 px-2.5 py-1 rounded-md inline-block">
                      {dest.country}
                    </span>
                    <h3 className="text-lg font-black text-[#0A1838]">{dest.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{dest.description}</p>

                    {dest.key_highlights && dest.key_highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-2 text-xs text-slate-700 font-medium">
                        {dest.key_highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/free-consultation"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Inquire {dest.country} Visa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eligibility & Documents Grid */}
      {(vis.eligibility || vis.documents) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {vis.eligibility && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#0A1838] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F07100]" />
                <span>Eligibility & Requirements</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                {data.eligibility_requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vis.documents && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#0A1838] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F07100]" />
                <span>Required Documents Checklist</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                {data.required_documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Processing Info & Specifications */}
      {vis.process && data.processing_information && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A1838] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#F07100] tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Processing Times & Visa Specifications</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Processing Time</span>
                <span className="text-lg font-black text-white">{data.processing_information.processing_time}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Validity Period</span>
                <span className="text-lg font-black text-white">{data.processing_information.validity_period}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Entry Type</span>
                <span className="text-lg font-black text-white">{data.processing_information.entry_type}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Max Stay Duration</span>
                <span className="text-lg font-black text-white">{data.processing_information.stay_duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQs */}
      {vis.faqs && data.faqs && data.faqs.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#F07100] mx-auto" />
            <h2 className="text-2xl font-black text-[#0A1838]">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Essential answers for leisure travelers & holiday seekers.</p>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div key={faq.id || idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-sm font-extrabold text-[#0A1838]">{faq.question}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call To Action Banner */}
      {vis.cta && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0A1838] to-[#132c66] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#F07100]/20 rounded-full blur-2xl" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black">{data.cta_heading || 'Ready for Your Vacation?'}</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                {data.cta_description || 'Get in touch with Glontis Visa Consultancy to secure your travel visa.'}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/free-consultation"
                  className="px-6 py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
                >
                  <span>{data.cta_button_text || 'Book Consultation Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{data.whatsapp_button_text || 'WhatsApp Us Directly'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
