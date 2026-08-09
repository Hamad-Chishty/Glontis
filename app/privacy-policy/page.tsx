'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-slate-500 font-semibold">Last updated: August 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Glontis Visa Consultancy collects personal details provided voluntarily by students and clients through our consultation booking forms, contact requests, and office visits in Multan. This information includes full names, phone numbers, WhatsApp contacts, email addresses, educational transcripts, and study preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>
            Your information is strictly used for evaluating academic eligibility, submitting university applications on your behalf, preparing visa documentation, and communicating updates regarding your study abroad process. We do not sell or lease student data to third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Data Security & Confidentiality</h2>
          <p>
            We implement high security standards to safeguard your educational and personal documents against unauthorized access or alteration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please contact Glontis Visa Consultancy Multan at <strong>admin@glontisvisaconsultancy.com</strong> or call <strong>0333 4530456</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
