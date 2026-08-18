'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import { Send, CheckCircle2, User, Phone, Globe, ShieldCheck } from 'lucide-react';

interface CompactHeroFormProps {
  title?: string;
  subtitle?: string;
  defaultCountry?: string;
  serviceType?: string;
}

export default function CompactHeroForm({
  title = 'Quick Visa Assessment',
  subtitle = 'Get a call back from senior counselors in Multan',
  defaultCountry = 'United Kingdom',
  serviceType = 'Study Visa',
}: CompactHeroFormProps) {
  const { addLead, countries } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: defaultCountry,
    qualification: 'Bachelor Degree',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    const result = await addLead({
      name: formData.name,
      phone: formData.phone,
      whatsapp: formData.phone,
      email: '',
      preferred_country: formData.country,
      preferred_course: serviceType,
      qualification: formData.qualification,
      city: 'Multan',
      message: '',
    });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMsg('Thank you! Our counselor will contact you shortly.');
      setFormData({
        name: '',
        phone: '',
        country: defaultCountry,
        qualification: 'Bachelor Degree',
      });
    } else {
      setErrorMsg(result.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-5 text-slate-900">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base sm:text-lg font-black text-[#0A1838] tracking-tight">{title}</h3>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Free Service
          </span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-snug">{subtitle}</p>
      </div>

      {successMsg ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in my-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <h4 className="font-extrabold text-xs">Request Submitted!</h4>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">{successMsg}</p>
          <button
            onClick={() => setSuccessMsg('')}
            className="text-[11px] font-extrabold text-emerald-900 underline pt-1 block"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {errorMsg && (
            <div className="p-2 rounded-lg bg-red-50 text-red-700 text-[11px] font-bold border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Raza"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs pl-8 pr-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A1838] bg-slate-50 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Phone / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="0333 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs pl-8 pr-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A1838] bg-slate-50 font-medium text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Target Country
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full text-xs pl-8 pr-2 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A1838] bg-slate-50 font-semibold text-slate-900"
                >
                  {countries.length > 0 ? (
                    countries.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.flag_emoji ? `${c.flag_emoji} ` : ''}{c.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="New Zealand">🇳🇿 New Zealand</option>
                      <option value="Italy">🇮🇹 Italy</option>
                      <option value="Malaysia">🇲🇾 Malaysia</option>
                      <option value="Turkey">🇹🇷 Turkey</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="Canada">🇨🇦 Canada</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Education / Profile
              </label>
              <select
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A1838] bg-slate-50 font-semibold text-slate-900"
              >
                <option value="Metric / Intermediate">Metric / Intermediate</option>
                <option value="Bachelor Degree">Bachelor Degree</option>
                <option value="Master / PhD">Master / PhD</option>
                <option value="Job Seeker / Business">Job Seeker / Business</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-1.5 py-2.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Get Free Initial Counseling</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Free & Confidential Advisory in Multan</span>
          </div>
        </form>
      )}
    </div>
  );
}
