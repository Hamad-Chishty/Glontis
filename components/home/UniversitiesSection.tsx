'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Building2, Search, Filter, ExternalLink, Award, MapPin } from 'lucide-react';

export default function UniversitiesSection() {
  const { universities } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');

  const publishedUnis = universities.filter((u) => u.is_published);

  const countriesList = ['All', ...Array.from(new Set(publishedUnis.map((u) => u.country)))];

  const filteredUnis = publishedUnis.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.popular_programs.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCountry = countryFilter === 'All' || u.country === countryFilter;

    return matchesSearch && matchesCountry;
  });

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3.5 py-1 rounded-full border border-yellow-400/20">
              Global University Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              200+ Recognized Partner Institutions
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Explore leading universities in the UK, Australia, Canada, USA, and Europe with direct application support through Glontis Visa Consultancy.
            </p>
          </div>

          <Link
            href="/universities"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all self-start md:self-auto shrink-0 shadow-lg"
          >
            View All Institutions
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search university, program, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden md:inline" />
            {countriesList.map((country) => (
              <button
                key={country}
                onClick={() => setCountryFilter(country)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  countryFilter === country
                    ? 'bg-yellow-400 text-slate-950 shadow-md'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnis.slice(0, 6).map((uni) => (
            <div
              key={uni.id}
              className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700/80 hover:border-blue-400 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                        {uni.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                        <span>{uni.city}, {uni.country}</span>
                      </p>
                    </div>
                  </div>

                  {uni.scholarships_available && (
                    <span className="p-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-bold flex items-center gap-1 shrink-0">
                      <Award className="w-3 h-3" />
                      <span>Scholarship</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {uni.description}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Popular Fields:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.popular_programs.slice(0, 3).map((prog, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-yellow-400 font-bold pt-1">
                  Tuition: {uni.tuition_range}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <Link
                  href="/free-consultation"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>Apply with Glontis</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
