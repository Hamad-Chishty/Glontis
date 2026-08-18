'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import { Sparkles, Send, CheckCircle2, Phone, Mail, User, BookOpen, GraduationCap, MapPin } from 'lucide-react';

export default function ConsultationForm() {
  const { addLead, countries } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    preferred_country: 'United Kingdom',
    preferred_course: '',
    qualification: 'Bachelor Degree',
    city: 'Multan',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() && !formData.whatsapp.trim() && !formData.email.trim()) {
      setErrorMsg('Please provide at least one phone number or email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await addLead(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMsg(result.message);
      setFormData({
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
        preferred_country: 'United Kingdom',
        preferred_course: '',
        qualification: 'Bachelor Degree',
        city: 'Multan',
        message: '',
      });
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <section id="consultation-form" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/60 border border-[#F07100]/40 text-xs font-bold text-[#F07100]">
              <Sparkles className="w-3.5 h-3.5 text-[#F07100]" />
              <span>100% Free Initial Counseling</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Get Your Free Study Abroad Profile Evaluation
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Fill out the form to schedule a 1-on-1 session with our senior education advisors in Multan. We will assess your transcripts, gap years, scholarship options, and visa requirements.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-900/80 text-yellow-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Direct University Recommendations</h4>
                  <p className="text-xs text-slate-400">Get 3 matching university choices with low deposit options.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-900/80 text-yellow-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Scholarship Eligibility Audit</h4>
                  <p className="text-xs text-slate-400">Find merit bursaries and Italian DSU need-based funding opportunities.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-900/80 text-yellow-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Bank Statement & Financial Planning</h4>
                  <p className="text-xs text-slate-400">Learn exact 28-day holding rules for UK and GIC for Canada.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Book Your Free Session
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Our team at Bosan Road Multan will contact you within 24 hours.
            </p>

            {successMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <h4 className="font-extrabold text-lg">Inquiry Received Successfully!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">{successMsg}</p>
                <button
                  onClick={() => setSuccessMsg('')}
                  className="mt-2 text-xs font-bold text-emerald-900 underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ali Raza"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs pl-9 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0333 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs pl-9 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0333 1234567"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs pl-9 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Country
                    </label>
                    <select
                      value={formData.preferred_country}
                      onChange={(e) => setFormData({ ...formData, preferred_country: e.target.value })}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50 font-semibold"
                    >
                      {countries.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.flag_emoji} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highest Qualification
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50 font-semibold"
                    >
                      <option value="Metric / O Levels">Metric / O Levels</option>
                      <option value="Intermediate / A Levels / FSc">Intermediate / A Levels / FSc</option>
                      <option value="Bachelor Degree (14 or 16 Years)">Bachelor Degree (14 or 16 Years)</option>
                      <option value="Master Degree">Master Degree</option>
                      <option value="PhD / Doctorate">PhD / Doctorate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Major / Course
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Data Science, MBA, Nursing, Cyber Security"
                      value={formData.preferred_course}
                      onChange={(e) => setFormData({ ...formData, preferred_course: e.target.value })}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Multan, Khanewal, Vehari, Muzaffargarh"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Questions / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about gap years, budget, or specific university preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Free Initial Counseling Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
