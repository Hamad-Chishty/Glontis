'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-3xl font-black text-slate-900">Terms and Conditions</h1>
        <p className="text-slate-500 font-semibold">Last updated: August 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Educational Advisory Scope</h2>
          <p>
            Glontis Visa Consultancy provides study abroad guidance, admission assistance, and visa application support. While we maintain a high success rate, final admission offers are at the sole discretion of the respective universities, and visa approvals are decided exclusively by official embassies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Document Authenticity</h2>
          <p>
            Students are responsible for providing genuine, verifiable academic degrees, transcripts, bank statements, and personal identity documents. Glontis Visa Consultancy reserves the right to terminate service if fraudulent documents are submitted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Office Consultation</h2>
          <p>
            In-person consultation services are provided at our Multan branch: Office # 28, 2nd Floor, Chaze Up Plaza, Bosan Rd, Multan, Punjab 60000.
          </p>
        </section>
      </div>
    </main>
  );
}
