'use client';

import React from 'react';
import { useData } from '@/lib/context/DataContext';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function MobileStickyBar() {
  const { settings } = useData();
  const phone = settings.phones[0] || '03334301456';
  const whatsappNum = settings.whatsapp || '03334530456';
  const formattedWa = `92${whatsappNum.replace(/^0/, '').replace(/\s+/g, '')}`;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-2">
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
      >
        <Phone className="w-4 h-4 text-blue-400" />
        <span>Call Advisor</span>
      </a>

      <Link
        href="/free-consultation"
        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-800 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-md border border-blue-700"
      >
        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        <span>Free Assessment</span>
      </Link>

      <a
        href={`https://wa.me/${formattedWa}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20would%20like%20to%20get%20a%20free%20consultation.`}
        target="_blank"
        rel="noopener noreferrer"
        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white/20" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
