'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import ConsultationForm from '@/components/home/ConsultationForm';
import {
  GraduationCap,
  Users,
  FileCheck,
  Award,
  MessageSquare,
  PlaneTakeoff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { services, settings } = useData();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Service Not Found</h1>
        <p className="text-sm text-slate-600 mb-6 max-w-md">
          The requested service page is unavailable. Check our full list of services.
        </p>
        <Link
          href="/services"
          className="px-6 py-3 rounded-xl bg-blue-900 text-white font-bold text-xs uppercase tracking-wider"
        >
          View All Advisory Services
        </Link>
      </div>
    );
  }

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-10 h-10 text-blue-600" />,
    Users: <Users className="w-10 h-10 text-indigo-600" />,
    FileCheck: <FileCheck className="w-10 h-10 text-emerald-600" />,
    Award: <Award className="w-10 h-10 text-yellow-600" />,
    MessageSquare: <MessageSquare className="w-10 h-10 text-purple-600" />,
    PlaneTakeoff: <PlaneTakeoff className="w-10 h-10 text-cyan-600" />,
  };

  const whatsappNum = settings.whatsapp || '03334530456';
  const formattedWa = `92${whatsappNum.replace(/^0/, '').replace(/\s+/g, '')}`;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-yellow-400">{service.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="p-3.5 rounded-2xl bg-white shadow-md inline-block">
                {iconMap[service.icon_name] || <GraduationCap className="w-10 h-10 text-blue-600" />}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {service.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.short_description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <Link
                href="#consultation-form"
                className="px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all text-center"
              >
                Book This Service
              </Link>
              <a
                href={`https://wa.me/${formattedWa}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20need%20assistance%20with%20${encodeURIComponent(service.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Service Overview</h2>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {service.full_description}
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Step-By-Step Advisory Process</h3>
                <div className="space-y-3">
                  {service.process_steps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-blue-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{step.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold text-slate-900">Key Student Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.key_benefits.map((benefit, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-emerald-950">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-5">
                <h3 className="text-xl font-black">Why Choose Glontis Multan?</h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Over 5,000+ Successful Visa Grants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Direct University Representative Partnerships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Zero Hidden Fees or Secret Deductions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Bosan Road Office In-Person Counseling</span>
                  </li>
                </ul>

                <Link
                  href="/free-consultation"
                  className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationForm />
    </main>
  );
}
