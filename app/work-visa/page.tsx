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
  Globe,
  HelpCircle,
  Award,
} from 'lucide-react';
import CompactHeroForm from '@/components/home/CompactHeroForm';

export default function WorkVisaPage() {
  const { settings, workVisaPage } = useData();

  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Work Visa';
  }, []);
  const whatsappNumber = settings.whatsapp || '03334530456';
  const data = workVisaPage;
  const vis = data.section_visibility || {
    hero: true,
    introduction: true,
    overview: true,
    countries: true,
    job_categories: true,
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
          {/* Background image if provided */}
          {data.hero_image && (
            <div className="absolute inset-0 z-0 opacity-20">
              <picture>
                {data.mobile_hero_image && (
                  <source media="(max-width: 640px)" srcSet={data.mobile_hero_image} />
                )}
                <img
                  src={data.hero_image}
                  alt={data.hero_image_alt_text || 'Work Visa Banner'}
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
                <Briefcase className="w-3.5 h-3.5 text-[#F07100]" />
                <span>{data.page_title || 'Work Visa Consultancy'}</span>
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
                  <span>{data.cta_button_text || 'Book Work Visa Assessment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20want%20information%20about%20Work%20Visa%20opportunities.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{data.whatsapp_button_text || 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <CompactHeroForm
                title="Apply for Work Visa"
                subtitle="Free eligibility evaluation with our team in Multan."
                serviceType="Work Visa"
                defaultCountry="United Kingdom"
              />
            </div>
          </div>
        </div>
      )}

      {/* Introduction & Overview Section */}
      {(vis.introduction || vis.overview) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#F07100] bg-orange-50 px-3 py-1 rounded-full">
              <FileText className="w-3.5 h-3.5" />
              <span>Program Overview</span>
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

      {/* Available Countries / Destinations */}
      {vis.countries && data.countries_available && data.countries_available.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Global Destinations
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">Available Work Visa Countries</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Explore official work permit pathways for top international career hubs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.countries_available.map((c, idx) => (
              <div key={c.id || idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  {c.image_url && (
                    <div className="h-44 w-full overflow-hidden relative">
                      <img
                        src={c.image_url}
                        alt={c.image_alt_text || c.name}
                        title={c.image_title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {c.badge && (
                        <span className="absolute top-3 right-3 bg-[#0A1838] text-white text-[10px] font-black px-3 py-1 rounded-full shadow">
                          {c.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black text-[#0A1838] flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#F07100]" />
                      <span>{c.name}</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{c.description}</p>

                    {c.points && c.points.length > 0 && (
                      <ul className="space-y-1.5 pt-2 text-xs text-slate-700 font-medium">
                        {c.points.map((p, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{p}</span>
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
                    <span>Inquire for {c.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job Categories */}
      {vis.job_categories && data.job_categories && data.job_categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              In-Demand Sectors
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A1838]">High Demand Job Categories</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Key professional industries open for skilled work permits and sponsorship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.job_categories.map((job, idx) => (
              <div key={job.id || idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  {job.image_url && (
                    <div className="h-44 w-full overflow-hidden relative">
                      <img
                        src={job.image_url}
                        alt={job.image_alt_text || job.title}
                        title={job.image_title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {job.badge && (
                        <span className="absolute top-3 right-3 bg-[#F07100] text-white text-[10px] font-black px-3 py-1 rounded-full shadow">
                          {job.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-black text-[#0A1838] flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#F07100]" />
                      <span>{job.title}</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{job.description}</p>

                    {job.key_requirements && job.key_requirements.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">Key Requirements:</span>
                        <ul className="space-y-1 text-xs text-slate-700 font-medium">
                          {job.key_requirements.map((req, rIdx) => (
                            <li key={rIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/free-consultation"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#F07100] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Assess My Eligibility</span>
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
                <span>Eligibility Requirements</span>
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

      {/* Processing Info & Benefits */}
      {(vis.process || vis.benefits) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {vis.process && data.processing_information && (
            <div className="bg-[#0A1838] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#F07100] tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Processing Information</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">Processing Time</span>
                  <span className="text-lg font-black text-white">{data.processing_information.processing_time}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">Visa Duration</span>
                  <span className="text-lg font-black text-white">{data.processing_information.visa_duration}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">Work Rights</span>
                  <span className="text-lg font-black text-white">{data.processing_information.work_rights}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">Family Rights</span>
                  <span className="text-lg font-black text-white">{data.processing_information.family_dependents}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAQs */}
      {vis.faqs && data.faqs && data.faqs.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#F07100] mx-auto" />
            <h2 className="text-2xl font-black text-[#0A1838]">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Everything you need to know about work permit files.</p>
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
              <h2 className="text-2xl sm:text-4xl font-black">{data.cta_heading || 'Ready to Start Your Work Visa Process?'}</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                {data.cta_description || 'Contact Glontis Visa Consultancy today for personalized guidance.'}
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
