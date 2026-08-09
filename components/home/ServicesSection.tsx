'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { GraduationCap, Users, FileCheck, Award, MessageSquare, PlaneTakeoff, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesSection() {
  const { services } = useData();

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-6 h-6 text-blue-600" />,
    Users: <Users className="w-6 h-6 text-indigo-600" />,
    FileCheck: <FileCheck className="w-6 h-6 text-emerald-600" />,
    Award: <Award className="w-6 h-6 text-yellow-600" />,
    MessageSquare: <MessageSquare className="w-6 h-6 text-purple-600" />,
    PlaneTakeoff: <PlaneTakeoff className="w-6 h-6 text-cyan-600" />,
  };

  const publishedServices = services.filter((s) => s.is_published);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            End-To-End Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Study Abroad & Visa Services
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            From initial university selection and scholarship hunting to embassy file preparation and pre-departure briefings, Glontis Visa Consultancy covers every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedServices.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-100 inline-block group-hover:scale-110 transition-transform">
                  {iconMap[service.icon_name] || <GraduationCap className="w-6 h-6 text-blue-600" />}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.short_description}
                </p>

                <div className="space-y-2 pt-2">
                  {service.key_benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group/btn"
                >
                  <span>Learn More & Process</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
