'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Briefcase, MapPin, Building, Clock, ArrowRight, MessageCircle, DollarSign, ShieldCheck } from 'lucide-react';

interface JobOpportunity {
  id: string;
  title: string;
  country: string;
  city: string;
  category: string;
  salary: string;
  visa_type: string;
  requirements: string[];
  description: string;
  is_featured: boolean;
}

const demoJobs: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Registered Nurse / Healthcare Specialist',
    country: 'United Kingdom',
    city: 'London / Manchester',
    category: 'Healthcare',
    salary: '£28,000 - £36,000 / year',
    visa_type: 'Health & Care Worker Visa (Tier 2)',
    requirements: ['IELTS General/Academic or OET', 'BSc Nursing / Diploma', 'NMC Registration Guidance'],
    description: 'Fast-track Health & Care visa sponsorship with NHS and private care facilities in the UK.',
    is_featured: true,
  },
  {
    id: 'job-2',
    title: 'Software Developer & IT Engineer',
    country: 'Germany',
    city: 'Berlin / Munich',
    category: 'Information Technology',
    salary: '€48,000 - €65,000 / year',
    visa_type: 'EU Blue Card / Opportunity Card (Chancenkarte)',
    requirements: ['Relevant IT Degree', 'English B2 / German A2 preferred', 'Minimum 2 years experience'],
    description: 'Direct employment placement and Opportunity Card visa guidance for IT professionals.',
    is_featured: true,
  },
  {
    id: 'job-3',
    title: 'Civil Engineer & Site Manager',
    country: 'Saudi Arabia & UAE',
    city: 'Riyadh / Dubai',
    category: 'Engineering',
    salary: 'AED 12,000 - 18,000 / month',
    visa_type: 'Employment Visa / Work Permit',
    requirements: ['BSc Civil Engineering', 'PEC Registration', '3+ Years GCC/Local experience'],
    description: 'Immediate work permit processing with leading construction and infrastructure firms.',
    is_featured: true,
  },
  {
    id: 'job-4',
    title: 'Hospitality & Culinary Staff',
    country: 'Romania & Poland',
    city: 'Bucharest / Warsaw',
    category: 'Hospitality',
    salary: '€900 - €1,400 / month + Accommodation',
    visa_type: 'Type D Work Visa / EU Work Permit',
    requirements: ['High School / Diploma', 'Basic English Communication', 'Experience in Hotel/Restaurant'],
    description: 'Guaranteed employer work permit with free accommodation and meals.',
    is_featured: false,
  },
];

export default function JobsPage() {
  const { settings } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Healthcare', 'Information Technology', 'Engineering', 'Hospitality'];

  const filteredJobs = demoJobs.filter((j) => {
    if (selectedCategory !== 'All' && j.category !== selectedCategory) return false;
    return true;
  });

  const whatsappNumber = settings.whatsapp || '03334530456';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-yellow-400" />
            <span>International Employment Pathways</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Jobs Abroad & Work Permit Visas
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Professional work permit guidance, job seeker visas, EU Blue Card, and skilled migration support for healthcare, IT, engineering, and trade professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Category Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-slate-700 mr-2">Job Sector:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block mb-2">
                      {job.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  {job.is_featured && (
                    <span className="bg-yellow-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-sm shrink-0">
                      Featured
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-900 shrink-0" />
                    <span className="truncate">{job.city}, {job.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate text-emerald-700 font-extrabold">{job.salary}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 pt-1 border-t border-slate-200/60">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="text-indigo-950 font-extrabold truncate">{job.visa_type}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {job.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Key Eligibility Criteria
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <Link
                  href="/free-consultation"
                  className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Inquire Work Permit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20am%20interested%20in%20work%20permit%20opportunity:%20${encodeURIComponent(
                    job.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 bg-amber-50 rounded-2xl p-6 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
          <p className="font-extrabold text-sm">Regulatory Notice:</p>
          <p>
            Glontis Visa Consultancy strictly adheres to official immigration guidelines and regulatory procedures. We provide educational counseling, document assessment, and visa file preparation services. Work permits are subject to embassy approval and employer sponsorship compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
