'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Award, GraduationCap, ArrowRight, CheckCircle2, MessageCircle, DollarSign, Calendar } from 'lucide-react';

export default function ScholarshipsPage() {
  const { universities, settings } = useData();

  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Scholarships';
  }, []);
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Filter universities offering scholarships
  const scholarshipUnis = universities.filter((u) => u.scholarships_available && u.is_published);

  const countriesList = ['All', ...Array.from(new Set(scholarshipUnis.map((u) => u.country)))];

  const filteredUnis = scholarshipUnis.filter((u) => {
    if (selectedCountry !== 'All' && u.country !== selectedCountry) return false;
    return true;
  });

  const whatsappNumber = settings.whatsapp || '03334530456';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-[92%] max-w-[1400px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>International Education Aid</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight leading-tight">
            Study Abroad Scholarships & Fee Discounts
          </h1>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover partial and full tuition fee scholarships for Bachelor’s & Master’s programs across UK, Australia, Canada, USA, Germany, and Ireland.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Country Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-slate-700 mr-2">Filter by Country:</span>
          {countriesList.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCountry === country
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnis.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uni.logo_url}
                      alt={uni.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 p-1 border border-slate-200"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-900 transition-colors">
                        {uni.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {uni.city}, {uni.country}
                      </p>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                    Scholarship
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <span>Funding Opportunity</span>
                  </div>
                  <p className="text-xs text-amber-950 font-semibold leading-relaxed">
                    {uni.scholarship_details || 'Up to £3,000 - £5,000 automatic merit scholarship available.'}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Available Programs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.popular_programs.map((prog, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 space-y-2">
                <Link
                  href="/free-consultation"
                  className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Apply for Scholarship</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20am%20interested%20in%20scholarship%20details%20for%20${encodeURIComponent(
                    uni.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <h3 className="text-2xl font-black">Need Help Preparing Scholarship SOPs & CVs?</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Our experienced education consultants in Multan help you draft compelling Statements of Purpose (SOPs), letters of recommendation, and merit scholarship applications.
            </p>
          </div>
          <Link
            href="/free-consultation"
            className="px-8 py-4 rounded-xl bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition-colors shadow-lg shrink-0"
          >
            Get Free Profile Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
