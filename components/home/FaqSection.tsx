'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export default function FaqSection() {
  const { faqs, settings } = useData();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const publishedFaqs = faqs.filter((f) => f.is_published).sort((a, b) => a.display_order - b.display_order);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const whatsappNum = settings.whatsapp || '03334530456';
  const formattedWa = `92${whatsappNum.replace(/^0/, '').replace(/\s+/g, '')}`;

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-100 px-3.5 py-1 rounded-full border border-blue-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about study visas, document requirements, bank statements, and consultation at Glontis Visa Consultancy Multan.
          </p>
        </div>

        <div className="space-y-4">
          {publishedFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm text-blue-900">Have more specific questions?</h4>
            <p className="text-xs text-blue-800">Our Multan study abroad advisors are ready to answer your queries on WhatsApp.</p>
          </div>

          <a
            href={`https://wa.me/${formattedWa}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20have%20a%20question%20about%20study%20visa.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
